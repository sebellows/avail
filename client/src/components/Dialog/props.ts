import { CSSProperties, SyntheticEvent } from 'react';

export interface DialogProps {
  tag?: JSX.IntrinsicElements;
  className?: string;
  children?: any;
  focus?: boolean;
  title?: any;
  size?: string;
  tabIndex?: number;
  width?: string;
  onClose?: (event: SyntheticEvent) => void;
}

export interface DialogHeaderProps {
  className?: string;
  children?: any;
  focus?: boolean;
  onClose?: (event: SyntheticEvent) => void;
}
