/* eslint-disable @typescript-eslint/no-unused-vars */
import { COLORS, DIRECTIONS, GRAYS, GRID_BREAKPOINTS, THEME_COLORS } from './constants';
import { toOptions } from './models/Option';
import { CSS_VALUE_PRESETS } from './presets';
import { AvailSettings, AvailSetting } from './contracts';

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

export const Settings = (settings: AvailSettings): AvailSettings => {
  const colorSchemes = updateColorScheme(settings);
  const colors = toOptions(colorSchemes.colors);
  const grays = toOptions(colorSchemes.grays);
  const variants = toOptions(colorSchemes.variants);
  const allColors = [...colors, ...grays, ...variants];

  return {
    export: {
      legend: 'Export configuration',
      fields: {
        prefix: {
          type: 'text',
          id: 'settings_export_fields_prefix',
          label: 'Prefix',
          attrs: { placeholder: 'app-' },
          value: '',
          description: 'Prepend a custom prefix to all generated utility classes?',
        },
        sizingUnit: {
          type: 'radiogroup',
          id: 'settings_export_fields_sizingUnit',
          legend: 'Default sizing unit',
          options: toOptions(['px', 'em', 'rem']),
          value: 'rem',
          description: 'Converts all size values to specified unit.',
        },
        fileType: {
          type: 'radiogroup',
          id: 'settings_export_fields_fileType',
          legend: 'Exported file type',
          options: toOptions(['CSS', 'SCSS']),
          value: 'css',
          description: 'Select file type to export utility classes as.',
        },
      },
    },
    colorSchemes: {
      legend: 'Color Schemes',
      fields: {
        colors: {
          type: 'repeater',
          id: 'settings_colorSchemes_fields_colors',
          inputType: 'color',
          legend: 'Colors',
          items: colors,
        },
        grays: {
          type: 'repeater',
          id: 'settings_colorSchemes_fields_grays',
          inputType: 'color',
          legend: 'Grays',
          items: grays,
        },
        variants: {
          type: 'repeater',
          id: 'settings_colorSchemes_fields_variants',
          inputType: 'colorpicker',
          legend: 'Theme Variant Colors',
          options: [...colors, ...grays],
          items: variants,
        },
      },
    },
    global: {
      legend: 'Base/Body Settings',
      fields: {
        bodyColor: {
          type: 'colorpicker',
          id: 'settings_global_fields_bodyColor',
          label: 'Body color',
          value: THEME_COLORS.dark,
          options: allColors,
          description: 'Default body text color.',
        },
        bodyBgColor: {
          type: 'colorpicker',
          id: 'settings_global_fields_bodyBgColor',
          label: 'Body background color',
          value: COLORS.white,
          options: allColors,
          description: 'Default body background color.',
        },
        fontFamily: {
          type: 'text',
          id: 'settings_global_fields_fontFamily',
          label: 'Default font-family',
          value: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`,
          description: 'Default global font-family.',
        },
        headingsFontFamily: {
          type: 'text',
          id: 'settings_global_fields_headingsFontFamily',
          label: 'Headings font-family',
          value: 'inherit',
          description: 'By default inherits from global font-family.',
        },
        monospaceFontFamily: {
          type: 'text',
          id: 'settings_global_fields_monospaceFontFamily',
          label: 'Monospace font-family',
          value: `SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New",
          monospace`,
          description: 'Used on <pre>, <code>, and <kbd> tags.',
        },
        fontSize: {
          type: 'number',
          id: 'settings_global_fields_fontSize',
          label: 'Base font size',
          value: '16',
          description: 'Set in `px` (will be converted if default unit configured).',
        },
        lineHeight: {
          type: 'text',
          id: 'settings_global_fields_lineHeight',
          label: 'Default line-height',
          value: '1.5',
        },
        fontWeight: {
          type: 'select',
          id: 'settings_global_fields_fontWeight',
          label: 'Default font-weight',
          value: 'normal',
          options: toOptions(CSS_VALUE_PRESETS.fontWeight),
        },
        paragraphMargin: {
          type: 'number',
          id: 'settings_global_fields_paragraphMargin',
          label: 'Paragraph margin',
          value: '12',
          description:
            'Set in `px` (will be converted if default unit configured). NOTE: Applies to bottom margin only.',
        },
        headingsMargin: {
          type: 'number',
          id: 'settings_global_fields_headingsMargin',
          label: 'Headings margin',
          value: '12',
          description:
            'Set in `px` (will be converted if default unit configured). NOTE: Applies to bottom margin only.',
        },
      },
    },
    border: {
      legend: 'Border',
      fields: {
        width: {
          type: 'number',
          id: 'settings_border_fields_width',
          label: 'Border width',
          value: '1',
          description: 'Default border width applied to border-related utility classes.',
          validators: { min: 0 },
        },
        style: {
          type: 'select',
          id: 'settings_border_fields_style',
          label: 'Border style',
          value: 'solid',
          options: toOptions(CSS_VALUE_PRESETS.borderStyle),
          description: 'Default border width applied to border-related utility classes.',
        },
        color: {
          type: 'colorpicker',
          id: 'settings_border_fields_color',
          label: 'Border color',
          options: toOptions(allColors),
          value: GRAYS['gray-100'],
          description: 'Default border color applied to border-related utility classes.',
        },
      },
    },
    mediaQuery: {
      legend: 'Media-Query Breakpoints',
      fields: {
        breakpoints: {
          type: 'repeater',
          id: 'settings_mediaQuery_fields_breakpoints',
          inputType: 'number',
          items: toOptions(GRID_BREAKPOINTS),
          description: 'Used to generate responsive utility classes.',
          validators: { min: 0 },
        },
      },
    },
    spacing: {
      legend: 'Spacing class direction suffixes',
      fields: {
        suffixes: {
          type: 'repeater',
          id: 'settings_spacing_fields_suffixes',
          inputType: 'text',
          items: toOptions(DIRECTIONS),
          readOnly: true,
          description:
            'Used to generate spacing classes for all directions (e.g., `margin-top: 1rem;`).',
        },
      },
    },
  };
};

export function generateSettings(config: AvailSettings = {}): AvailSettings {
  const settings = Settings(config);

  return Object.entries(settings).reduce((acc, [key, value]) => {
    acc[key] = { id: `settings_${key}`, ...value } as AvailSetting;
    return acc;
  }, {});
}
