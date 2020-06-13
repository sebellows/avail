/* eslint-disable @typescript-eslint/no-unused-vars */
import { INDENT_AMOUNT, INDENT_LEVEL } from './constants';
import { range } from './utils/range';
// import { AvailUtilities } from './contracts/avail';
import { AvailConfig, AvailSetting, OptionProps, AvailUtility } from './contracts';
// import { isPlainObject } from './utils/common';
import { toEM } from './style';
import { get } from './utils';

function indentBy(level: number): string {
  const tab = '  ';
  return level > INDENT_LEVEL ? tab.repeat(level) : '';
}

/**
 * Generate a utility class name from configuration settings.
 * TODO: Allow custom separator instead of defaulting to hyphen.
 */
function generateClassName(strs: string[], sep = '-') {
  return strs
    .filter((str: string) => str != null && str.length > 0)
    .map((str: string) => (str.startsWith('-') ? str.slice(1) : str))
    .join(sep);
}

/**
 * Generate a CSS declaration block.
 * TODO: Handle formatting with PostCSS instead of manually indenting.
 */
function generateDeclarationBlock(
  option: OptionProps,
  properties: string | string[],
  indentLevel: number,
  isImportant = true,
) {
  properties = Array.isArray(properties) ? properties : [properties];

  const { name, value } = option;
  // If there is more than one propery, break onto new lines and indent accordingly.
  // Otherwise, keep on same line and add a space AFTER the OPENING bracket.
  // const indent = properties.length > 1 ? indentBy(indentLevel) : ' ';
  // Calculate the indentation for multi-line and nested blocks.
  // const _indentBy = properties.length > 1 && indentLevel > INDENT_LEVEL ? indentLevel / 2 : indentLevel;
  // If `indentAmt` is the default, we set like a top-level line w/ no ident.
  const blockIndent = indentBy(indentLevel);
  const openingWhitespace = properties.length > 1 ? `\n${indentBy(indentLevel + 1)}` : ' ';

  // See `settings.export.fields.isImportant`
  const important = isImportant ? ' !important' : '';

  const innerBlock = properties.reduce((css: string, prop: string, i: number) => {
    // If there is more than one propery, add a linebreak at the end.
    // Otherwise, keep on same line and add a space BEFORE the CLOSING bracket.
    // const nl = properties.length > 1 && i > 0 ? '\n' : ' ';
    const closingWhitespace = properties.length > 1 && i > 0 ? '\n' : ' ';

    return (css += `${openingWhitespace}${prop}: ${value}${important};${closingWhitespace}`);
  }, '');

  return `${blockIndent}.${name} {${innerBlock}}\n`;
}

const defaultFormattingOptions = {
  indentLevel: INDENT_LEVEL,
  infix: '',
  isImportant: true,
};

/**
 * If a utility is configured to set direction-based modifiers (i.e., `margin-left`, etc.)
 * generate declaration blocks for those properties.
 */
function generateDirectionModifiers(
  directions: OptionProps[],
  utility: AvailUtility,
  options = {},
): string {
  const { indentLevel, infix, isImportant } = { ...defaultFormattingOptions, ...options };
  let { class: className, items, property } = utility;

  const itemsCSS = [];

  directions.forEach((option) => {
    const { name: dirName, value: dirValue } = option;
    const subprops = (dirValue as string).split(' ').map((dir: string) => `${property}-${dir}`);

    items.forEach(({ name, value }) => {
      const classParts = [className || property, dirName, infix, name] as string[];
      const dirItem = { name: generateClassName(classParts), value };
      itemsCSS.push(generateDeclarationBlock(dirItem, subprops, indentLevel, isImportant));
    });
  });

  return itemsCSS.reduce((css, itemCSS) => (css += itemCSS), '');
}

/**
 * If a utility is configured to set color variant-based modifiers (i.e., `border-primary`, etc.)
 * generate declaration blocks for those properties.
 */
function generateVariantModifiers(
  variants: OptionProps[],
  utility: AvailUtility,
  options: Record<string, any> = {},
): string {
  let { class: className, property } = utility;
  const { indentLevel, infix, isImportant, directions } = {
    directions: null,
    ...defaultFormattingOptions,
    ...options,
  };

  const itemsCSS = [];

  variants.forEach(({ name, value }) => {
    let subprops = [`${property}`];
    const classParts = [className || property, infix, name] as string[];

    itemsCSS.push(
      generateDeclarationBlock(
        { name: generateClassName(classParts), value },
        subprops,
        indentLevel,
        isImportant,
      ),
    );

    // TODO: this is probably only used for `border-color`. Possibly refactor?
    if (directions) {
      directions.forEach((dir) => {
        const { name: dirName, value: dirValue } = dir;
        const dirValues = (dirValue as string).split(' ');

        subprops = dirValues.map((dirValue: string) => `${property}-${dirValue}-color`);

        // Destructure current classParts to append the direction name.
        const [first, ...rest] = classParts;
        const variantItem = { name: generateClassName([first, dirName, ...rest]), value };
        itemsCSS.push(generateDeclarationBlock(variantItem, subprops, indentLevel, isImportant));
      });
    }
  });

  return itemsCSS.reduce((css, itemCSS) => (css += itemCSS), '');
}

/**
 * Generates utility classes as formatted string.
 */
export function generateUtility(
  settings: AvailConfig<AvailSetting>,
  utility: AvailUtility,
  indentLevel = INDENT_LEVEL,
  infix = '',
): string {
  let { class: className, items, property, subproperties } = utility;
  const isImportant = get(settings, 'export.fields.isImportant.checked', []);

  if (items == null || property == null) return '';

  let subpropertyStyles = '';
  if (subproperties) {
    const { directions: hasDirections, variants: hasVariants } = subproperties;

    if (hasDirections) {
      const directions = get(settings, 'nameGeneration.fields.directions.items', []);
      subpropertyStyles += generateDirectionModifiers(directions, utility, {
        indentLevel,
        infix,
        isImportant,
      });
    }
    if (hasVariants) {
      const variants = get(settings, 'colorSchemes.fields.variants.items', []);
      subpropertyStyles += generateVariantModifiers(variants, utility, {
        indentLevel,
        infix,
        isImportant,
        directions: hasDirections
          ? get(settings, 'nameGeneration.fields.directions.items', [])
          : null,
      });
    }
  }

  let utilityCSS = items.reduce((css, { name, value }, i) => {
    // Piece together the class name
    const _name = generateClassName([className || property || '', infix, name as string]);

    return (css +=
      value != null
        ? generateDeclarationBlock({ name: _name, value }, property, indentLevel, isImportant)
        : '');
  }, '');
  return (utilityCSS += subpropertyStyles);
}

// Loop over each breakpoint
export function generateResponsiveUtility(
  settings: AvailConfig<AvailSetting>,
  utility: AvailUtility,
): string {
  const breakpoints = get(settings, 'mediaQuery.fields.breakpoints.items');
  return breakpoints.reduce((css: string, { name, value }) => {
    if (value === '0') {
      return (css += `${generateUtility(settings, utility)}\n`);
    }

    return (css += `@media (min-width: ${toEM(value)}) {\n${generateUtility(
      settings,
      utility,
      1,
      name,
    )}}\n`);
  }, '');
}

export function generateUtilities(
  settings: AvailConfig<AvailSetting>,
  utilities: AvailConfig<AvailUtility>,
): string {
  return Object.values(utilities).reduce((css: string, utility) => {
    if (utility.responsive) {
      return (css += generateResponsiveUtility(settings, utility));
    }
    return (css += generateUtility(settings, utility));
  }, '');
}
