import { ComponentProps } from '../../core/contracts';

interface ClassMap {
  control?: string;
  description?: string;
  label?: string;
  legend?: string;
}

export interface RepeaterProps extends ComponentProps {
  classMap?: ClassMap;
  description?: string;
  errors?: Record<string, any>; // TODO: replace with FieldError map?
  id?: string;
  keyLabel?: string;
  valueLabel?: string;
  legend?: string;
  presets?: string[] | Record<string, any>;
  onAdd?: (event: any) => void;
  onChange?: (...args: any[]) => void;
  onRemove?: (event: any) => void;
  after?: any; // TODO: currently unused
  before?: any; // TODO: currently unused
  [key: string]: any;
}
