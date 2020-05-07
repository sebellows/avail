import * as CONST from './constants';
import { capitalize, hyphenate } from './utils/common';
import { AvailOption, AvailUtility, AvailUtilities } from './contracts/avail';

const { BORDER_STYLES, COLORS, DIRECTIONS, GRAYS, GRID_BREAKPOINTS, SPACERS, THEME_COLORS } = CONST;

export const toOptions = (collection: Record<string, any> | string[]): AvailOption[] => {
  if (Array.isArray(collection)) {
    return collection.map((item) => {
      if (CONST[item]) {
        return { name: hyphenate(item), value: CONST[item] };
      }
      return { name: hyphenate(item), value: hyphenate(item) };
    });
  }
  return Object.entries(collection).reduce((arr: AvailOption[], [name, value]) => {
    arr.push({ name: hyphenate(name), value: hyphenate(value) });
    return arr;
  }, []);
};

// export const getColor = (color: string, colors: Collection) => {
//   if (Array.isArray(colors)) {
//     return (
//       (colors as CollectionArray).find(
//         (item: CollectionObj) => item.name === color,
//       ).value || color
//     );
//   }
//   return colors[color];
// };

export const paletteOptions = [...toOptions(GRAYS), ...toOptions(COLORS)];

export const generateSettings = () => {
  const prefix = {
    type: 'text',
    value: '',
    required: true,
    placeholder: 'i.e., app-',
  };
  const reboot = {
    type: 'checkbox',
    value: 'reboot',
    label: "Include Bootstrap's Reboot?",
    checked: true,
  };
  const breakpoints = {
    type: 'text',
    group: toOptions(GRID_BREAKPOINTS),
  };
  const colors = {
    type: 'color',
    group: toOptions(COLORS),
  };
  const grays = {
    type: 'color',
    group: toOptions(GRAYS),
  };
  // variantOptions = paletteOptions;
  const variants = {
    type: 'select',
    options: paletteOptions,
    group: toOptions(THEME_COLORS),
  };
  const body = {
    type: 'select',
    options: paletteOptions,
    group: toOptions(['BODY_BG', 'BODY_COLOR']),
  };
  const spacing = {
    type: 'text',
    group: toOptions(SPACERS),
    description: `Units used for generating <em>spacing</em> classes (e.g., margins and padding).`,
  };
  const border = {
    type: 'fieldset',
    fields: {
      borderWidth: {
        type: 'text',
        value: CONST.BORDER_WIDTH,
        label: 'Border Width:',
      },
      borderStyle: {
        type: 'select',
        value: 'solid',
        label: 'Border Style:',
        options: toOptions(BORDER_STYLES),
      },
      borderColor: {
        type: 'select',
        value: CONST.BORDER_COLOR,
        label: 'Border Color:',
        options: paletteOptions,
      },
    },
  };
  const directions = {
    type: 'text',
    value: Object.values(border.fields)
      .map(({ value }) => value)
      .join(' '),
    group: toOptions(DIRECTIONS),
    description: `Name directions/sides for appending as suffixes to utily classes that effect them (i.e., margins and padding).`,
  };
  // const negativeMarginPrefix = { type: 'text', value: 'n', placeholder: 'i.e., ml-n3' };

  return {
    prefix,
    reboot,
    breakpoints,
    directions,
    colors,
    grays,
    variants,
    border,
    body,
    spacing,
  };
};

function createTitle(str: string) {
  return hyphenate(str)
    .split('-')
    .map((word) => capitalize(word))
    .join(' ');
}

function createModel(key: string, util: AvailUtility, config: Record<string, any> = {}) {
  return {
    id: key,
    title: createTitle(key),
    description: config.desc || null,
    property: util.property,
    class: util.class || util.property,
    enabled: util.enabled || true,
    options: toOptions(util.values),
    responsive: util.responsive,
  };
}

export function generateForm(utils: AvailUtilities) {
  return Object.entries(utils).reduce((form, [key, value]) => {
    form[key] = createModel(key, value);
    return form;
  }, {});
}
