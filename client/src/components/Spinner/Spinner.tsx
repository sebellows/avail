import React, { AnimationEvent, forwardRef } from 'react'
import { classNames } from '../../core/utils/classNames'
import { useTheme } from '../../ThemeContext'
import { Styled } from './styles'

interface SpinnerProps extends Avail.ComponentProps {
  className?: string
  exit?: boolean
  onAnimationEnd?: (event: AnimationEvent) => void
}

const Spinner: Avail.RefForwardingComponent<'div', SpinnerProps> = forwardRef(
  ({ as: Component = 'div', className, exit = false, onAnimationEnd = null }, ref) => {
    const { theme } = useTheme()
    function handleAnimationEnd(event: AnimationEvent) {
      if (onAnimationEnd) {
        onAnimationEnd(event)
      }
    }

    return (
      <Styled.Wrapper
        as={Component}
        ref={ref}
        theme={theme}
        className={classNames('spinner', className, exit && 'spinner-out')}
        onAnimationEnd={handleAnimationEnd}
      >
        <Styled.Container className="spinner-container">
          <Styled.Layer className="spinner-layer">
            <Styled.Mask className="spinner-circle-mask left">
              <Styled.LeftMaskCircle className="spinner-circle" />
            </Styled.Mask>
            <Styled.Gap className="spinner-circle-gap">
              <Styled.GapCircle className="spinner-circle" />
            </Styled.Gap>
            <Styled.Mask className="spinner-circle-mask right">
              <Styled.RightMaskCircle className="spinner-circle" />
            </Styled.Mask>
          </Styled.Layer>
        </Styled.Container>
      </Styled.Wrapper>
    )
  },
)

Spinner.displayName = 'Spinner'

export { Spinner }
