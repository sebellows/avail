import { GRID_BREAKPOINTS, INDENT_AMOUNT } from './constants';
import { range } from './utils/range';
// import { AvailUtilities } from './contracts/avail';
import { AvailConfig, AvailSetting, OptionProps, AvailUtility } from './contracts';
import { isPlainObject } from './utils/common';
import { toEM } from './style';
import { get } from './utils';

export function generateUtilities(
  settings: AvailConfig<AvailSetting>,
  utilities: AvailConfig<AvailUtility>,
  indentAmt = INDENT_AMOUNT,
): string {
  return Object.entries(utilities).reduce((css: string, [key, utility]) => {
    if (utility.responsive) {
      return (css += generateResponsiveUtility(settings, utility, indentAmt));
    }
    return (css += generateUtility(settings, utility, indentAmt));
  }, '');
}

// Loop over each breakpoint
export function generateResponsiveUtility(
  settings: AvailConfig<AvailSetting>,
  utility: AvailUtility,
  indentAmt = INDENT_AMOUNT,
): string {
  return Object.entries(GRID_BREAKPOINTS).reduce((css: string, [breakpoint, screenSize]) => {
    const bpSize = (isPlainObject(screenSize)
      ? (screenSize as { value: number; readOnly: boolean }).value
      : screenSize) as number;

    const infix = bpSize === 0 ? '' : `-${breakpoint}`;
    const mqOpen = bpSize !== 0 ? `@media (min-width: ${toEM(bpSize)}) {\n` : '';
    const mqClose = bpSize !== 0 ? `}\n\n` : '\n';
    const _indentAmt = bpSize === 0 ? indentAmt : indentAmt * 2;

    return (css += `${mqOpen}${generateUtility(settings, utility, _indentAmt, infix)}${mqClose}`);
  }, '');
}

function getIndentAmount(indent: number): string {
  return range(indent).reduce((str: string, curr: number) => (str += ' '), '');
}

/**
 * Generates interior declararion block of a CSS selector.
 */
export function generateDeclaration(
  properties: string[],
  value: string,
  indentAmt: number,
): string {
  return properties.reduce((css: string, prop: string, i: number) => {
    const indent = properties.length > 1 ? `\n${getIndentAmount(indentAmt)}` : ' ';
    const nl = properties.length > 1 && i > 0 ? '\n' : ' ';

    return (css += `${indent}${prop}: ${value} !important;${nl}`);
  }, '');
}

/**
 * Generates utility classes as formatted string.
 */
// export function generateUtility(
//   utility: CollectionObj,
//   indentAmt = INDENT_AMOUNT,
//   infix = '',
// ): string {
//   let { class: className, property: properties } = utility;
//   let values = utility.values || utility.items;

//   if (values == null || properties == null) return '';

//   const indentBy = properties.length > 1 && indentAmt > INDENT_AMOUNT ? indentAmt / 2 : indentAmt;
//   const openingSelectorIndent = indentAmt === INDENT_AMOUNT ? '' : getIndentAmount(indentBy);

//   // If the values are an array or string, convert it into a object
//   if (Array.isArray(values)) {
//     values = values.reduce((o, val) => {
//       if (isPlainObject(val)) {
//         // Comes from `items`
//         o[val.name] = val.value;
//       } else {
//         // Comes from original `utilities` values
//         o[val] = val;
//       }
//       return o;
//     }, {});
//   }

//   const entries = Object.entries(values);

//   return entries.reduce((css, [key, value], i) => {
//     // Multiple properties are possible, for example with vertical
//     // or horizontal margins or paddings.
//     if (typeof properties === 'string') {
//       properties = properties.split(' ');
//     }

//     // Use custom class if present
//     const propertyClass = className || properties[0] || '';
//     infix = propertyClass === '' && infix.startsWith('-') ? infix.slice(1) : infix;
//     const modifier = propertyClass.length && key !== '' ? `-${key}` : '';
//     const closingSelectorIndent = properties.length > 1 ? openingSelectorIndent : '';

//     return (css +=
//       value != null
//         ? `${openingSelectorIndent}.${propertyClass}${infix}${modifier} {${generateDeclaration(
//             properties,
//             value as string,
//             indentAmt,
//           )}${closingSelectorIndent}}\n`
//         : '');
//   }, '');
// }

