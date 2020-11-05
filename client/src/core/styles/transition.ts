import { css } from 'styled-components'

interface TransitionParams {
  dur?: string
  timing?: string
  delay?: string
}

export const transition = {
  duration: {
    linear: '80ms',
    enter: '300ms',
    leave: '300ms',
    easeIn: '300ms',
    easeOut: '400ms',
    easeInOut: '500ms',
  },
  timing: {
    enter: 'cubic-bezier(0, 0, 0.2, 0.1)', // linearOutSlowIn
    leave: 'cubic-bezier(0.4, 0, 1, 1)', // fastOutLinearIn
    easeIn: 'cubic-bezier(0.55, 0, 0.55, 0.2)',
    easeOut: 'cubic-bezier(0.25, 0.8, 0.25, 1)',
    easeInOut: 'cubic-bezier(0.35, 0, 0.25, 1)',
    fastOutSlowIn: 'cubic-bezier(0.4, 0, 0.2, 1)',
    fastOutLinearIn: 'cubic-bezier(0.4, 0, 1, 1)',
    linearOutSlowIn: 'cubic-bezier(0, 0, 0.2, 0.1)',
  },
}

export const transitionMixin = (params: string | TransitionParams, ...props: string[]) => {
  let dur,
    timing,
    delay = '0ms'
  if (typeof params == 'string') {
    dur = params
    timing = params
  } else {
    dur = params.dur
    timing = params?.timing ?? params.dur
    if (params?.delay) delay = params.delay
  }
  const transValue = `${transition[dur] ?? dur} ${transition[timing] ?? timing} ${delay}`
  if (props?.length) {
    return css`
      transition: ${props.map((prop) => prop + ' ' + transValue).join(', ')};
    `
  }
  return css`
    transition: all ${transValue};
  `
}
