import { ComponentProps } from '../../core/contracts';

export interface ButtonProps extends ComponentProps {
  size?: string;
  type?: 'button' | 'submit';
  variant?: string;
  [key: string]: any;
}
