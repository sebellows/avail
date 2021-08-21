/**
 * @type Throttled
 * The ReturnType of the `throttle` function is the throttled function to call
 * and a `cancel` function to stop the throttled function from executing.
 */
type Throttled = {
  (...args: any[]): void
  cancel(): void
}

/**
 * @function throttle
 * @description
 * A throttle function implementing requestAnimationFrame that only invokes the
 * passed callback at most once per animation frame on a browser (or per 1000/60 ms).
 */
export const throttle = (cb: (e: unknown) => void): Throttled => {
  let requestId = null
  let lastArgs: any

  const later = (context: Throttled) => () => {
    requestId = null
    cb.apply(context, lastArgs)
  }

  const throttled = function (this: Throttled, ...args: any[]) {
    lastArgs = args

    if (requestId === null) {
      requestId = requestAnimationFrame(later(this))
    }
  }

  throttled.cancel = () => {
    cancelAnimationFrame(requestId)
    requestId = null
  }

  return throttled
}
