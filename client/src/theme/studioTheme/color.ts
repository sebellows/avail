import { BLACK, WHITE } from '../constants'
import { VariantTints } from '../types/color'
import { colors, palette } from './colorPalette'
import { createColorTheme } from '../createTheme'
import { Color, multiply, screen } from '../../core/style/libs'

const tones: VariantTints = palette

export const color = createColorTheme({
  base: ({ dark, name }) => {
    let tints = tones.neutral

    if (name === 'neutral') {
      return {
        fg: dark ? WHITE : BLACK,
        bg: dark ? BLACK : WHITE,
        borderColor: tints[dark ? 900 : 200],
        focusRing: colors.blue[500],
        shadow: {
          hue: Color(tints[500])
            .alpha(dark ? 0.2 : 0.4)
            .string(),
          umbra: Color(dark ? BLACK : tints[500])
            .alpha(0.2)
            .string(),
          penumbra: Color(dark ? BLACK : tints[500])
            .alpha(0.14)
            .string(),
          ambience: Color(dark ? BLACK : tints[500])
            .alpha(0.12)
            .string(),
        },
      }
    }

    if (name === 'accent') {
      return {
        fg: tints[dark ? 100 : 900],
        bg: tints[dark ? 950 : 50],
        borderColor: tints[dark ? 800 : 300],
        focusRing: colors.blue[500],
        shadow: {
          hue: Color(tints[500])
            .alpha(dark ? 0.2 : 0.4)
            .string(),
          umbra: Color(dark ? BLACK : tints[500])
            .alpha(0.2)
            .string(),
          penumbra: Color(dark ? BLACK : tints[500])
            .alpha(0.14)
            .string(),
          ambience: Color(dark ? BLACK : tints[500])
            .alpha(0.12)
            .string(),
        },
      }
    }

    tints = tones[name] || tones.neutral

    return {
      fg: tints[dark ? 100 : 900],
      bg: tints[dark ? 900 : 100],
      borderColor: tints[dark ? 800 : 200],
      focusRing: tints[500],
      shadow: {
        hue: Color(tints[500])
          .alpha(dark ? 0.2 : 0.4)
          .string(),
        umbra: Color(dark ? BLACK : tints[500])
          .alpha(0.2)
          .string(),
        penumbra: Color(dark ? BLACK : tints[500])
          .alpha(0.14)
          .string(),
        ambience: Color(dark ? BLACK : tints[500])
          .alpha(0.12)
          .string(),
      },
    }
  },

  solid: ({ base, dark, state, tone }) => {
    const mix = dark ? screen : multiply
    const tints = tones[tone] || tones.neutral

    switch (state) {
      case 'disabled':
        return {
          bg: mix(base.bg, colors.gray[dark ? 800 : 200]),
          borderColor: mix(base.bg, colors.gray[dark ? 800 : 200]),
          fg: mix(base.bg, dark ? BLACK : WHITE),
        }
      case 'hovered':
        return {
          bg: mix(base.bg, tints[dark ? 300 : 600]),
          borderColor: mix(base.bg, tints[dark ? 300 : 600]),
          fg: mix(base.bg, dark ? BLACK : WHITE),
        }
      case 'pressed':
        return {
          bg: mix(base.bg, tints[dark ? 200 : 800]),
          borderColor: mix(base.bg, tints[dark ? 200 : 800]),
          fg: mix(base.bg, dark ? BLACK : WHITE),
        }
      case 'selected':
        return {
          bg: mix(base.bg, tints[dark ? 200 : 800]),
          borderColor: mix(base.bg, tints[dark ? 200 : 800]),
          fg: mix(base.bg, dark ? BLACK : WHITE),
        }
      case 'active':
      default:
        return {
          bg: mix(base.bg, tints[dark ? 400 : 500]),
          borderColor: mix(base.bg, tints[dark ? 400 : 500]),
          fg: mix(base.bg, dark ? BLACK : WHITE),
        }
    }
  },

  muted: ({ base, dark, state, tone }) => {
    const mix = dark ? screen : multiply
    const tints = tones[tone] || tones.neutral

    switch (state) {
      case 'disabled':
        return {
          bg: mix(base.bg, colors.gray[dark ? 950 : 50]),
          borderColor: mix(base.bg, colors.gray[dark ? 950 : 50]),
          fg: mix(base.bg, colors.gray[dark ? 800 : 200]),
        }
      case 'hovered':
        return {
          bg: mix(base.bg, tints[dark ? 950 : 50]),
          borderColor: mix(base.bg, tints[dark ? 950 : 50]),
          fg: mix(base.bg, tints[dark ? 100 : 900]),
        }
      case 'pressed':
        return {
          bg: mix(base.bg, tints[dark ? 900 : 100]),
          borderColor: mix(base.bg, tints[dark ? 900 : 100]),
          fg: mix(base.bg, tints[dark ? 100 : 900]),
        }
      case 'selected':
        return {
          bg: mix(base.bg, tints[dark ? 900 : 100]),
          borderColor: mix(base.bg, tints[dark ? 900 : 100]),
          fg: mix(base.bg, tints[dark ? 100 : 900]),
        }
      case 'active':
      default:
        return {
          bg: mix(base.bg, tints[dark ? 900 : 100]),
          borderColor: mix(base.bg, tints[dark ? 900 : 100]),
          fg: mix(base.bg, tints[dark ? 300 : 700]),
        }
    }
  },

  button: ({ base, mode, muted, solid }) => {
    switch (mode) {
      case 'bleed':
        return {
          ...muted,
          active: {
            ...muted.active,
            bg: base.bg,
            borderColor: base.bg,
          },
          disabled: {
            ...muted.disabled,
            bg: base.bg,
            borderColor: base.bg,
          },
        }
      case 'ghost':
        return {
          ...solid,
          active: { ...muted.active, bg: base.bg, borderColor: base.borderColor },
          disabled: {
            ...muted.disabled,
            bg: base.bg,
          },
        }
      default:
        return solid
    }
  },

  control: ({ base, dark, mode, state }) => {
    const mix = dark ? screen : multiply

    if (mode === 'invalid') {
      const tints = tones.danger

      return {
        bg: mix(base.bg, tints[dark ? 950 : 50]),
        fg: mix(base.bg, tints[dark ? 300 : 700]),
        borderColor: mix(base.bg, tints[dark ? 800 : 200]),
        placeholder: mix(base.bg, tints[dark ? 300 : 700]),
      }
    }

    switch (state) {
      case 'hovered':
        return {
          bg: base.bg,
          fg: base.fg,
          borderColor: mix(base.bg, colors.gray[dark ? 700 : 300]),
          placeholder: mix(base.bg, colors.gray[dark ? 300 : 700]),
        }
      case 'disabled':
        return {
          bg: mix(base.bg, colors.gray[dark ? 950 : 50]),
          fg: mix(base.bg, colors.gray[dark ? 800 : 200]),
          borderColor: mix(base.bg, colors.gray[dark ? 900 : 100]),
          placeholder: mix(base.bg, colors.gray[dark ? 900 : 100]),
        }
      default:
      //
    }
    return {
      bg: base.bg,
      fg: base.fg,
      borderColor: base.borderColor,
      placeholder: mix(base.bg, colors.gray[dark ? 300 : 700]),
    }
  },

  card: ({ base, dark, muted, name, state }) => {
    let mix = dark ? screen : multiply

    switch (state) {
      case 'selected':
        const tint = ['neutral', 'accent'].includes(name) ? colors.blue : tones[name]
        const bg = tint[dark ? 400 : 500]

        return {
          bg,
          fg: dark ? BLACK : WHITE,
          borderColor: tint[dark ? 300 : 400],
          muted: {
            fg: mix(bg, colors.gray[dark ? 600 : 300]),
          },
          accent: {
            fg: mix(bg, colors.red[dark ? 600 : 500]),
          },
          link: {
            fg: mix(bg, colors.blue[dark ? 600 : 300]),
          },
          code: {
            bg: mix(bg, colors.gray[dark ? 50 : 950]),
            fg: mix(bg, colors.gray[dark ? 600 : 300]),
          },
        }
      //
      case 'hovered':
        return {
          ...muted.hovered,
          borderColor: mix(muted.hovered.bg, base.borderColor),
          muted: {
            fg: mix(muted.hovered.bg, colors.gray[dark ? 400 : 700]),
          },
          accent: {
            fg: mix(muted.hovered.bg, colors.red[dark ? 500 : 500]),
          },
          link: {
            fg: mix(muted.hovered.bg, colors.blue[dark ? 400 : 700]),
          },
          code: {
            bg: mix(muted.hovered.bg, colors.gray[dark ? 950 : 50]),
            fg: colors.gray[dark ? 400 : 600],
          },
        }
      case 'pressed':
        return {
          ...muted.pressed,
          fg: base.fg,
          muted: {
            fg: mix(muted.pressed.bg, colors.gray[dark ? 400 : 700]),
          },
          accent: {
            fg: mix(muted.pressed.bg, colors.red[dark ? 500 : 500]),
          },
          link: {
            fg: mix(muted.pressed.bg, colors.blue[dark ? 400 : 700]),
          },
          code: {
            bg: mix(muted.pressed.bg, colors.gray[dark ? 950 : 50]),
            fg: colors.gray[dark ? 400 : 700],
          },
        }
      case 'disabled':
        return {
          ...muted.disabled,
          muted: {
            fg: muted.disabled.fg,
          },
          accent: {
            fg: muted.disabled.fg,
          },
          link: {
            fg: muted.disabled.fg,
          },
          code: {
            bg: 'transparent',
            fg: muted.disabled.fg,
          },
        }
      default:
        return {
          bg: base.bg,
          fg: base.fg,
          borderColor: base.borderColor,
          muted: {
            fg: mix(base.bg, colors.gray[dark ? 400 : 700]),
          },
          accent: {
            fg: mix(base.bg, colors.red[dark ? 500 : 500]),
          },
          link: {
            fg: mix(base.bg, colors.blue[dark ? 400 : 700]),
          },
          code: {
            bg: mix(base.bg, colors.gray[dark ? 950 : 50]),
            fg: colors.gray[dark ? 400 : 700],
          },
        }
    }
  },

  spot: ({ base, dark, key }) => {
    const mix = dark ? screen : multiply

    return mix(base.bg, palette[key][dark ? 400 : 500])
  },

  syntax: ({ base, dark }) => {
    const mix = dark ? screen : multiply
    const mainShade = dark ? 400 : 600
    const secondaryShade = dark ? 600 : 400

    return {
      atrule: mix(base.bg, colors.purple[mainShade]),
      attrName: mix(base.bg, colors.green[mainShade]),
      attrValue: mix(base.bg, colors.yellow[mainShade]),
      attribute: mix(base.bg, colors.yellow[mainShade]),
      boolean: mix(base.bg, colors.purple[mainShade]),
      builtin: mix(base.bg, colors.purple[mainShade]),
      cdata: mix(base.bg, colors.yellow[mainShade]),
      char: mix(base.bg, colors.yellow[mainShade]),
      class: mix(base.bg, colors.orange[mainShade]),
      className: mix(base.bg, colors.cyan[mainShade]),
      comment: mix(base.bg, colors.gray[secondaryShade]),
      constant: mix(base.bg, colors.purple[mainShade]),
      deleted: mix(base.bg, colors.red[mainShade]),
      doctype: mix(base.bg, colors.gray[secondaryShade]),
      entity: mix(base.bg, colors.red[mainShade]),
      function: mix(base.bg, colors.green[mainShade]),
      hexcode: mix(base.bg, colors.blue[mainShade]),
      id: mix(base.bg, colors.purple[mainShade]),
      important: mix(base.bg, colors.purple[mainShade]),
      inserted: mix(base.bg, colors.yellow[mainShade]),
      keyword: mix(base.bg, colors.magenta[mainShade]),
      number: mix(base.bg, colors.purple[mainShade]),
      operator: mix(base.bg, colors.magenta[mainShade]),
      prolog: mix(base.bg, colors.gray[secondaryShade]),
      property: mix(base.bg, colors.blue[mainShade]),
      pseudoClass: mix(base.bg, colors.yellow[mainShade]),
      pseudoElement: mix(base.bg, colors.yellow[mainShade]),
      punctuation: mix(base.bg, colors.gray[mainShade]),
      regex: mix(base.bg, colors.blue[mainShade]),
      selector: mix(base.bg, colors.red[mainShade]),
      string: mix(base.bg, colors.yellow[mainShade]),
      symbol: mix(base.bg, colors.purple[mainShade]),
      tag: mix(base.bg, colors.red[mainShade]),
      unit: mix(base.bg, colors.orange[mainShade]),
      url: mix(base.bg, colors.red[mainShade]),
      variable: mix(base.bg, colors.red[mainShade]),
    }
  },
})
