/* eslint-disable @typescript-eslint/no-unused-vars */
import { COLORS, DIRECTIONS, GRAYS, GRID_BREAKPOINTS, THEME_COLORS } from './constants';
import { toOptions } from './models/Option';
import { CSS_VALUE_PRESETS } from './presets';

const AVAIL_COLOR_SCHEMES = {
  colors: COLORS,
  grays: GRAYS,
  variants: THEME_COLORS,
};

function updateColorScheme(settings: Record<string, any>) {
  const schemes = ['colors', 'grays', 'variants'];
  for (const scheme of schemes) {
    if (!settings[scheme]) continue;
    AVAIL_COLOR_SCHEMES[scheme] = { ...AVAIL_COLOR_SCHEMES[scheme], ...settings[scheme] };
  }
  return AVAIL_COLOR_SCHEMES;
}

export const Settings = (settings: Record<string, any> = {}) => {
  const colorSchemes = updateColorScheme(settings);
  const colors = toOptions(colorSchemes.colors);
  const grays = toOptions(colorSchemes.grays);
  const variants = toOptions(colorSchemes.variants);
  const allColors = [...colors, ...grays, ...variants];

  return [
    {
      legend: 'Prefix',
      fields: [
        {
          type: 'text',
          id: 'avail-prefix',
          label: 'Prefix',
          value: '',
          description: 'Prepend a custom prefix to all generated utility classes?',
          classMap: {
            label: 'sr-only',
          },
        },
      ],
    },
    {
      legend: 'Exported file type',
      fields: [
        {
          type: 'radiogroup',
          id: 'avail-export-type',
          options: toOptions(['CSS', 'SCSS']),
          value: 'css',
          description: 'Select file type to export utility classes as.',
        },
      ],
    },
    {
      legend: 'Color Schemes',
      fields: [
        {
          type: 'repeater',
          id: 'avail-colors',
          inputType: 'color',
          legend: 'Colors',
          items: colors,
        },
        {
          type: 'repeater',
          id: 'avail-grays',
          inputType: 'color',
          legend: 'Grays',
          items: grays,
        },
        {
          type: 'repeater',
          id: 'avail-variants',
          inputType: 'colorpicker',
          legend: 'Theme Variant Colors',
          options: [...colors, ...grays],
          items: variants,
        },
      ],
    },
    {
      legend: 'Base/Body Settings',
      fields: [
        {
          type: 'colorpicker',
          id: 'avail-body-color',
          label: 'Body color',
          value: THEME_COLORS.dark,
          options: allColors,
          description: 'Default body text color.',
        },
        {
          type: 'colorpicker',
          id: 'avail-bg-colors',
          label: 'Body background color',
          value: COLORS.white,
          options: allColors,
          description: 'Default body background color.',
        },
        {
          type: 'text',
          id: 'avail-font-family',
          label: 'Default font-family',
          value: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`,
          description: 'Default global font-family.',
        },
        {
          type: 'text',
          id: 'avail-headings-font-family',
          label: 'Headings font-family',
          value: 'inherit',
          description: 'By default inherits from global font-family.',
        },
        {
          type: 'text',
          id: 'avail-monospace-font-family',
          label: 'Monospace font-family',
          value: `SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New",
          monospace`,
          description: 'Used on <pre>, <code>, and <kbd> tags.',
        },
        {
          type: 'radiogroup',
          id: 'avail-sizing-unit',
          legend: 'Default sizing unit',
          options: toOptions(['px', 'em', 'rem']),
          value: 'rem',
          description: 'Converts all size values to specified unit.',
        },
        {
          type: 'number',
          id: 'avail-font-size',
          label: 'Base font size',
          value: '16',
          description: 'Set in `px` (will be converted if default unit configured).',
        },
        {
          type: 'text',
          id: 'avail-line-height',
          label: 'Default line-height',
          value: '1.5',
        },
        {
          type: 'select',
          id: 'avail-font-weight',
          label: 'Default font-weight',
          value: 'normal',
          options: toOptions(CSS_VALUE_PRESETS.fontWeight),
        },
        {
          type: 'number',
          id: 'avail-paragraph-margin',
          label: 'Paragraph margin',
          value: '12',
          description:
            'Set in `px` (will be converted if default unit configured). NOTE: Applies to bottom margin only.',
        },
        {
          type: 'number',
          id: 'avail-headings-margin',
          label: 'Headings margin',
          value: '12',
          description:
            'Set in `px` (will be converted if default unit configured). NOTE: Applies to bottom margin only.',
        },
      ],
    },
    {
      legend: 'Border',
      fields: [
        {
          type: 'number',
          id: 'avail-border-width',
          label: 'Border width',
          value: '1',
          description: 'Default border width applied to border-related utility classes.',
          validators: { min: 0 },
        },
        {
          type: 'select',
          id: 'avail-border-style',
          label: 'Border style',
          value: 'solid',
          options: toOptions(CSS_VALUE_PRESETS.borderStyle),
          description: 'Default border width applied to border-related utility classes.',
        },
        {
          type: 'colorpicker',
          id: 'avail-border-color',
          label: 'Border color',
          options: toOptions(allColors),
          value: GRAYS['gray-100'],
          description: 'Default border color applied to border-related utility classes.',
        },
      ],
    },
    {
      legend: 'Media-Query Breakpoints',
      fields: [
        {
          type: 'repeater',
          id: 'avail-breakpoints',
          inputType: 'number',
          items: toOptions(GRID_BREAKPOINTS),
          description: 'Used to generate responsive utility classes.',
          validators: { min: 0 },
        },
      ],
    },
    {
      legend: 'Spacing class direction suffixes',
      fields: [
        {
          type: 'repeater',
          id: 'avail-spacing-suffixes',
          inputType: 'number',
          items: toOptions(DIRECTIONS),
          readonly: true,
          description:
            'Used to generate spacing classes for all directions (e.g., `margin-top: 1rem;`).',
        },
      ],
    },
  ];
};

export function generateSettings(config: Record<string, any> = {}) {
  return Settings(config);
}
