import { capitalize, Color } from '../../../core/src'

import { MAX_TINT, MIN_TINT } from './const'
import { BaseColorKey, ColorConfig, ColorConfigInput, PaletteColor, PaletteColors } from './types'

const buildBaseColors = (config: ColorConfigInput): Record<BaseColorKey, PaletteColor> => {
  return Object.entries(config.base).reduce((obj, [colorName, value]) => {
    obj[colorName] = {
      title: capitalize(colorName),
      value,
    }

    return obj
  }, {}) as Record<BaseColorKey, PaletteColor>
}

/**
 * @name buildPalette
 * @description
 * Takes the configuration of a color hue and creates a named export containing a generated set of tints.
 *
 * @param hue - The name of the hue to have a set of tints made for.
 * @param config - The hue configuration from either the `config.ts` file or a passed JSON object as an option.
 */
const buildPaletteColors = (config: ColorConfigInput): PaletteColors => {
  const { base, palette, tints: tintConfig } = config
  const { darkest, lightest } = base

  // Validate tint points that they do not go below 0 or above 1000
  const tints = tintConfig.filter((tint) => tint > MIN_TINT && tint < MAX_TINT)

  return Object.entries(palette).reduce((acc, [colorName, colorConfig]) => {
    const { hex, midPoint } = colorConfig
    const darkSize = MAX_TINT - midPoint

    acc[colorName] = tints.reduce((obj, tint) => {
      const lightPosition = tint / midPoint
      const darkPosition = (tint - midPoint) / darkSize

      const midHue = Color(hex)
      const lightestHue = Color(lightest)
      const darkestHue = Color(darkest)

      let tintValue = hex.toLowerCase()

      if (tint < midPoint) {
        // light side of scale
        tintValue = lightestHue.mix(midHue, lightPosition).hex()
      } else if (tint > midPoint) {
        // dark side of scale
        tintValue = midHue.mix(darkestHue, darkPosition).hex()
      }

      obj[tint] = {
        title: `${capitalize(colorName)} ${tint}`,
        value: tintValue,
      }

      return obj
    }, {})

    return acc
  }, {})
}

// const buildVariantColors = (config: ColorConfigInput, colors: PaletteColors) => {
//   return Object.entries(config.variants).reduce((acc, [variant, colorName]) => {
//     if (colorName in colors) {
//       acc[variant] = colors[colorName]
//     }

//     return acc
//   }, {})
// }

export const parseColorConfig = (config: ColorConfigInput): ColorConfig => {
  const { states, tints, variants } = config

  const base = buildBaseColors(config)
  const palette = buildPaletteColors(config)
  // const variants = buildVariantColors(config, palette)

  return {
    base,
    palette,
    variants,
    states,
    tints,
  }
}
