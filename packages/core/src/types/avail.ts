export type AvailModuleType =
  | 'background'
  | 'border'
  | 'borderRadius'
  | 'boxShadow'
  | 'color'
  | 'display'
  | 'flexDirection'
  | 'flexWrap'
  | 'flex'
  | 'flexGrow'
  | 'flexShrink'
  | 'justifyContent'
  | 'alignItems'
  | 'alignContent'
  | 'alignSelf'
  | 'float'
  | 'fontFamily'
  | 'fontSize'
  | 'fontStyle'
  | 'fontWeight'
  | 'overflow'
  | 'overflowX'
  | 'overflowY'
  | 'position'
  | 'width'
  | 'height'
  | 'minWidth'
  | 'maxWidth'
  | 'margin'
  | 'padding'
  | 'textAlign'
  | 'textDecoration'
  | 'textTransform'
  | 'whitespace'
  | 'transition'
  | 'verticalAlign'
  | 'visibility'

// export type ModuleConfig = Record<AvailModuleType, boolean>;

export interface AvailSettings extends Record<string, any> {
  prefix?: string
  reboot?: boolean
  modules: Record<AvailModuleType, boolean>
  breakpoints: Record<string, string>
  grays: Record<string, string>
  colors: Record<string, string>
  variants: Record<string, string>
  body: { backgroundColor: string; color: string }
  border: { width: string; color: string }
  borderRadius: Record<string, string>
  directions: Record<string, string>
  fontFamilies: Record<string, string>
  keywordSizes: Record<string, string>
  negativeMarginPrefix: string
  sizes: Record<string, string>
  spacing: Record<string, string>
}

export interface AvailModuleConfig {
  class: string | null
  property: string | string[]
  responsive?: boolean
  values?: Record<string, any>
}

// export type AvailModules = Record<AvailModuleType, AvailModuleConfig>;
export interface AvailModules {
  [key: string]: AvailModuleConfig
}

export interface AvailConfig {
  settings: AvailSettings
  modules: AvailModules
  extras?: Record<string, any>
}
