import { ComponentProps } from '../../core/contracts';

export interface ButtonProps extends ComponentProps {
  fab?: boolean;
  icon?: boolean;
  size?: string;
  type?: 'button' | 'submit';
  variant?: string;
  [key: string]: any;
}
