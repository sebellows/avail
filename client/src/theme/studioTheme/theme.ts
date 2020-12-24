import { RootTheme } from '../types'
import { color } from './color'
import { fonts } from './fonts'

export const studioTheme: RootTheme = {
  button: {
    textWeight: 'medium',
  },
  color,
  container: [540, 720, 960, 1140],
  focusRing: {
    offset: 1,
    width: 2,
  },
  fonts,
  media: [576, 768, 992, 1200],
  radius: [0, 1, 3, 6, 9, 12, 21],
  dropShadows: [null, [0, 0, 2], [0, 0, 4], [0, 0, 5], [0, 0, 10]],
  shadows: [
    null,
    // 1
    // {umbra: [0, 2, 1, -1], penumbra: [0, 1, 1, 0], ambience: [0, 1, 3, 0]},
    { umbra: [0, 0, 0, 0], penumbra: [0, 0, 0, 0], ambience: [0, 0, 0, 0] },
    // 6
    { umbra: [0, 3, 5, -1], penumbra: [0, 6, 10, 0], ambience: [0, 1, 18, 0] },
    // 12
    { umbra: [0, 7, 8, -4], penumbra: [0, 12, 17, 2], ambience: [0, 5, 22, 4] },
    // 18
    { umbra: [0, 9, 11, -5], penumbra: [0, 18, 28, 2], ambience: [0, 7, 34, 6] },
    // 24
    { umbra: [0, 11, 15, -7], penumbra: [0, 24, 38, 3], ambience: [0, 9, 46, 8] },
  ],
  space: [0, 4, 8, 12, 16, 24, 40],
  control: {
    checkbox: {
      size: 24,
    },
    radio: {
      size: 24,
    },
    switch: {
      barWidth: 48,
      size: 32,
      strokeWidth: 2.75,
      transitionDurationMs: 500,
      transitionTimingFunction: 'ease-out',
    },
    border: {
      width: 1,
    },
  },
}
