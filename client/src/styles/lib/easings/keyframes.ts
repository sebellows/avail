import { CSSObject } from '../../../types'
import { roundTo2DecimalPlaces } from './helpers'
import { easingsFunctions } from './easingFunctions'
import { KeyframeTimingFunction, KeyframeType } from './types'
import { keyframesIn, keyframesInOut, keyframesOut } from './constants'

/**
 * Builds out an animation keyframe declaration from configured keyframe and easing settings.
 *
 * @example
 * const easeInElastic = generateAnimationKeyframe('easeInElastic', KeyframeType.translateY)
 * returns
 * `@keyframes translateY-easeInElastic {
 *   0% { transform: translateY(0%); }
 *   4% { transform: translateY(-0.04%); }
 *   8% { transform: translateY(-0.16%); }
 *   14% { transform: translateY(-0.17%); }
 *   18% { transform: translateY(0.04%); }
 *   26% { transform: translateY(0.58%); }
 *   28% { transform: translateY(0.55%); }
 *   40% { transform: translateY(-1.56%); }
 *   42% { transform: translateY(-1.64%); }
 *   56% { transform: translateY(4.63%); }
 *   58% { transform: translateY(4.4%); }
 *   72% { transform: translateY(-13.12%); }
 *   86% { transform: translateY(37.06%); }
 *   100% { transform: translateY(-100%); }
 * }`
 */
function generateAnimationKeyframe(
  name: KeyframeTimingFunction,
  keyframeMap: Record<KeyframeTimingFunction, number[]>,
  property: KeyframeType,
) {
  if (!(name in keyframeMap)) {
    throw new Error(
      `Invalid key: ${name} does not exist in keyframeMap [generateAnimationKeyframe].`,
    )
  }

  const keyframeList = keyframeMap[name].reduce((frames, coord: number) => {
    const keyframeValue = easingsFunctions[name](coord / 100)

    frames[`${coord}%`] = keyframeReducer(property, keyframeValue)

    return frames
  }, {})

  return { [`@keyframes ${property}-${name}`]: keyframeList }
}

function keyframeReducer(property: KeyframeType, value: number): CSSObject {
  const roundValue = roundTo2DecimalPlaces(1 - value)

  switch (property) {
    case KeyframeType.opacity:
      return { opacity: `${roundValue}` }
    case KeyframeType.scale:
      return { transform: `scale(${roundValue})` }
    case KeyframeType.translate:
      return { transform: `translateX(${roundTo2DecimalPlaces(-100 * value)}%)` }
    case KeyframeType.translateX:
      return { transform: `translateX(${roundTo2DecimalPlaces(-100 * value)}%)` }
    case KeyframeType.translateY:
      return { transform: `translateY(${roundTo2DecimalPlaces(-100 * value)}%)` }
    default:
      return {}
  }
}

export function generateKeyframesIn(name: KeyframeTimingFunction, property: KeyframeType) {
  return generateAnimationKeyframe(name, keyframesIn, property)
}

export function generateKeyframesOut(name: KeyframeTimingFunction, property: KeyframeType) {
  return generateAnimationKeyframe(name, keyframesOut, property)
}

export function generateKeyframesInOut(name: KeyframeTimingFunction, property: KeyframeType) {
  return generateAnimationKeyframe(name, keyframesInOut, property)
}
