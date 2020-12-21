import { css, FlattenSimpleInterpolation, Keyframes } from 'styled-components'
// import { isPlainObject, typeOf } from '../utils'

interface TransitionParams {
  property?: string | Keyframes | FlattenSimpleInterpolation
  dur?: number | string
  duration?: number | string
  timing?: number[] | string
  delay?: number | string
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse'
  // both?: boolean
  // infinite?: boolean
  iterationCount?: number | string // 'infinite' also
  fillMode?: 'forwards' | 'backwards' | 'both' | 'none'
  playState?: 'paused' | 'running'
}

const _durations = {
  linear: 80,
  enter: 300,
  leave: 300,
  easeIn: 300,
  easeOut: 400,
  easeInOut: 500,
  fastOutSlowIn: 500,
  fastOutLinearIn: 500,
  linearOutSlowIn: 500,
}

const _timings = {
  enter: [0, 0, 0.2, 0.1], // linearOutSlowIn
  leave: [0.4, 0, 1, 1], // fastOutLinearIn
  easeIn: [0.55, 0, 0.55, 0.2],
  easeOut: [0.25, 0.8, 0.25, 1],
  easeInOut: [0.35, 0, 0.25, 1],
  fastOutSlowIn: [0.4, 0, 0.2, 1],
  fastOutLinearIn: [0.4, 0, 1, 1],
  linearOutSlowIn: [0, 0, 0.2, 0.1],
}

const toMS = (dur: number | string): string => {
  if (typeof dur === 'string') {
    if (dur in _durations) {
      return `${parseInt('' + _durations[dur], 10)}ms`
    } else if (dur.endsWith('ms') || dur.endsWith('s')) {
      return dur
    }
  }
  return `${parseInt('' + dur, 10)}ms`
}

const durations = {
  ..._durations,
  ms: toMS,
  seconds: (dur: number | string) => {
    if (typeof dur === 'string') {
      if (dur in _durations) {
        return _durations[dur] / 1000
      }
      if (dur.endsWith('ms')) {
        return parseInt(dur, 10) / 1000
      }
      if (dur.endsWith('s')) {
        return parseInt(dur, 10)
      }
    }
    return parseInt('' + dur, 10)
  },
}

const toCubicBezier = (val: number[] | string) => {
  if (typeof val === 'string') {
    if (val in timings) {
      return `cubic-bezier(${timings[val]})`
    } else {
      return val as string
    }
  }
  if (Array.isArray(val) && val.length === 4) {
    return `cubic-bezier(${val.toString()})`
  } else {
    throw new Error(`${val} is not a named timing option or is not valid`)
  }
}

const timings = {
  ..._timings,
  cubicBezier: toCubicBezier,
}

export const transition = (params: TransitionParams) => {
  const { property = 'all ', ...props } = params
  const propsStr = Object.entries(props).reduce((acc, [k, v]) => {
    switch (k) {
      case 'duration':
      case 'delay':
        acc += ` ${toMS(v)}`
        break
      case 'timing':
        acc += ` ${toCubicBezier(v)}`
        break
      case 'direction':
      case 'fillMode':
      case 'iterationCount':
      case 'playState':
      default:
        acc += ` ${v}`
    }
    return acc
  }, '')
  return css`
    ${property} ${propsStr}
  `
}

const stringFactory = (params: string | TransitionParams, ...props: string[]) => {
  if (typeof params == 'string') {
    if (props?.length) {
      return props
        .map((property) =>
          transition({ property, duration: params, timing: params }).join(' ').trim(),
        )
        .join(', ')
    } else {
      return transition({ property: 'all', duration: params, timing: params })
    }
  }

  if (props?.length) {
    return props
      .map((property) => {
        const ret = transition({ property, ...params })
          .join(' ')
          .trim()
        // console.log('transition', params, ret)
        return ret
      })
      .join(', ')
  }
  // console.log('transition:', transition(params))
  return transition(params)
}

export const transitions = {
  duration: durations,
  timing: timings,
}

export const animationMixin = (params: string | TransitionParams, ...props: string[]) => css`
  animation: ${css`
    ${stringFactory(params, ...props)};
  `};
`
export const transitionMixin = (params: string | TransitionParams, ...props: string[]) => css`
  transition: ${css`
    ${stringFactory(params, ...props)};
  `};
`
