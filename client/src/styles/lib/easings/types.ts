/** Types of cubic-bezier transitions (not animations) */
export type TimingFunction =
  | 'back'
  | 'circ'
  | 'cubic'
  | 'expo'
  | 'quad'
  | 'quart'
  | 'quint'
  | 'sine'

/** Types of cubic-bezier transtions for keyframe animations */
export type KeyframeTimingFunction = 'elastic' | 'bounce'

export enum KeyframeType {
  opacity = 'opacity',
  scale = 'scale',
  translate = 'translate',
  translateX = 'translateX',
  translateY = 'translateY',
}
