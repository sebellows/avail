export const GLOBAL_CSS_VALUES = ['inherit', 'initial', 'unset']

// export interface BaseTheme<Styles extends {} = {}> {
//   avatar: ThemeAvatar
//   button: {
//     textWeight: ThemeFontWeightKey
//   }
//   color: ThemeColorSchemes
//   container: number[]
//   focusRing: {
//     offset: number
//     width: number
//   }
//   fonts: ThemeFonts
//   media: number[]
//   radius: number[]
//   shadows: Array<ThemeShadow | null>
//   space: number[]
//   input: ThemeInput
//   styles?: Styles
// }

export const CSS_VALUE_PRESETS = {
  align: ['baseline', 'top', 'middle', 'bottom', 'text-bottom', 'text-top', ...GLOBAL_CSS_VALUES],
  borderStyle: [
    'none',
    'hidden',
    'dotted',
    'dashed',
    'solid',
    'double',
    'groove',
    'ridge',
    'inset',
    'outset',
    ...GLOBAL_CSS_VALUES,
  ],
  float: ['left', 'right', 'none', ...GLOBAL_CSS_VALUES],
  overflow: ['visible', 'hidden', 'clip', 'auto', 'scroll', ...GLOBAL_CSS_VALUES],
  display: [
    'none',
    'inline',
    'inline-block',
    'block',
    'table',
    'table-row',
    'table-cell',
    'flex',
    'inline-flex',
    ...GLOBAL_CSS_VALUES,
  ],
  position: ['static', 'relative', 'absolute', 'fixed', 'sticky', ...GLOBAL_CSS_VALUES],
  flexDirection: ['row', 'column', 'row-reverse', 'column-reverse', ...GLOBAL_CSS_VALUES],
  flexWrap: ['wrap', 'nowrap', 'wrap-reverse', ...GLOBAL_CSS_VALUES],
  justifyContent: [
    'flex-start',
    'flex-end',
    'center',
    'space-between',
    'space-around',
    ...GLOBAL_CSS_VALUES,
  ],
  alignItems: ['flex-start', 'flex-end', 'center', 'baseline', 'stretch', ...GLOBAL_CSS_VALUES],
  alignContent: [
    'flex-start',
    'flex-end',
    'center',
    'space-between',
    'space-around',
    'stretch',
    ...GLOBAL_CSS_VALUES,
  ],
  alignSelf: [
    'auto',
    'flex-start',
    'flex-end',
    'center',
    'baseline',
    'stretch',
    ...GLOBAL_CSS_VALUES,
  ],
  // Text
  fontStyle: ['italic', 'normal', ...GLOBAL_CSS_VALUES],
  fontWeight: [
    'normal',
    'bold',
    'lighter',
    'bolder',
    '100',
    '200',
    '300',
    '400',
    '500',
    '600',
    '700',
    '800',
    '900',
    ...GLOBAL_CSS_VALUES,
  ],
  textTransform: ['lowercase', 'uppercase', 'capitalize', 'none', ...GLOBAL_CSS_VALUES],
  textAlign: ['left', 'right', 'center', 'justify', ...GLOBAL_CSS_VALUES],
  whiteSpace: [
    'normal',
    'nowrap',
    'pre',
    'pre-line',
    'pre-wrap',
    'break-spaces',
    ...GLOBAL_CSS_VALUES,
  ],
  textDecorationLine: [
    'line-through',
    'none',
    'overline',
    'underline',
    'underline overline',
    ...GLOBAL_CSS_VALUES,
  ],
  textDecorationStyle: [
    'dashed',
    'dotted',
    'double',
    'none',
    'solid',
    'wavy',
    ...GLOBAL_CSS_VALUES,
  ],
  userSelect: ['all', 'auto', 'text', 'none'],
  pointerEvents: ['none', 'auto', ...GLOBAL_CSS_VALUES],
  visibility: ['visible', 'hidden', 'collapse', ...GLOBAL_CSS_VALUES],
}
