import { ControlProps } from '../Control';

export interface SwitchProps extends ControlProps {
  alignLabel?: 'left' | 'right';
  on?: string | React.ReactNode;
  off?: string | React.ReactNode;
}
