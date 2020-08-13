import React, { forwardRef, Ref } from 'react';
import { ComponentProps } from '../../core/contracts';
import { Icon } from '../Icon';
import { classNames } from '../../core/utils';

interface ColorpickerDialogProps extends ComponentProps {
  hue?: number;
  lightness?: number;
  alpha?: number;
  open?: boolean;
}

const ColorpickerDialog = forwardRef<HTMLDivElement, ColorpickerDialogProps>(
  ({ className, hue, lightness, alpha, open = false }, ref: Ref<HTMLDivElement>) => {
    return (
      <div
        ref={ref}
        className={classNames('colorpicker-dialog', className, { 'is-open': open })}
        style={{ width: '375px', height: '180px' }}
      >
        <div className="colorpicker-dialog-inner">
          <div className="colorpicker-control colorpicker-hue-control">
            <div className="colorpicker-control-slider">
              <canvas width="271" height="151"></canvas>
            </div>
            <div className="colorpicker-control-crosshair">
              <Icon name="crosshair" size="18" />
            </div>
            <div className="colorpicker-control-skein"></div>
          </div>
          <div className="colorpicker-control colorpicker-lightness-control">
            <div className="colorpicker-control-slider">
              <canvas width="24" height="151"></canvas>
            </div>
            <div className="colorpicker-control-slide-button-container">
              <div className="colorpicker-control-slide-button"></div>
            </div>
            <div className="colorpicker-control-skein"></div>
          </div>
          <div className="colorpicker-control colorpicker-alpha-control">
            <div className="colorpicker-control-slider">
              <canvas width="24" height="151"></canvas>
            </div>
            <div className="colorpicker-control-slider-button">
              <div className="colorpicker-control-slider-button-inner"></div>
            </div>
            <div className="colorpicker-control-skein"></div>
          </div>
          <button type="button" className="colorpicker-close">
            <Icon name="close" size="18" />
          </button>
        </div>
      </div>
    );
  },
);

ColorpickerDialog.displayName = 'ColorpickerDialog';

export { ColorpickerDialog };
