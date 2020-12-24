import { defaultOptions } from './defaults'
import {
  ThemeColor,
  ThemeColorBuilderOptions,
  ThemeColorCard,
  ThemeColorButton,
  ThemeColorControl,
  ThemeColorMuted,
  ThemeColorName,
  ThemeColorScheme,
  ThemeColorSchemes,
  ThemeColorSolid,
  ThemeColorSpot,
  ThemeColorSyntax,
} from './types'

export * from './types'

export function createColorTheme(
  options: Partial<ThemeColorBuilderOptions> = {},
): ThemeColorSchemes {
  const builders: ThemeColorBuilderOptions = { ...defaultOptions, ...options }

  return {
    light: createColorScheme(builders, false),
    dark: createColorScheme(builders, true),
  }
}

function createColorScheme(opts: ThemeColorBuilderOptions, dark: boolean): ThemeColorScheme {
  return {
    neutral: createColor(opts, dark, 'neutral'),
    primary: createColor(opts, dark, 'primary'),
    accent: createColor(opts, dark, 'accent'),
    success: createColor(opts, dark, 'success'),
    warning: createColor(opts, dark, 'warning'),
    danger: createColor(opts, dark, 'danger'),
  }
}

function createColor(
  opts: ThemeColorBuilderOptions,
  dark: boolean,
  name: ThemeColorName,
): ThemeColor {
  const base = opts.base({ dark, name })

  const solid: ThemeColorSolid = {
    neutral: {
      active: opts.solid({ base, dark, tone: 'neutral', name, state: 'active' }),
      disabled: opts.solid({ base, dark, tone: 'neutral', name, state: 'disabled' }),
      hovered: opts.solid({ base, dark, tone: 'neutral', name, state: 'hovered' }),
      pressed: opts.solid({ base, dark, tone: 'neutral', name, state: 'pressed' }),
      selected: opts.solid({ base, dark, tone: 'neutral', name, state: 'selected' }),
    },
    accent: {
      active: opts.solid({ base, dark, tone: 'accent', name, state: 'active' }),
      disabled: opts.solid({ base, dark, tone: 'accent', name, state: 'disabled' }),
      hovered: opts.solid({ base, dark, tone: 'accent', name, state: 'hovered' }),
      pressed: opts.solid({ base, dark, tone: 'accent', name, state: 'pressed' }),
      selected: opts.solid({ base, dark, tone: 'accent', name, state: 'selected' }),
    },
    primary: {
      active: opts.solid({ base, dark, tone: 'primary', name, state: 'active' }),
      disabled: opts.solid({ base, dark, tone: 'primary', name, state: 'disabled' }),
      hovered: opts.solid({ base, dark, tone: 'primary', name, state: 'hovered' }),
      pressed: opts.solid({ base, dark, tone: 'primary', name, state: 'pressed' }),
      selected: opts.solid({ base, dark, tone: 'primary', name, state: 'selected' }),
    },
    success: {
      active: opts.solid({ base, dark, tone: 'success', name, state: 'active' }),
      disabled: opts.solid({ base, dark, tone: 'success', name, state: 'disabled' }),
      hovered: opts.solid({ base, dark, tone: 'success', name, state: 'hovered' }),
      pressed: opts.solid({ base, dark, tone: 'success', name, state: 'pressed' }),
      selected: opts.solid({ base, dark, tone: 'success', name, state: 'selected' }),
    },
    warning: {
      active: opts.solid({ base, dark, tone: 'warning', name, state: 'active' }),
      disabled: opts.solid({ base, dark, tone: 'warning', name, state: 'disabled' }),
      hovered: opts.solid({ base, dark, tone: 'warning', name, state: 'hovered' }),
      pressed: opts.solid({ base, dark, tone: 'warning', name, state: 'pressed' }),
      selected: opts.solid({ base, dark, tone: 'warning', name, state: 'selected' }),
    },
    danger: {
      active: opts.solid({ base, dark, tone: 'danger', name, state: 'active' }),
      disabled: opts.solid({ base, dark, tone: 'danger', name, state: 'disabled' }),
      hovered: opts.solid({ base, dark, tone: 'danger', name, state: 'hovered' }),
      pressed: opts.solid({ base, dark, tone: 'danger', name, state: 'pressed' }),
      selected: opts.solid({ base, dark, tone: 'danger', name, state: 'selected' }),
    },
  }

  const muted: ThemeColorMuted = {
    neutral: {
      active: opts.muted({ base, dark, tone: 'neutral', name, state: 'active' }),
      disabled: opts.muted({ base, dark, tone: 'neutral', name, state: 'disabled' }),
      hovered: opts.muted({ base, dark, tone: 'neutral', name, state: 'hovered' }),
      pressed: opts.muted({ base, dark, tone: 'neutral', name, state: 'pressed' }),
      selected: opts.muted({ base, dark, tone: 'neutral', name, state: 'selected' }),
    },
    accent: {
      active: opts.muted({ base, dark, tone: 'accent', name, state: 'active' }),
      disabled: opts.muted({ base, dark, tone: 'accent', name, state: 'disabled' }),
      hovered: opts.muted({ base, dark, tone: 'accent', name, state: 'hovered' }),
      pressed: opts.muted({ base, dark, tone: 'accent', name, state: 'pressed' }),
      selected: opts.muted({ base, dark, tone: 'accent', name, state: 'selected' }),
    },
    primary: {
      active: opts.muted({ base, dark, tone: 'primary', name, state: 'active' }),
      disabled: opts.muted({ base, dark, tone: 'primary', name, state: 'disabled' }),
      hovered: opts.muted({ base, dark, tone: 'primary', name, state: 'hovered' }),
      pressed: opts.muted({ base, dark, tone: 'primary', name, state: 'pressed' }),
      selected: opts.muted({ base, dark, tone: 'primary', name, state: 'selected' }),
    },
    success: {
      active: opts.muted({ base, dark, tone: 'success', name, state: 'active' }),
      disabled: opts.muted({ base, dark, tone: 'success', name, state: 'disabled' }),
      hovered: opts.muted({ base, dark, tone: 'success', name, state: 'hovered' }),
      pressed: opts.muted({ base, dark, tone: 'success', name, state: 'pressed' }),
      selected: opts.muted({ base, dark, tone: 'success', name, state: 'selected' }),
    },
    warning: {
      active: opts.muted({ base, dark, tone: 'warning', name, state: 'active' }),
      disabled: opts.muted({ base, dark, tone: 'warning', name, state: 'disabled' }),
      hovered: opts.muted({ base, dark, tone: 'warning', name, state: 'hovered' }),
      pressed: opts.muted({ base, dark, tone: 'warning', name, state: 'pressed' }),
      selected: opts.muted({ base, dark, tone: 'warning', name, state: 'selected' }),
    },
    danger: {
      active: opts.muted({ base, dark, tone: 'danger', name, state: 'active' }),
      disabled: opts.muted({ base, dark, tone: 'danger', name, state: 'disabled' }),
      hovered: opts.muted({ base, dark, tone: 'danger', name, state: 'hovered' }),
      pressed: opts.muted({ base, dark, tone: 'danger', name, state: 'pressed' }),
      selected: opts.muted({ base, dark, tone: 'danger', name, state: 'selected' }),
    },
  }

  const card: ThemeColorCard = {
    active: opts.card({
      base,
      dark,
      name,
      state: 'active',
      solid: solid.neutral,
      muted: muted.neutral,
    }),
    disabled: opts.card({
      base,
      dark,
      name,
      state: 'disabled',
      solid: solid.neutral,
      muted: muted.neutral,
    }),
    hovered: opts.card({
      base,
      dark,
      name,
      state: 'hovered',
      solid: solid.neutral,
      muted: muted.neutral,
    }),
    pressed: opts.card({
      base,
      dark,
      name,
      state: 'pressed',
      solid: solid.neutral,
      muted: muted.neutral,
    }),
    selected: opts.card({
      base,
      dark,
      name,
      state: 'selected',
      solid: solid.neutral,
      muted: muted.neutral,
    }),
  }

  const button: ThemeColorButton = {
    default: {
      neutral: opts.button({
        base,
        dark,
        mode: 'default',
        solid: solid.neutral,
        muted: muted.neutral,
      }),
      primary: opts.button({
        base,
        dark,
        solid: solid.primary,
        muted: muted.primary,
        mode: 'default',
      }),
      accent: opts.button({
        base,
        dark,
        solid: solid.accent,
        muted: muted.accent,
        mode: 'default',
      }),
      success: opts.button({
        base,
        dark,
        solid: solid.success,
        muted: muted.success,
        mode: 'default',
      }),
      warning: opts.button({
        base,
        dark,
        solid: solid.warning,
        muted: muted.warning,
        mode: 'default',
      }),
      danger: opts.button({
        base,
        dark,
        solid: solid.danger,
        muted: muted.danger,
        mode: 'default',
      }),
    },
    ghost: {
      neutral: opts.button({
        base,
        dark,
        solid: solid.neutral,
        muted: muted.neutral,
        mode: 'ghost',
      }),
      primary: opts.button({
        base,
        dark,
        solid: solid.primary,
        muted: muted.primary,
        mode: 'ghost',
      }),
      accent: opts.button({
        base,
        dark,
        solid: solid.accent,
        muted: muted.accent,
        mode: 'ghost',
      }),
      success: opts.button({
        base,
        dark,
        solid: solid.success,
        muted: muted.success,
        mode: 'ghost',
      }),
      warning: opts.button({
        base,
        dark,
        solid: solid.warning,
        muted: muted.warning,
        mode: 'ghost',
      }),
      danger: opts.button({
        base,
        dark,
        solid: solid.danger,
        muted: muted.danger,
        mode: 'ghost',
      }),
    },
    bleed: {
      neutral: opts.button({
        base,
        dark,
        solid: solid.neutral,
        muted: muted.neutral,
        mode: 'bleed',
      }),
      primary: opts.button({
        base,
        dark,
        solid: solid.primary,
        muted: muted.primary,
        mode: 'bleed',
      }),
      accent: opts.button({
        base,
        dark,
        solid: solid.accent,
        muted: muted.accent,
        mode: 'bleed',
      }),
      success: opts.button({
        base,
        dark,
        solid: solid.success,
        muted: muted.success,
        mode: 'bleed',
      }),
      warning: opts.button({
        base,
        dark,
        solid: solid.warning,
        muted: muted.warning,
        mode: 'bleed',
      }),
      danger: opts.button({
        base,
        dark,
        solid: solid.danger,
        muted: muted.danger,
        mode: 'bleed',
      }),
    },
  }

  const spot: ThemeColorSpot = {
    gray: opts.spot({ base, dark, key: 'gray' }),
    blue: opts.spot({ base, dark, key: 'blue' }),
    purple: opts.spot({ base, dark, key: 'purple' }),
    magenta: opts.spot({ base, dark, key: 'magenta' }),
    red: opts.spot({ base, dark, key: 'red' }),
    orange: opts.spot({ base, dark, key: 'orange' }),
    yellow: opts.spot({ base, dark, key: 'yellow' }),
    green: opts.spot({ base, dark, key: 'green' }),
    cyan: opts.spot({ base, dark, key: 'cyan' }),
  }

  const control: ThemeColorControl = {
    default: {
      active: opts.control({
        base,
        dark,
        mode: 'default',
        state: 'active',
        solid: solid.neutral,
        muted: muted.neutral,
      }),
      disabled: opts.control({
        base,
        dark,
        mode: 'default',
        state: 'disabled',
        solid: solid.neutral,
        muted: muted.neutral,
      }),
      hovered: opts.control({
        base,
        dark,
        mode: 'default',
        state: 'hovered',
        solid: solid.neutral,
        muted: muted.neutral,
      }),
    },
    invalid: {
      active: opts.control({
        base,
        dark,
        mode: 'invalid',
        state: 'active',
        solid: solid.neutral,
        muted: muted.neutral,
      }),
      disabled: opts.control({
        base,
        dark,
        mode: 'invalid',
        state: 'disabled',
        solid: solid.neutral,
        muted: muted.neutral,
      }),
      hovered: opts.control({
        base,
        dark,
        mode: 'invalid',
        state: 'hovered',
        solid: solid.neutral,
        muted: muted.neutral,
      }),
    },
  }

  const syntax: ThemeColorSyntax = opts.syntax({ base, dark })

  return { base, button, card, dark, control, spot, syntax, solid, muted }
}
