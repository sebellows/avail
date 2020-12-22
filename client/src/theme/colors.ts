import { ThemeColorBuilderOpts } from './types'

const black = 'hsl(0, 0%, 0%)'
const white = 'hsl(0, 0%, 100%)'

const colors = {
  default: {
    lightest: 'hsl(0, 0%, 95%)',
    lighter: 'hsl(0, 0%, 70%)',
    light: 'hsl(0, 0%, 65%)',
    base: 'hsl(0, 0%, 50%)',
    dark: 'hsl(0, 0%, 35%)',
    darker: 'hsl(0, 0%, 20%)',
    darkest: 'hsl(0, 0%, 5%)',
  },
  transparent: {
    lightest: 'hsl(240, 100%, 95%)',
    lighter: 'hsl(240, 100%, 70%)',
    light: 'hsl(240, 100%, 65%)',
    base: 'hsl(240, 100%, 50%)',
    dark: 'hsl(240, 100%, 35%)',
    darker: 'hsl(240, 100%, 20%)',
    darkest: 'hsl(240, 100%, 5%)',
  },
  primary: {
    lightest: 'hsl(240, 100%, 95%)',
    lighter: 'hsl(240, 100%, 70%)',
    light: 'hsl(240, 100%, 65%)',
    base: 'hsl(240, 100%, 50%)',
    dark: 'hsl(240, 100%, 35%)',
    darker: 'hsl(240, 100%, 20%)',
    darkest: 'hsl(240, 100%, 5%)',
  },
  success: {
    lightest: 'hsl(120, 100%, 95%)',
    lighter: 'hsl(120, 100%, 70%)',
    light: 'hsl(120, 100%, 65%)',
    base: 'hsl(120, 100%, 50%)',
    dark: 'hsl(120, 100%, 35%)',
    darker: 'hsl(120, 100%, 20%)',
    darkest: 'hsl(120, 100%, 5%)',
  },
  warning: {
    lightest: 'hsl(60, 100%, 95%)',
    lighter: 'hsl(60, 100%, 70%)',
    light: 'hsl(60, 100%, 65%)',
    base: 'hsl(60, 100%, 50%)',
    dark: 'hsl(60, 100%, 35%)',
    darker: 'hsl(60, 100%, 20%)',
    darkest: 'hsl(60, 100%, 5%)',
  },
  danger: {
    lightest: 'hsl(0, 100%, 95%)',
    lighter: 'hsl(0, 100%, 70%)',
    light: 'hsl(0, 100%, 65%)',
    base: 'hsl(0, 100%, 50%)',
    dark: 'hsl(0, 100%, 35%)',
    darker: 'hsl(0, 100%, 20%)',
    darkest: 'hsl(0, 100%, 5%)',
  },
}

const spots = {
  gray: 'hsl(0, 0%, 50%)',
  red: 'hsl(0, 100%, 50%)',
  orange: 'hsl(30, 100%, 50%)',
  yellow: 'hsl(60, 100%, 50%)',
  green: 'hsl(120, 100%, 50%)',
  cyan: 'hsl(180, 100%, 50%)',
  blue: 'hsl(240, 100%, 50%)',
  purple: 'hsl(270, 100%, 50%)',
  magenta: 'hsl(300, 100%, 50%)',
}

const tones = {
  transparent: {
    bg: [colors.transparent.darkest, colors.transparent.lightest],
    fg: [colors.transparent.lightest, colors.transparent.darkest],
    border: [colors.transparent.darker, colors.transparent.lighter],
    focusRing: [colors.transparent.base, colors.transparent.base],
  },
  primary: {
    bg: [colors.primary.darkest, colors.primary.lightest],
    fg: [colors.primary.lightest, colors.primary.darkest],
    border: [colors.primary.darker, colors.primary.lighter],
    focusRing: [colors.primary.base, colors.primary.base],
  },
  success: {
    bg: [colors.success.darkest, colors.success.lightest],
    fg: [colors.success.lightest, colors.success.darkest],
    border: [colors.success.darker, colors.success.lighter],
    focusRing: [colors.success.base, colors.success.base],
  },
  warning: {
    bg: [colors.warning.darkest, colors.warning.lightest],
    fg: [colors.warning.lightest, colors.warning.darkest],
    border: [colors.warning.darker, colors.warning.lighter],
    focusRing: [colors.warning.base, colors.warning.base],
  },
  danger: {
    bg: [colors.danger.darkest, colors.danger.lightest],
    fg: [colors.danger.lightest, colors.danger.darkest],
    border: [colors.danger.darker, colors.danger.lighter],
    focusRing: [colors.danger.base, colors.danger.base],
  },
}

