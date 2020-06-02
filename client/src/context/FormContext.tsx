import { createContext } from 'react';
import { AvailSettings, AvailUtilities } from '../core/contracts';

export interface FormContextState {
  settings: AvailSettings;
  utilities: AvailUtilities;
  updateSettings: (prev: any, next?: any) => void;
  updateUtilities: (prev: any, next?: any) => void;
}

export const FormContext = createContext<FormContextState>(null);
