// import { defaultOpts } from './defaults'
import { ColorConfig, PaletteColor, VariantColorKey } from '../color/types'
import {
  ThemeButtonColors,
  ThemeButtonModeKey,
  ThemeButtonVariantStates,
  ThemeCardColors,
  ThemeColor,
  ThemeColorBuilderOptions,
  ThemeMutedColorStateStyles,
  ThemeMutedColors,
  ThemeColorScheme,
  ThemeSolidColorStateStyles,
  ThemeSolidColors,
  ThemeSpotColors,
  ThemeColorSyntax,
  ThemeFormColors,
  ThemeFormStateKey,
  ThemeModeKey,
  ThemeStyleColorBase,
  THEME_BUTTON_MODES,
  THEME_FORM_MODES,
} from './types'

// type PartialThemeColorBuilderOpts = Partial<ThemeColorBuilderOptions>

export function createColorTheme<V extends string | PaletteColor>(
  config: ColorConfig,
  themeOpts: ThemeColorBuilderOptions<V>,
): Record<ThemeModeKey, ThemeColorScheme<V>> {
  const builders: ThemeColorBuilderOptions<V> = themeOpts

  return {
    light: createColorScheme<V>(config, builders, false),
    dark: createColorScheme<V>(config, builders, true),
  }
}

function createColorScheme<V extends string | PaletteColor>(
  config: ColorConfig,
  options: ThemeColorBuilderOptions<V>,
  dark: boolean,
): ThemeColorScheme<V> {
  return {
    default: createColor<V>(config, options, dark, 'default'),
    accent: createColor<V>(config, options, dark, 'accent'),
    primary: createColor<V>(config, options, dark, 'primary'),
    success: createColor<V>(config, options, dark, 'success'),
    warning: createColor<V>(config, options, dark, 'warning'),
    danger: createColor<V>(config, options, dark, 'danger'),
  }
}

function createButtonVariants<V extends string | PaletteColor>(
  config: ColorConfig,
  options: ThemeColorBuilderOptions<V>,
  base: ThemeStyleColorBase<V>,
  dark: boolean,
  solid: ThemeSolidColors<V>,
  muted: ThemeMutedColors<V>,
  mode: ThemeButtonModeKey,
): ThemeButtonVariantStates<V> {
  return Object.keys(config.variants).reduce((acc, variant) => {
    acc[variant] = config.states.reduce((states, state) => {
      states[state] = options.button({
        base,
        dark,
        muted: muted[variant],
        solid: solid[variant] as ThemeSolidColorStateStyles<V>,
        mode,
      })

      return states
    }, {})

    return acc
  }, {})
}

function createButtonModes<V extends string | PaletteColor>(
  config: ColorConfig,
  options: ThemeColorBuilderOptions<V>,
  base: ThemeStyleColorBase<V>,
  dark: boolean,
  solid: ThemeSolidColors<V>,
  muted: ThemeMutedColors<V>,
): ThemeButtonColors<V> {
  return THEME_BUTTON_MODES.reduce((obj, mode) => {
    obj[mode] = createButtonVariants<V>(config, options, base, dark, solid, muted, mode)

    return obj
  }, {} as ThemeButtonColors<V>)
}

function createFormModes<V extends string | PaletteColor>(
  config: ColorConfig,
  options: ThemeColorBuilderOptions<V>,
  base: ThemeStyleColorBase<V>,
  dark: boolean,
  solid: ThemeSolidColors<V>,
  muted: ThemeMutedColors<V>,
): ThemeFormColors<V> {
  const defaultSolid = solid.default as ThemeSolidColorStateStyles<V, ThemeFormStateKey>
  const defaultMuted = muted.default as ThemeMutedColorStateStyles<V, ThemeFormStateKey>

  const formStates = [...config.states.slice(), 'readOnly'] as ThemeFormStateKey[]
  const modes = THEME_FORM_MODES.slice()

  return modes.reduce((acc, mode) => {
    acc[mode] = formStates.reduce((obj, state) => {
      obj[state] = options.form({
        base,
        dark,
        mode,
        solid: defaultSolid,
        muted: defaultMuted,
      })

      return obj
    }, {})

    return acc
  }, {} as ThemeFormColors<V>)
}

function createColor<V extends string | PaletteColor>(
  config: ColorConfig,
  options: ThemeColorBuilderOptions<V>,
  dark: boolean,
  name: VariantColorKey,
): ThemeColor<V> {
  const base = options.base({ dark, name })

  const solid: ThemeSolidColors<V> = Object.keys(config.variants).reduce((acc, variant) => {
    acc[variant] = config.states.reduce((states, state) => {
      states[state] = options.solid({ base, dark, variant, name, state })

      return states
    }, {})

    return acc
  }, {})

  const muted: ThemeMutedColors<V> = Object.keys(config.variants).reduce((acc, variant) => {
    acc[variant] = config.states.reduce((states, state) => {
      states[state] = options.muted({ base, dark, variant, name, state })

      return states
    }, {})

    return acc
  }, {})

  const card: ThemeCardColors<V> = Object.keys(config.variants).reduce((acc, variant) => {
    acc[variant] = config.states.reduce((states, state) => {
      states[state] = options.card({ base, dark, muted, name, state, solid })

      return states
    }, {})

    return acc
  }, {})

  const button: ThemeButtonColors<V> = createButtonModes<V>(
    config,
    options,
    base,
    dark,
    solid,
    muted,
  )

  const spot: ThemeSpotColors<V> = Object.keys(config.palette).reduce((acc, key) => {
    acc[key] = options.spot({ base, dark, key })

    return acc
  }, {})

  const form: ThemeFormColors<V> = createFormModes<V>(config, options, base, dark, solid, muted)

  const syntax: ThemeColorSyntax = options.syntax({ base, dark })

  return { base, button, card, dark, form, spot, syntax, solid, muted }
}
