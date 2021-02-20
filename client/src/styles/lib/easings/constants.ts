import { TimingFunction, KeyframeTimingFunction } from './types'

export const keyframesIn: Record<KeyframeTimingFunction, number[]> = {
  elastic: [0, 4, 8, 14, 18, 26, 28, 40, 42, 56, 58, 72, 86, 100],
  bounce: [0, 4, 8, 18, 26, 46, 64, 76, 88, 100],
}

export const keyframesOut: Record<KeyframeTimingFunction, number[]> = {
  elastic: [0, 16, 28, 44, 59, 73, 88, 100],
  bounce: [0, 12, 24, 36, 54, 74, 82, 92, 96, 100],
}

export const keyframesInOut: Record<KeyframeTimingFunction, number[]> = {
  elastic: [0, 4, 8, 18, 20, 28, 30, 38, 40, 60, 62, 70, 72, 80, 82, 90, 92, 100],
  bounce: [0, 2, 4, 10, 14, 22, 32, 42, 50, 58, 68, 78, 86, 90, 96, 98, 100],
}

export const bezierIn: Record<TimingFunction, number[]> = {
  back: [0.36, 0, 0.66, -0.56],
  circ: [0.55, 0, 1, 0.45],
  cubic: [0.32, 0, 0.67, 0],
  expo: [0.7, 0, 0.84, 0],
  quad: [0.11, 0, 0.5, 0],
  quart: [0.5, 0, 0.75, 0],
  quint: [0.64, 0, 0.78, 0],
  sine: [0.12, 0, 0.39, 0],
}

export const bezierOut: Record<TimingFunction, number[]> = {
  back: [0.34, 1.56, 0.64, 1],
  circ: [0, 0.55, 0.45, 1],
  expo: [0.16, 1, 0.3, 1],
  quad: [0.5, 1, 0.89, 1],
  cubic: [0.33, 1, 0.68, 1],
  quart: [0.25, 1, 0.5, 1],
  quint: [0.22, 1, 0.36, 1],
  sine: [0.61, 1, 0.88, 1],
}

export const bezierInOut: Record<TimingFunction, number[]> = {
  back: [0.68, -0.6, 0.32, 1.6],
  circ: [0.85, 0, 0.15, 1],
  expo: [0.87, 0, 0.13, 1],
  quad: [0.45, 0, 0.55, 1],
  cubic: [0.65, 0, 0.35, 1],
  quart: [0.76, 0, 0.24, 1],
  quint: [0.83, 0, 0.17, 1],
  sine: [0.37, 0, 0.63, 1],
}
