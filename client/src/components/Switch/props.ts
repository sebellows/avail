import { FormControlProps } from '../../core/contracts';

export interface SwitchProps extends FormControlProps {
  alignLabel?: 'left' | 'right';
  on?: string | React.ReactNode;
  off?: string | React.ReactNode;
}
