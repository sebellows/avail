import { easeIn } from '../beziers'

describe('easeIn', () => {
  it('should return easeInBack cubic-bezier', () => {
    expect({
      'transition-timing-function': easeIn('back'),
    }).toEqual({
      'transition-timing-function': 'cubic-bezier(0.36, 0, 0.66, -0.56)',
    })
  })

  it('should return easeInCirc cubic-bezier', () => {
    expect({
      'transition-timing-function': easeIn('circ'),
    }).toEqual({
      'transition-timing-function': 'cubic-bezier(0.55, 0, 1, 0.45)',
    })
  })

  it('should return easeInCubic cubic-bezier', () => {
    expect({
      'transition-timing-function': easeIn('cubic'),
    }).toEqual({
      'transition-timing-function': 'cubic-bezier(0.32, 0, 0.67, 0)',
    })
  })

  it('should return easeInExpo cubic-bezier', () => {
    expect({
      'transition-timing-function': easeIn('expo'),
    }).toEqual({
      'transition-timing-function': 'cubic-bezier(0.7, 0, 0.84, 0)',
    })
  })

  it('should return easeInQuad cubic-bezier', () => {
    expect({
      'transition-timing-function': easeIn('quad'),
    }).toEqual({
      'transition-timing-function': 'cubic-bezier(0.11, 0, 0.5, 0)',
    })
  })

  it('should return easeInQuart cubic-bezier', () => {
    expect({
      'transition-timing-function': easeIn('quart'),
    }).toEqual({
      'transition-timing-function': 'cubic-bezier(0.5, 0, 0.75, 0)',
    })
  })

  it('should return easeInQuint cubic-bezier', () => {
    expect({
      'transition-timing-function': easeIn('quint'),
    }).toEqual({
      'transition-timing-function': 'cubic-bezier(0.64, 0, 0.78, 0)',
    })
  })

  it('should return easeInSine cubic-bezier', () => {
    expect({
      'transition-timing-function': easeIn('sine'),
    }).toEqual({
      'transition-timing-function': 'cubic-bezier(0.12, 0, 0.39, 0)',
    })
  })
})
