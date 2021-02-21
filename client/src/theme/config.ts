import { color } from './colors'
import { fonts } from './fonts'
import { RootTheme, ThemeFontWeightKey } from './types'

const zOffsets = {
  dropdown: 700,
  tooltip: 800,
  fixedActionButton: 900,
  navDrawer: 1000,
  modal: 1100,
  dialog: 1110,
  toast: 1200,
}

const BORDER_COLOR = 'rgba(0, 0, 0, 0.12)'

const rootTheme: RootTheme = {
  border: {
    none: 0,
    base: `1px solid ${BORDER_COLOR}`,
    transparent: '1px solid transparent',
  },
  button: {
    textWeight: 'medium' as ThemeFontWeightKey,
  },
  color,
  container: {
    sm: 540,
    md: 720,
    lg: 976,
    xl: 1140,
  },
  focusRing: {
    offset: 1,
    width: 2,
  },
  fonts,
  media: {
    sm: 576,
    md: 768,
    lg: 990,
    xl: 1200,
  },
  radius: {
    none: 0,
    sm: 3,
    md: 5,
    lg: 9,
    pill: 800,
    circle: '50%',
  },
  shadow: [
    null,
    { umbra: [0, 0, 0, 0], penumbra: [0, 0, 0, 0], ambient: [0, 0, 0, 0] },
    { umbra: [0, 2, 1, -1], penumbra: [0, 1, 1, 0], ambient: [0, 1, 3, 0] },
    { umbra: [0, 3, 1, -2], penumbra: [0, 2, 3, 0], ambient: [0, 1, 5, 0] },
    { umbra: [0, 3, 3, -2], penumbra: [0, 3, 4, 0], ambient: [0, 1, 8, 0] },
    { umbra: [0, 2, 4, -1], penumbra: [0, 4, 5, 0], ambient: [0, 1, 10, 0] },
  ],
  space: [0, 2, 4, 8, 12, 16, 20, 24, 32, 52, 84, 136, 220],
  input: {
    checkbox: {
      size: 24,
    },
    radio: {
      size: 24,
      markSize: 16,
    },
    switch: {
      width: 36,
      height: 24,
      padding: 4,
      transitionDurationMs: 150,
      transitionTimingFunction: 'ease-out',
    },
    border: {
      width: 1,
    },
  },
  zOffsets,
}

export default rootTheme
export { rootTheme, zOffsets }
