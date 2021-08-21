/* eslint-disable @typescript-eslint/no-unused-vars */
import { Color } from '../../utils'
import * as hues from './hues'
import { BLACK, WHITE } from './config'
import { createColorTheme } from './build'
import { multiply, screen } from './blendFns'
import { ThemeColorTints, ThemeColorVariantKey } from './types'

const variants: Record<ThemeColorVariantKey, ThemeColorTints> = {
  default: hues.gray,
  inverted: hues.gray,
  transparent: hues.gray,
  accent: hues.magenta,
  primary: hues.blue,
  success: hues.green,
  warning: hues.yellow,
  danger: hues.red,
}

export const color = createColorTheme({
  base: ({ dark, name }) => {
    if (name === 'default') {
      return {
        fg: dark ? WHITE : BLACK,
        bg: dark ? BLACK : WHITE,
        border: hues.gray[dark ? 900 : 200].hex,
        code: {
          bg: hues.gray[dark ? 800 : 100].hex,
          fg: hues.magenta[500].hex,
          border: 'transparent',
        },
        focusRing: hues.blue[500].hex,
        link: {
          fg: hues.blue[500].hex,
        },
        shadow: {
          outline: Color(hues.gray[500].hex)
            .alpha(dark ? 0.2 : 0.4)
            .string(),
          umbra: Color(dark ? BLACK : hues.gray[500].hex)
            .alpha(0.2)
            .string(),
          penumbra: Color(dark ? BLACK : hues.gray[500].hex)
            .alpha(0.14)
            .string(),
          ambient: Color(dark ? BLACK : hues.gray[500].hex)
            .alpha(0.12)
            .string(),
        },
      }
    }

    if (name === 'transparent') {
      const tints = variants.default

      return {
        fg: Color(dark ? WHITE : BLACK)
          .alpha(0.48)
          .string(),
        bg: Color(dark ? BLACK : WHITE)
          .alpha(0.48)
          .string(),
        border: Color(dark ? BLACK : WHITE)
          .alpha(0.24)
          .string(),
        focusRing: Color(hues.blue[500].hex).alpha(0.48).string(),
        link: {
          fg: Color(tints[500].hex).alpha(0.48).string(),
        },
        shadow: {
          outline: Color(hues.gray[500].hex)
            .alpha(dark ? 0.2 : 0.4)
            .string(),
          umbra: Color(dark ? BLACK : tints[500].hex)
            .alpha(0.2)
            .string(),
          penumbra: Color(dark ? BLACK : tints[500].hex)
            .alpha(0.14)
            .string(),
          ambient: Color(dark ? BLACK : tints[500].hex)
            .alpha(0.12)
            .string(),
        },
      }
    }

    const tints = variants[name] || variants.default

    return {
      fg: tints[dark ? 100 : 900].hex,
      bg: tints[dark ? 950 : 50].hex,
      border: tints[dark ? 800 : 200].hex,
      code: {
        bg: tints[dark ? 800 : 100].hex,
        fg: tints[500].hex,
        border: 'transparent',
      },
      focusRing: tints[500].hex,
      link: {
        fg: tints[500].hex,
      },
      shadow: {
        outline: Color(tints[500].hex)
          .alpha(dark ? 0.2 : 0.4)
          .string(),
        umbra: Color(dark ? BLACK : tints[500].hex)
          .alpha(0.2)
          .string(),
        penumbra: Color(dark ? BLACK : tints[500].hex)
          .alpha(0.14)
          .string(),
        ambient: Color(dark ? BLACK : tints[500].hex)
          .alpha(0.12)
          .string(),
      },
    }
  },

  solid: ({ base, dark, state, variant }) => {
    const mix = dark ? screen : multiply
    const tints = variants[variant] || variants.default

    switch (state) {
      case 'disabled':
        return {
          bg: mix(base.bg, hues.gray[dark ? 800 : 200].hex).string(),
          border: mix(base.bg, hues.gray[dark ? 800 : 200].hex).string(),
          fg: mix(base.bg, dark ? BLACK : WHITE).string(),
        }
      case 'hovered':
        return {
          bg: mix(base.bg, tints[dark ? 300 : 600].hex).string(),
          border: mix(base.bg, tints[dark ? 300 : 600].hex).string(),
          fg: mix(base.bg, dark ? BLACK : WHITE).string(),
        }

      case 'pressed':
        return {
          bg: mix(base.bg, tints[dark ? 200 : 800].hex).string(),
          border: mix(base.bg, tints[dark ? 200 : 800].hex).string(),
          fg: mix(base.bg, dark ? BLACK : WHITE).string(),
        }

      case 'selected':
        return {
          bg: mix(base.bg, tints[dark ? 200 : 800].hex).string(),
          border: mix(base.bg, tints[dark ? 200 : 800].hex).string(),
          fg: mix(base.bg, dark ? BLACK : WHITE).string(),
        }

      case 'active':
      default:
        return {
          bg: mix(base.bg, tints[dark ? 400 : 600].hex).string(),
          border: mix(base.bg, tints[dark ? 400 : 600].hex).string(),
          fg: mix(base.bg, dark ? BLACK : WHITE).string(),
        }
    }
  },

  muted: ({ base, dark, state, variant }) => {
    const mix = dark ? screen : multiply
    const tints = variants[variant] || variants.default

    switch (state) {
      case 'disabled':
        return {
          bg: mix(base.bg, hues.gray[dark ? 950 : 50].hex).string(),
          border: mix(base.bg, hues.gray[dark ? 950 : 50].hex).string(),
          fg: mix(base.bg, hues.gray[dark ? 800 : 200].hex).string(),
        }
      case 'hovered':
        return {
          bg: mix(base.bg, tints[dark ? 950 : 50].hex).string(),
          border: mix(base.bg, tints[dark ? 950 : 50].hex).string(),
          fg: mix(base.bg, tints[dark ? 100 : 900].hex).string(),
        }

      case 'pressed':
        return {
          bg: mix(base.bg, tints[dark ? 900 : 100].hex).string(),
          border: mix(base.bg, tints[dark ? 900 : 100].hex).string(),
          fg: mix(base.bg, tints[dark ? 100 : 900].hex).string(),
        }

      case 'selected':
        return {
          bg: mix(base.bg, tints[dark ? 900 : 100].hex).string(),
          border: mix(base.bg, tints[dark ? 900 : 100].hex).string(),
          fg: mix(base.bg, tints[dark ? 100 : 900].hex).string(),
        }

      case 'active':
      default:
        return {
          bg: mix(base.bg, tints[dark ? 900 : 100].hex).string(),
          border: mix(base.bg, tints[dark ? 900 : 100].hex).string(),
          fg: mix(base.bg, tints[dark ? 300 : 700].hex).string(),
        }
    }
  },

  button: ({ base, mode, muted, solid }) => {
    let res = solid
    switch (mode) {
      case 'link':
        res = {
          ...muted,
          active: {
            ...muted.active,
            bg: base.bg,
            border: base.bg,
          },
          disabled: {
            ...muted.disabled,
            bg: base.bg,
            border: base.bg,
          },
        }
        break
      case 'outline':
        res = {
          ...solid,
          active: { ...muted.active, bg: base.bg, border: base.border },
          disabled: {
            ...muted.disabled,
            bg: base.bg,
          },
        }
        break
      default:
      // return solid
    }
    return res
  },

  form: ({ base, dark, mode, state }) => {
    const mix = dark ? screen : multiply
    const tints = mode === 'invalid' ? variants.danger : hues.gray

    if (mode === 'invalid') {
      return {
        bg: mix(base.bg, tints[dark ? 950 : 50].hex).string(),
        fg: mix(base.bg, tints[dark ? 300 : 700].hex).string(),
        border: mix(base.bg, tints[dark ? 800 : 200].hex).string(),
        placeholder: mix(base.bg, tints[dark ? 300 : 700].hex).string(),
      }
    }
    switch (state) {
      case 'disabled':
        return {
          bg: mix(base.bg, tints[dark ? 950 : 50].hex).string(),
          fg: mix(base.bg, tints[dark ? 800 : 200].hex).string(),
          border: mix(base.bg, tints[dark ? 900 : 100].hex).string(),
          placeholder: mix(base.bg, tints[dark ? 900 : 100].hex).string(),
        }
      case 'hovered':
        return {
          bg: base.bg,
          fg: base.fg,
          border: mix(base.bg, tints[dark ? 700 : 300].hex).string(),
          placeholder: mix(base.bg, tints[dark ? 300 : 700].hex).string(),
        }
      default:
    }
    return {
      bg: base.bg,
      fg: base.fg,
      border: base.border,
      placeholder: mix(base.bg, tints[dark ? 300 : 700].hex).string(),
    }
  },

  card: ({ base, dark, muted, name, state }) => {
    let mix = dark ? screen : multiply

    switch (state) {
      case 'disabled':
        return {
          ...muted.disabled,
          muted: muted.disabled.fg,
          accent: muted.disabled.fg,
          link: muted.disabled.fg,
          code: muted.disabled.fg,
          output: muted.disabled.bg,
        }
      case 'hovered':
        const hoverBg = muted.hovered.bg

        return {
          ...muted.hovered,
          border: mix(hoverBg, base.border).string(),
          muted: mix(hoverBg, hues.gray[dark ? 400 : 700].hex).string(),
          accent: mix(hoverBg, variants.accent[dark ? 500 : 500].hex).string(),
          link: mix(hoverBg, variants.primary[dark ? 400 : 700].hex).string(),
          code: hues.gray[dark ? 400 : 700].hex,
          output: mix(base.bg, hues.gray[dark ? 950 : 50].hex).string(),
        }
      case 'pressed':
        return {
          ...muted.pressed,
          fg: base.fg,
          muted: mix(muted.pressed.bg, hues.gray[dark ? 400 : 700].hex).string(),
          accent: mix(muted.pressed.bg, variants.accent[dark ? 500 : 500].hex).string(),
          link: mix(muted.pressed.bg, variants.primary[dark ? 400 : 700].hex).string(),
          code: hues.gray[dark ? 400 : 700].hex,
          output: mix(base.bg, hues.gray[dark ? 950 : 50].hex).string(),
        }
      case 'selected':
        mix = dark ? multiply : screen
        const tint = ['default', 'transparent'].includes(name) ? hues.blue : variants[name]
        const bg = tint[dark ? 400 : 500].hex

        return {
          bg,
          fg: dark ? BLACK : WHITE,
          border: tint[dark ? 300 : 400].hex,
          muted: mix(bg, hues.gray[dark ? 600 : 300].hex).string(),
          accent: mix(bg, variants.accent[dark ? 600 : 500].hex).string(),
          link: mix(bg, variants.primary[dark ? 600 : 300].hex).string(),
          code: hues.gray[dark ? 400 : 700].hex,
          output: mix(base.bg, hues.gray[dark ? 950 : 50].hex).string(),
        }
      default:
        return {
          bg: base.bg,
          fg: base.fg,
          border: base.border,
          // "muted" text color
          muted: mix(base.bg, hues.gray[dark ? 400 : 700].hex).string(),
          // "accent" (a.k.a., highlighted or accented/emphasized) text color
          accent: mix(base.bg, variants.accent[dark ? 500 : 500].hex).string(),
          // "link" text color
          link: mix(base.bg, variants.primary[dark ? 400 : 700].hex).string(),
          // "code" text color
          code: hues.gray[dark ? 400 : 700].hex,
          // background color for a `pre` element or `output` container
          output: mix(base.bg, hues.gray[dark ? 950 : 50].hex).string(),
        }
    }
  },

  spot: ({ base, dark, key }) => {
    const mix = dark ? screen : multiply
    // console.log('makeThemStyles', base, key)
    return mix(base.bg, hues[key][dark ? 400 : 500].hex).string()
  },

  syntax: ({ base, dark }) => {
    const mix = dark ? screen : multiply
    const mainShade = dark ? 400 : 600
    const secondaryShade = dark ? 600 : 400

    return {
      atrule: mix(base.bg, hues.purple[mainShade].hex).string(),
      attrName: mix(base.bg, hues.green[mainShade].hex).string(),
      attrValue: mix(base.bg, hues.yellow[mainShade].hex).string(),
      attribute: mix(base.bg, hues.yellow[mainShade].hex).string(),
      boolean: mix(base.bg, hues.purple[mainShade].hex).string(),
      builtin: mix(base.bg, hues.purple[mainShade].hex).string(),
      cdata: mix(base.bg, hues.yellow[mainShade].hex).string(),
      char: mix(base.bg, hues.yellow[mainShade].hex).string(),
      class: mix(base.bg, hues.orange[mainShade].hex).string(),
      className: mix(base.bg, hues.cyan[mainShade].hex).string(),
      comment: mix(base.bg, hues.gray[secondaryShade].hex).string(),
      constant: mix(base.bg, hues.purple[mainShade].hex).string(),
      deleted: mix(base.bg, hues.red[mainShade].hex).string(),
      doctype: mix(base.bg, hues.gray[secondaryShade].hex).string(),
      entity: mix(base.bg, hues.red[mainShade].hex).string(),
      function: mix(base.bg, hues.green[mainShade].hex).string(),
      hexcode: mix(base.bg, hues.blue[mainShade].hex).string(),
      id: mix(base.bg, hues.purple[mainShade].hex).string(),
      important: mix(base.bg, hues.purple[mainShade].hex).string(),
      inserted: mix(base.bg, hues.yellow[mainShade].hex).string(),
      keyword: mix(base.bg, hues.magenta[mainShade].hex).string(),
      number: mix(base.bg, hues.purple[mainShade].hex).string(),
      operator: mix(base.bg, hues.magenta[mainShade].hex).string(),
      prolog: mix(base.bg, hues.gray[secondaryShade].hex).string(),
      property: mix(base.bg, hues.blue[mainShade].hex).string(),
      pseudoClass: mix(base.bg, hues.yellow[mainShade].hex).string(),
      pseudoElement: mix(base.bg, hues.yellow[mainShade].hex).string(),
      punctuation: mix(base.bg, hues.gray[mainShade].hex).string(),
      regex: mix(base.bg, hues.blue[mainShade].hex).string(),
      selector: mix(base.bg, hues.red[mainShade].hex).string(),
      string: mix(base.bg, hues.yellow[mainShade].hex).string(),
      symbol: mix(base.bg, hues.purple[mainShade].hex).string(),
      tag: mix(base.bg, hues.red[mainShade].hex).string(),
      unit: mix(base.bg, hues.orange[mainShade].hex).string(),
      url: mix(base.bg, hues.red[mainShade].hex).string(),
      variable: mix(base.bg, hues.red[mainShade].hex).string(),
    }
  },
})
