import { ComponentProps } from '../../core/contracts';

export interface ButtonProps extends ComponentProps {
  size?: string;
  variant?: string;
  [key: string]: any;
}
