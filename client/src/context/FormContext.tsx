import { createContext } from 'react';

export interface FormContextState {
  dispatchSettings: (prev: any, next?: any) => void;
  dispatchUtilities: (prev: any, next?: any) => void;
}

export const FormContext = createContext<FormContextState>(null);
