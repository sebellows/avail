import { BLACK } from '../core/constants'
import { ThemeColorBuilderOptions, ThemeColorElementBase } from './types'
import { colors, palette } from './studioTheme'

const DARK = palette.neutral['800']
const LIGHT = palette.neutral['100']

const makeSpots = (hue = 500) =>
  Object.entries(colors).reduce((acc, [k, v]) => {
    acc[k] = v[hue]
    return acc
  }, {})

const spots = makeSpots()

const defaultToneSettings = () => ({
  base: 500,
  dark: 900,
  light: 100,
  borderDark: 800,
  borderLight: 300,
})

type ToneParams = ReturnType<typeof defaultToneSettings>
type ThemeToneSettings = { [key in keyof ThemeColorElementBase]: [string, string] }
type Tones = { [key in keyof typeof palette]: ThemeToneSettings }

const createTones = (
  color: keyof typeof palette,
  params: Partial<ToneParams> = {},
): ThemeToneSettings => {
  const paletteColor = palette[color]
  const { base, dark, light, borderDark, borderLight } = { ...defaultToneSettings, ...params }
  return {
    bg: [paletteColor[dark], paletteColor[light]],
    fg: [paletteColor[light], paletteColor[dark]],
    borderColor: [paletteColor[borderDark], paletteColor[borderLight]],
    focusRing: [paletteColor[base], paletteColor[base]],
  }
}

const tones = Object.entries(palette).reduce((acc, [k, v]): Tones => {
  acc[k] = createTones(k as keyof typeof palette)
  return acc
}, {} as Tones)

// const defaultThemeParams = () => ({
//   name: 'null',
//   dark: false,
//   hue: 500,
//   primary: colors.blue,
//   accent: colors.orange,
//   danger: colors.red,
//   success: colors.green,
//   warning: colors.yellow,
//   focus: colors.orange,
//   muted: palette.neutral,
// })

// type ThemeFactoryParams = ReturnType<typeof defaultThemeParams>

// const createTheme = (params: Partial<ThemeFactoryParams> = {}): Avail.Theme => {
//   let { name, dark, hue, primary, accent, danger, success, warning, focus, muted } = {
//     ...defaultThemeParams,
//     ...params,
//   }
//   if (name === 'null') {
//     name = dark ? 'dark' : 'light'
//   }

//   return {
//     name,
//     ...tones.neutral,
//     primary,
//     accent,
//     link: {
//       fg: primary,
//       hoverColor: Color(primary).alpha(0.8).string(),
//     },
//     borderColor: Color(WHITE).alpha(0.12).string(),
//     control: {
//       bg: Color(BLACK).alpha(0.01).string(),
//       borderColor: Color(WHITE).alpha(0.06).string(),
//       checked: Color(primary).string(),
//       fg: WHITE,
//     },
//     disabled: {
//       bg: Color(WHITE).alpha(0.075).string(),
//       borderColor: Color(WHITE).alpha(0.12).string(),
//       checked: Color(WHITE).alpha(0.075).string(),
//       fg: Color(WHITE).alpha(0.8).string(),
//     },
//     focus: {
//       bg: Color(COLORS.yellow).alpha(0.25).hsl().string(),
//       borderColor: Color(COLORS.yellow).hsl().string(),
//       boxShadow: `0 0 0 0.25rem ${Color(COLORS.yellow).alpha(0.25).hsl().string()}`,
//     },
//     hover: {
//       bg: shade(31), // GRAY_700
//       borderColor: Color(WHITE).alpha(0.2).string(),
//       fg: WHITE,
//     },
//     muted: shade(71),
//     ...themeCommon,
//   }
// }

export const defaultOptions: ThemeColorBuilderOptions = {
  base: ({ dark, name }) => {
    if (name === 'neutral') {
      return {
        bg: dark ? DARK : LIGHT,
        fg: dark ? LIGHT : DARK,
        borderColor: dark ? palette.neutral['900'] : palette.neutral['100'],
        focusRing: palette.primary['500'],
        shadow: {
          hue: BLACK,
          umbra: BLACK,
          penumbra: BLACK,
          ambience: BLACK,
        },
      }
    }

    // Variants: primary, accent, success, warning, danger
    return {
      bg: tones[name].bg[dark ? 0 : 1],
      fg: tones[name].fg[dark ? 0 : 1],
      borderColor: tones[name].borderColor[dark ? 0 : 1],
      focusRing: tones[name].focusRing[dark ? 0 : 1],
      shadow: {
        hue: BLACK,
        umbra: BLACK,
        penumbra: BLACK,
        ambience: BLACK,
      },
    }
  },

  solid: ({ dark, state, tone }) => {
    const color = palette[tone]

    if (state === 'hovered') {
      return {
        bg: dark ? color['100'] : color['800'],
        borderColor: dark ? color['200'] : color['900'],
        fg: dark ? color['900'] : color['100'],
      }
    }

    return {
      bg: color['500'],
      borderColor: dark ? color['100'] : color['800'],
      fg: dark ? color['900'] : color['100'],
    }
  },

  muted: ({ dark, state, tone }) => {
    const color = colors[tone]

    if (state === 'hovered') {
      return {
        bg: dark ? color['800'] : color['200'],
        borderColor: dark ? color['200'] : color['800'],
        fg: dark ? color['100'] : color['900'],
      }
    }

    return {
      bg: dark ? color['900'] : color['100'],
      borderColor: dark ? color['800'] : color['200'],
      fg: dark ? color['200'] : color['800'],
    }
  },

  button: ({ mode, muted, solid }) => {
    switch (mode) {
      case 'bleed':
        return {
          ...muted,
          active: {
            bg: 'transparent',
            fg: muted.active.fg,
            borderColor: 'transparent',
          },
          hovered: {
            bg: muted.active.bg,
            fg: muted.hovered.fg,
            borderColor: 'transparent',
          },
        }
      case 'ghost':
        return {
          ...solid,
          active: muted.active,
        }
      default:
        return solid
    }
  },

  card: () => ({
    bg: BLACK,
    fg: BLACK,
    borderColor: BLACK,
    muted: {
      fg: BLACK,
    },
    accent: {
      fg: BLACK,
    },
    link: {
      fg: BLACK,
    },
    code: {
      bg: BLACK,
      fg: BLACK,
    },
  }),

  control: () => ({
    bg: BLACK,
    fg: BLACK,
    borderColor: BLACK,
    placeholder: BLACK,
  }),

  spot: ({ key }) => spots[key],

  syntax: () => ({
    atrule: BLACK,
    attrName: BLACK,
    attrValue: BLACK,
    attribute: BLACK,
    boolean: BLACK,
    builtin: BLACK,
    cdata: BLACK,
    char: BLACK,
    class: BLACK,
    className: BLACK,
    comment: BLACK,
    constant: BLACK,
    deleted: BLACK,
    doctype: BLACK,
    entity: BLACK,
    function: BLACK,
    hexcode: BLACK,
    id: BLACK,
    important: BLACK,
    inserted: BLACK,
    keyword: BLACK,
    number: BLACK,
    operator: BLACK,
    prolog: BLACK,
    property: BLACK,
    pseudoClass: BLACK,
    pseudoElement: BLACK,
    punctuation: BLACK,
    regex: BLACK,
    selector: BLACK,
    string: BLACK,
    symbol: BLACK,
    tag: BLACK,
    unit: BLACK,
    url: BLACK,
    variable: BLACK,
  }),
}
