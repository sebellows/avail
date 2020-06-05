import { produce } from 'immer';
import { set, isPlainObject } from './core/utils';

interface UpdateProps {
  name: string;
  value: string | boolean;
  type?: string;
}

export function reducer<T>(state: T, action: Function | UpdateProps) {
  // Check if the type of action is a callback function
  if (typeof action == 'function') {
    return { ...state, ...action(state) };
  }

  // If the type of action parameter provided is an object, we update
  // the configuration schema object passed as `state`.
  if (isPlainObject(action) && action.name && action.value) {
    const { name, value } = action;

    /**
     * Convert `event.target.name` to a path array.
     *
     * NOTE: form controls should have a `name` attribute corresponding to their
     * configuration's absolute schema path!
     *
     * @example
     * name:  'settings_colorSchemes_fields_colors_items_0_name'
     * paths: `['settings', 'colorSchemes', 'fields', 'colors', 'items', '0', 'name]`
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
     *     <input name="settings_colorSchemes_fields_colors_items_0_name" />
     *   </div>
     *   <div class="repeater-item-group">
     *     <input name="settings_colorSchemes_fields_colors_items_0_value" />
     *   </div>
     * </div>
     */
    console.log('reducer', name, value, path[0]);
    if (path[0] === 'settings') {
      path = path.includes('items') ? path.slice(1, 7) : [...path.slice(1, 4), 'value'];
    }

    return produce(state, (draft) => {
      set(draft, path, value);
    });
  }
}
