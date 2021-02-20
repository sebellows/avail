// import { defaultOpts } from './defaults'
import {
  ThemeColor,
  ThemeColorBuilderOptions,
  ThemeColorButton,
  ThemeColorCardState,
  ThemeColorInput,
  ThemeColorMutedVariants,
  ThemeColorVariant,
  ThemeColorScheme,
  ThemeColorSchemes,
  ThemeColorSolidVariants,
  ThemeColorSpot,
  ThemeColorSyntax,
} from './types'

// type PartialThemeColorBuilderOpts = Partial<ThemeColorBuilderOptions>

export function createColorTheme(themeOpts: ThemeColorBuilderOptions): ThemeColorSchemes {
  const builders: ThemeColorBuilderOptions = themeOpts

  return {
    light: createColorScheme(builders, false),
    dark: createColorScheme(builders, true),
  }
}

function createColorScheme(options: ThemeColorBuilderOptions, dark: boolean): ThemeColorScheme {
  return {
    default: createColor(options, dark, 'default'),
    accent: createColor(options, dark, 'accent'),
    primary: createColor(options, dark, 'primary'),
    success: createColor(options, dark, 'success'),
    warning: createColor(options, dark, 'warning'),
    danger: createColor(options, dark, 'danger'),
  }
}

function createColor(
  options: ThemeColorBuilderOptions,
  dark: boolean,
  name: ThemeColorVariant,
): ThemeColor {
  const base = options.base({ dark, name })

  const solid: ThemeColorSolidVariants = {
    default: {
      active: options.solid({ base, dark, variant: 'default', name, state: 'active' }),
      disabled: options.solid({ base, dark, variant: 'default', name, state: 'disabled' }),
      hovered: options.solid({ base, dark, variant: 'default', name, state: 'hovered' }),
      pressed: options.solid({ base, dark, variant: 'default', name, state: 'pressed' }),
      selected: options.solid({ base, dark, variant: 'default', name, state: 'selected' }),
    },
    accent: {
      active: options.solid({ base, dark, variant: 'accent', name, state: 'active' }),
      disabled: options.solid({ base, dark, variant: 'accent', name, state: 'disabled' }),
      hovered: options.solid({ base, dark, variant: 'accent', name, state: 'hovered' }),
      pressed: options.solid({ base, dark, variant: 'accent', name, state: 'pressed' }),
      selected: options.solid({ base, dark, variant: 'accent', name, state: 'selected' }),
    },
    primary: {
      active: options.solid({ base, dark, variant: 'primary', name, state: 'active' }),
      disabled: options.solid({ base, dark, variant: 'primary', name, state: 'disabled' }),
      hovered: options.solid({ base, dark, variant: 'primary', name, state: 'hovered' }),
      pressed: options.solid({ base, dark, variant: 'primary', name, state: 'pressed' }),
      selected: options.solid({ base, dark, variant: 'primary', name, state: 'selected' }),
    },
    success: {
      active: options.solid({ base, dark, variant: 'success', name, state: 'active' }),
      disabled: options.solid({ base, dark, variant: 'success', name, state: 'disabled' }),
      hovered: options.solid({ base, dark, variant: 'success', name, state: 'hovered' }),
      pressed: options.solid({ base, dark, variant: 'success', name, state: 'pressed' }),
      selected: options.solid({ base, dark, variant: 'success', name, state: 'selected' }),
    },
    warning: {
      active: options.solid({ base, dark, variant: 'warning', name, state: 'active' }),
      disabled: options.solid({ base, dark, variant: 'warning', name, state: 'disabled' }),
      hovered: options.solid({ base, dark, variant: 'warning', name, state: 'hovered' }),
      pressed: options.solid({ base, dark, variant: 'warning', name, state: 'pressed' }),
      selected: options.solid({ base, dark, variant: 'warning', name, state: 'selected' }),
    },
    danger: {
      active: options.solid({ base, dark, variant: 'danger', name, state: 'active' }),
      disabled: options.solid({ base, dark, variant: 'danger', name, state: 'disabled' }),
      hovered: options.solid({ base, dark, variant: 'danger', name, state: 'hovered' }),
      pressed: options.solid({ base, dark, variant: 'danger', name, state: 'pressed' }),
      selected: options.solid({ base, dark, variant: 'danger', name, state: 'selected' }),
    },
  }

  const muted: ThemeColorMutedVariants = {
    default: {
      active: options.muted({ base, dark, variant: 'default', name, state: 'active' }),
      disabled: options.muted({ base, dark, variant: 'default', name, state: 'disabled' }),
      hovered: options.muted({ base, dark, variant: 'default', name, state: 'hovered' }),
      pressed: options.muted({ base, dark, variant: 'default', name, state: 'pressed' }),
      selected: options.muted({ base, dark, variant: 'default', name, state: 'selected' }),
    },
    accent: {
      active: options.muted({ base, dark, variant: 'accent', name, state: 'active' }),
      disabled: options.muted({ base, dark, variant: 'accent', name, state: 'disabled' }),
      hovered: options.muted({ base, dark, variant: 'accent', name, state: 'hovered' }),
      pressed: options.muted({ base, dark, variant: 'accent', name, state: 'pressed' }),
      selected: options.muted({ base, dark, variant: 'accent', name, state: 'selected' }),
    },
    primary: {
      active: options.muted({ base, dark, variant: 'primary', name, state: 'active' }),
      disabled: options.muted({ base, dark, variant: 'primary', name, state: 'disabled' }),
      hovered: options.muted({ base, dark, variant: 'primary', name, state: 'hovered' }),
      pressed: options.muted({ base, dark, variant: 'primary', name, state: 'pressed' }),
      selected: options.muted({ base, dark, variant: 'primary', name, state: 'selected' }),
    },
    success: {
      active: options.muted({ base, dark, variant: 'success', name, state: 'active' }),
      disabled: options.muted({ base, dark, variant: 'success', name, state: 'disabled' }),
      hovered: options.muted({ base, dark, variant: 'success', name, state: 'hovered' }),
      pressed: options.muted({ base, dark, variant: 'success', name, state: 'pressed' }),
      selected: options.muted({ base, dark, variant: 'success', name, state: 'selected' }),
    },
    warning: {
      active: options.muted({ base, dark, variant: 'warning', name, state: 'active' }),
      disabled: options.muted({ base, dark, variant: 'warning', name, state: 'disabled' }),
      hovered: options.muted({ base, dark, variant: 'warning', name, state: 'hovered' }),
      pressed: options.muted({ base, dark, variant: 'warning', name, state: 'pressed' }),
      selected: options.muted({ base, dark, variant: 'warning', name, state: 'selected' }),
    },
    danger: {
      active: options.muted({ base, dark, variant: 'danger', name, state: 'active' }),
      disabled: options.muted({ base, dark, variant: 'danger', name, state: 'disabled' }),
      hovered: options.muted({ base, dark, variant: 'danger', name, state: 'hovered' }),
      pressed: options.muted({ base, dark, variant: 'danger', name, state: 'pressed' }),
      selected: options.muted({ base, dark, variant: 'danger', name, state: 'selected' }),
    },
  }

  const card: ThemeColorCardState = {
    active: options.card({
      base,
      dark,
      name,
      state: 'active',
      solid: solid.default,
      muted: muted.default,
    }),
    disabled: options.card({
      base,
      dark,
      name,
      state: 'disabled',
      solid: solid.default,
      muted: muted.default,
    }),
    hovered: options.card({
      base,
      dark,
      name,
      state: 'hovered',
      solid: solid.default,
      muted: muted.default,
    }),
    pressed: options.card({
      base,
      dark,
      name,
      state: 'pressed',
      solid: solid.default,
      muted: muted.default,
    }),
    selected: options.card({
      base,
      dark,
      name,
      state: 'selected',
      solid: solid.default,
      muted: muted.default,
    }),
  }

  const button: ThemeColorButton = {
    default: {
      default: options.button({
        base,
        dark,
        mode: 'default',
        solid: solid.default,
        muted: muted.default,
      }),
      primary: options.button({
        base,
        dark,
        solid: solid.primary,
        muted: muted.primary,
        mode: 'default',
      }),
      success: options.button({
        base,
        dark,
        solid: solid.success,
        muted: muted.success,
        mode: 'default',
      }),
      warning: options.button({
        base,
        dark,
        solid: solid.warning,
        muted: muted.warning,
        mode: 'default',
      }),
      danger: options.button({
        base,
        dark,
        solid: solid.danger,
        muted: muted.danger,
        mode: 'default',
      }),
    },
    outline: {
      default: options.button({
        base,
        dark,
        solid: solid.default,
        muted: muted.default,
        mode: 'outline',
      }),
      primary: options.button({
        base,
        dark,
        solid: solid.primary,
        muted: muted.primary,
        mode: 'outline',
      }),
      success: options.button({
        base,
        dark,
        solid: solid.success,
        muted: muted.success,
        mode: 'outline',
      }),
      warning: options.button({
        base,
        dark,
        solid: solid.warning,
        muted: muted.warning,
        mode: 'outline',
      }),
      danger: options.button({
        base,
        dark,
        solid: solid.danger,
        muted: muted.danger,
        mode: 'outline',
      }),
    },
    link: {
      default: options.button({
        base,
        dark,
        solid: solid.default,
        muted: muted.default,
        mode: 'link',
      }),
      primary: options.button({
        base,
        dark,
        solid: solid.primary,
        muted: muted.primary,
        mode: 'link',
      }),
      success: options.button({
        base,
        dark,
        solid: solid.success,
        muted: muted.success,
        mode: 'link',
      }),
      warning: options.button({
        base,
        dark,
        solid: solid.warning,
        muted: muted.warning,
        mode: 'link',
      }),
      danger: options.button({
        base,
        dark,
        solid: solid.danger,
        muted: muted.danger,
        mode: 'link',
      }),
    },
  }

  const spot: ThemeColorSpot = {
    gray: options.spot({ base, dark, key: 'gray' }),
    blue: options.spot({ base, dark, key: 'blue' }),
    purple: options.spot({ base, dark, key: 'purple' }),
    magenta: options.spot({ base, dark, key: 'magenta' }),
    red: options.spot({ base, dark, key: 'red' }),
    orange: options.spot({ base, dark, key: 'orange' }),
    yellow: options.spot({ base, dark, key: 'yellow' }),
    green: options.spot({ base, dark, key: 'green' }),
    cyan: options.spot({ base, dark, key: 'cyan' }),
  }

  const input: ThemeColorInput = {
    default: {
      active: options.input({
        base,
        dark,
        mode: 'default',
        state: 'active',
        solid: solid.default,
        muted: muted.default,
      }),
      disabled: options.input({
        base,
        dark,
        mode: 'default',
        state: 'disabled',
        solid: solid.default,
        muted: muted.default,
      }),
      hovered: options.input({
        base,
        dark,
        mode: 'default',
        state: 'hovered',
        solid: solid.default,
        muted: muted.default,
      }),
    },
    invalid: {
      active: options.input({
        base,
        dark,
        mode: 'invalid',
        state: 'active',
        solid: solid.default,
        muted: muted.default,
      }),
      disabled: options.input({
        base,
        dark,
        mode: 'invalid',
        state: 'disabled',
        solid: solid.default,
        muted: muted.default,
      }),
      hovered: options.input({
        base,
        dark,
        mode: 'invalid',
        state: 'hovered',
        solid: solid.default,
        muted: muted.default,
      }),
    },
  }

  const syntax: ThemeColorSyntax = options.syntax({ base, dark })

  return { base, button, card, dark, input, spot, syntax, solid, muted }
}
