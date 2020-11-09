import React, { forwardRef, Ref } from 'react'
import { ComponentProps } from '../../core/contracts'
import { Icon } from '../Icon/Icon'
import { classNames } from '../../core/utils'
import { Styled } from './styles'
import { useTheme } from '../../ThemeContext'

interface ColorpickerDialogProps extends ComponentProps {
  hue?: number
  lightness?: number
  alpha?: number
  open?: boolean
}

const ColorpickerDialog = forwardRef<HTMLDivElement, ColorpickerDialogProps>(
  ({ className, hue, lightness, alpha, open = false }, ref: Ref<HTMLDivElement>) => {
    const theme = useTheme()
    return (
      <Styled.Dialog.Wrapper
        ref={ref}
        className={classNames('colorpicker-dialog', className, { 'is-open': open })}
        style={{ width: '375px', height: '180px' }}
      >
        <Styled.Dialog.Inner className="colorpicker-dialog-inner">
          <Styled.Dialog.HueControl className="colorpicker-control colorpicker-hue-control">
            <Styled.Dialog.Slider className="colorpicker-control-slider">
              <canvas width="271" height="151"></canvas>
            </Styled.Dialog.Slider>

            <Styled.Dialog.Crosshair className="colorpicker-control-crosshair">
              <Icon name="crosshair" size="18" />
            </Styled.Dialog.Crosshair>

            <Styled.Dialog.Skein
              className="colorpicker-control-skein"
              theme={theme}
            ></Styled.Dialog.Skein>
          </Styled.Dialog.HueControl>

          <Styled.Dialog.LightnessControl className="colorpicker-control colorpicker-lightness-control">
            <Styled.Dialog.Slider className="colorpicker-control-slider">
              <canvas width="24" height="151"></canvas>
            </Styled.Dialog.Slider>

            <Styled.Dialog.SliderButton className="colorpicker-control-slide-button-container">
              <Styled.Dialog.SliderButtonInner className="colorpicker-control-slide-button"></Styled.Dialog.SliderButtonInner>
            </Styled.Dialog.SliderButton>

            <Styled.Dialog.Skein className="colorpicker-control-skein"></Styled.Dialog.Skein>
          </Styled.Dialog.LightnessControl>

          <Styled.Dialog.AlphaControl className="colorpicker-control colorpicker-alpha-control">
            <Styled.Dialog.Slider className="colorpicker-control-slider">
              <canvas width="24" height="151"></canvas>
            </Styled.Dialog.Slider>

            <Styled.Dialog.SliderButton className="colorpicker-control-slider-button">
              <Styled.Dialog.SliderButtonInner className="colorpicker-control-slider-button-inner"></Styled.Dialog.SliderButtonInner>
            </Styled.Dialog.SliderButton>

            <Styled.Dialog.Skein className="colorpicker-control-skein"></Styled.Dialog.Skein>
          </Styled.Dialog.AlphaControl>

          <Styled.Dialog.Close type="button" className="colorpicker-close">
            <Icon name="close" size="18" />
          </Styled.Dialog.Close>
        </Styled.Dialog.Inner>
      </Styled.Dialog.Wrapper>
    )
  },
)

ColorpickerDialog.displayName = 'ColorpickerDialog'

export { ColorpickerDialog }
