import { bezierIn, bezierInOut, bezierOut } from './constants'
import { TimingFunction } from './types'

/**
 * String to represent common easing functions as demonstrated here: (github.com/jaukia/easie).
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   'transitionTimingFunction': easeIn('easeInQuad')
 * }
 *
 * // styled-components usage
 *  const div = styled.div`
 *   transitionTimingFunction: ${easeIn('easeInQuad')};
 * `
 *
 * // CSS as JS Output
 *
 * 'div': {
 *   'transitionTimingFunction': 'cubic-bezier(0.11, 0, 0.5, 0)',
 * }
 */
export function easeIn(name: TimingFunction): string {
  const points = bezierIn[name.toLowerCase().trim()]
  return `cubic-bezier(${points})`
}

export function easeOut(name: TimingFunction): string {
  const points = bezierOut[name.toLowerCase().trim()]
  return `cubic-bezier(${points})`
}

export function easeInOut(name: TimingFunction): string {
  const points = bezierInOut[name.toLowerCase().trim()]
  return `cubic-bezier(${points})`
}

/**
 * Shorthand utility map for access to easing functions.
 * TODO: possibly remove
 */
export const ease: Record<'in' | 'out' | 'inOut', (name: TimingFunction) => string> = {
  in: easeIn,
  out: easeOut,
  inOut: easeInOut,
}
