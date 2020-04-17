/**************************************************
 *
 * CONFIGURATION - AVAIL SETTINGS & MODULES
 *
 **************************************************/

export interface AvailUtility {
  id?: string;
  class?: string;
  description?: string;
  enabled?: boolean;
  property: string | string[];
  responsive: boolean;
  values?: Record<string, any> | string[];
  options?: AvailOption[];
}

export interface AvailUtilities {
  [key: string]: AvailUtility;
}

export interface AvailOption {
  name: string | number;
  value: any;
}