/**
 * Generate a utility class name from configuration settings.
 * TODO: Allow custom separator instead of defaulting to hyphen.
 */
function generateClassName(strs: string[], sep = '-') {
  return strs
    .map((str: string) => (str.startsWith('-') ? str.slice(1) : str))
    .filter((str: string) => str.length > 0)
    .join(sep);
}

/**
 * Generate a CSS declaration block.
 * TODO: Handle formatting with PostCSS instead of manually indenting.
 */
function generateDeclarationBlock(option: OptionProps, properties: string[], indentAmt: number) {
  const { name, value } = option;
  const indentBy = properties.length > 1 && indentAmt > INDENT_AMOUNT ? indentAmt / 2 : indentAmt;
  const openingSelectorIndent = indentAmt === INDENT_AMOUNT ? '' : getIndentAmount(indentBy);
  const closingSelectorIndent = properties ? openingSelectorIndent : '';

  const innerBlock = properties.reduce((css: string, prop: string, i: number) => {
    const indent = properties.length > 1 ? `\n${getIndentAmount(indentAmt)}` : ' ';
    const nl = properties.length > 1 && i > 0 ? '\n' : ' ';

    return (css += `${indent}${prop}: ${value} !important;${nl}`);
  }, '');

  return `${openingSelectorIndent}.${name} {${innerBlock}${closingSelectorIndent}}\n`;
}

/**
 * If a utility is configured to set direction-based modifiers (i.e., `margin-left`, etc.)
 * generate declaration blocks for those properties.
 */
function generateDirectionModifiers(
  directions: OptionProps[],
  utility: AvailUtility,
  indentAmt = INDENT_AMOUNT,
  infix = '',
): string {
  let { class: className, items, property } = utility;

  const itemsCSS = [];

  directions.forEach((option) => {
    const { name: dirName, value: dirValue } = option;
    const subprops = (dirValue as string).split(' ').map((dir: string) => `${property}-${dir}`);

    items.forEach(({ name, value }) => {
      const classParts = [className || property, dirName, infix, name] as string[];
      const dirItem = { name: generateClassName(classParts), value };
      itemsCSS.push(generateDeclarationBlock(dirItem, subprops, indentAmt));
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
  options = {},
): string {
  let { class: className, property } = utility;
  const { indentAmt, infix, directions } = {
    ...{
      indentAmt: INDENT_AMOUNT,
      infix: '',
      directions: null,
    },
    ...options,
  };

  const itemsCSS = [];

  variants.forEach(({ name, value }) => {
    let subprops = [`${property}`];
    const classParts = [className || property, infix, name] as string[];

    itemsCSS.push(
      generateDeclarationBlock({ name: generateClassName(classParts), value }, subprops, indentAmt),
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
        itemsCSS.push(generateDeclarationBlock(variantItem, subprops, indentAmt));
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
  indentAmt = INDENT_AMOUNT,
  infix = '',
): string {
  let { class: className, items, property, subproperties } = utility;

  if (items == null || property == null) return '';

  // TODO: This should no longer be true
  // Multiple properties are possible, for example with vertical
  // or horizontal margins or paddings.
  let properties = property.split(' ');

  // Use custom class if present
  const classPaths = [className || properties[0] || '', infix];

  let subpropertyStyles = '';
  if (subproperties) {
    const { directions: hasDirections, variants: hasVariants } = subproperties;

    if (hasDirections) {
      const directions = get(settings, 'nameGeneration.fields.directions.items', []);
      subpropertyStyles += generateDirectionModifiers(directions, utility, indentAmt, infix);
    }
    if (hasVariants) {
      const variants = get(settings, 'colorSchemes.fields.variants.items', []);
      subpropertyStyles += generateVariantModifiers(variants, utility, {
        indentAmt,
        infix,
        directions: hasDirections
          ? get(settings, 'nameGeneration.fields.directions.items', [])
          : null,
      });
    }
  }

  let utilityCSS = items.reduce((css, { name, value }, i) => {
    classPaths.push(`${name}`);
    const _name = generateClassName(classPaths);

    return (css +=
      value != null ? generateDeclarationBlock({ name: _name, value }, properties, indentAmt) : '');
  }, '');
  return (utilityCSS += subpropertyStyles);
}
