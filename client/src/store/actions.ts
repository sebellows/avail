/* eslint-disable @typescript-eslint/no-unused-vars */
import { produce } from 'immer';
import { set, unset, typeOf, get } from '../core/utils';
import { AvailSetting, AvailState, AvailUtility } from '../core/contracts';

/** Actions */

export function setConfig<T = AvailSetting>(state: AvailState<T>, { name, value }) {
  // If the type of action parameter provided is an object, we update
  // the configuration schema object passed as `state`.
  if (name && value) {
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
    let path = name.split('_');

    /**
     * `repeater` fields (configured with an `items` property) do not have a `value` key.
     * Instead, `value` is a path in the `name` of the second input in a repeating key/value
     * input group. See example below (markup is not accurate).
     *
     * @example
     * <div class="repeater-item">
     *   <div class="repeater-item-group">
     *     <input name="colorSchemes_fields_colors_items_0_name" />
     *   </div>
     *   <div class="repeater-item-group">
     *     <input name="colorSchemes_fields_colors_items_0_value" />
     *   </div>
     * </div>
     */
    console.log('reducer', name, value, path);
    // if (path[0] === 'settings') {
    //   path = path.includes('items') ? path.slice(1, 7) : [...path.slice(1, 4), 'value'];
    // }

    return produce(state, (draft) => {
      set(draft.config, path, value);
    });
  }
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
