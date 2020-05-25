import { ComponentProps } from '../../core/contracts';

export interface PillTabModel {
  id?: string;
  [key: string]: any;
}

export interface PillTabProps extends ComponentProps {
  selected?: boolean;
  checked?: boolean;
  error?: Record<string, any>;
  value: any;
  onSelect?: (event: any) => void;
}

export interface PillTabsProps extends ComponentProps {}
