/* eslint-disable @typescript-eslint/no-unused-vars */
import { produce } from 'immer';
import { set, unset } from '../core/utils';
import { AvailSetting, AvailState, AvailUtility } from '../core/contracts';

/** Actions */

export function setConfig<T = AvailSetting>(state: AvailState<T>, { name, value }) {
  /**
   * Convert `event.target.name` to a path array.
   *
   * NOTE: form controls should have a `name` attribute corresponding to their
   * configuration's absolute schema path!
   *
   * @example
   * name:  'colorSchemes_fields_colors_items_0_name'
   * paths: `['colorSchemes', 'fields', 'colors', 'items', '0', 'name]`
   */
  const path = name.split('_');

  return produce(state, (draft) => {
    set(draft.config, path, value);
  });
}

export function addItem<T = AvailSetting>(state: AvailState<T>, { name, value }) {
  const path = name.split('_');

  return produce(state, (draft) => {
    set(draft.config, path, value);
  });
}

export function removeItem<T = AvailSetting>(state: AvailState<T>, { name }) {
  const path = name.split('_');

  return produce(state, (draft) => {
    unset(draft.config, path);
  });
}

export function setInProgress<T = AvailSetting | AvailUtility>(
  state: AvailState<T>,
  inProgress: boolean,
) {
  return produce(state, (draft) => {
    set(draft.config, 'inProgress', inProgress);
  });
}