export const defaultOpts: ThemeColorBuilderOpts = {
  base: ({ dark, name }) => {
    if (name === 'default') {
      return {
        bg: dark ? black : white,
        fg: dark ? white : black,
        border: dark ? colors.default.darkest : colors.default.lightest,
        focusRing: colors.primary.base,
        shadow: {
          outline: black,
          umbra: black,
          penumbra: black,
          ambient: black,
        },
      }
    }

    // Variants:
    // - primary
    // - success
    // - warning
    // - danger
    return {
      bg: tones[name].bg[dark ? 0 : 1],
      fg: tones[name].fg[dark ? 0 : 1],
      border: tones[name].border[dark ? 0 : 1],
      focusRing: tones[name].focusRing[dark ? 0 : 1],
      shadow: {
        outline: black,
        umbra: black,
        penumbra: black,
        ambient: black,
      },
    }
  },

  solid: ({ dark, state, tone }) => {
    const color = colors[tone]

    if (state === 'hovered') {
      return {
        bg: dark ? color.light : color.dark,
        border: dark ? color.lighter : color.darker,
        fg: dark ? color.darkest : color.lightest,
      }
    }

    return {
      bg: color.base,
      border: dark ? color.light : color.dark,
      fg: dark ? color.darkest : color.lightest,
    }
  },

  muted: ({ dark, state, tone }) => {
    const color = colors[tone]

    if (state === 'hovered') {
      return {
        bg: dark ? color.darker : color.lighter,
        border: dark ? color.lighter : color.darker,
        fg: dark ? color.lightest : color.darkest,
      }
    }

    return {
      bg: dark ? color.darkest : color.lightest,
      border: dark ? color.darker : color.lighter,
      fg: dark ? color.lighter : color.darker,
    }
  },

  button: ({ mode, muted, solid }) => {
    if (mode === 'bleed') {
      return {
        ...muted,
        enabled: {
          bg: 'transparent',
          fg: muted.enabled.fg,
          border: 'transparent',
        },
        hovered: {
          bg: muted.enabled.bg,
          fg: muted.hovered.fg,
          border: 'transparent',
        },
      }
    }

    if (mode === 'ghost')
      return {
        ...solid,
        enabled: muted.enabled,
      }

    return solid
  },

  card: () => {
    return {
      bg: black,
      fg: black,
      border: black,
      muted: {
        fg: black,
      },
      accent: {
        fg: black,
      },
      link: {
        fg: black,
      },
      code: {
        bg: black,
        fg: black,
      },
    }
  },

  input: () => {
    return {
      bg: black,
      fg: black,
      border: black,
      placeholder: black,
    }
  },

  spot: ({ key }) => {
    return spots[key]
  },

  syntax: () => ({
    atrule: black,
    attrName: black,
    attrValue: black,
    attribute: black,
    boolean: black,
    builtin: black,
    cdata: black,
    char: black,
    class: black,
    className: black,
    comment: black,
    constant: black,
    deleted: black,
    doctype: black,
    entity: black,
    function: black,
    hexcode: black,
    id: black,
    important: black,
    inserted: black,
    keyword: black,
    number: black,
    operator: black,
    prolog: black,
    property: black,
    pseudoClass: black,
    pseudoElement: black,
    punctuation: black,
    regex: black,
    selector: black,
    string: black,
    symbol: black,
    tag: black,
    unit: black,
    url: black,
    variable: black,
  }),
}
