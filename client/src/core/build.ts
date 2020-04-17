import {
  // BLACK,
  // BODY_BG,
  // BODY_COLOR,
  // BORDER_COLOR,
  // BORDER_WIDTH,
  // BORDER_RADIUS,
  // BORDER_RADIUS_SM,
  // BORDER_RADIUS_LG,
  // BOX_SHADOW,
  // BOX_SHADOW_SM,
  // BOX_SHADOW_LG,
  // FONT_FAMILY_MONOSPACE,
  // FONT_WEIGHT_BOLD,
  // FONT_WEIGHT_BOLDER,
  // FONT_WEIGHT_LIGHT,
  // FONT_WEIGHT_LIGHTER,
  // FONT_WEIGHT_NORMAL,
  GRID_BREAKPOINTS,
  // LINE_HEIGHT_BASE,
  // LINE_HEIGHT_SM,
  // LINE_HEIGHT_LG,
  // NEGATIVE_SPACERS,
  // ROUNDED_PILL,
  // SPACERS,
  // TEXT_MUTED,
  // THEME_COLORS,
  // WHITE,
  INDENT_AMOUNT,
} from './constants';
import { range } from './utils/range';
// import { AvailUtilities } from './contracts/avail';
import { CollectionObj } from './contracts';
import { isPlainObject } from './utils/common';

export function generateUtilities(
  utilities: CollectionObj,
  indentAmt = INDENT_AMOUNT,
): string {
  return Object.entries(utilities).reduce((css: string, [key, utility]) => {
    if (utility.responsive) {
      return (css += generateResponsiveUtility(utility, indentAmt));
    }
    return (css += generateUtility(utility, indentAmt));
  }, '');
}

// Loop over each breakpoint
export function generateResponsiveUtility(
  utility: CollectionObj,
  indentAmt = INDENT_AMOUNT,
): string {
  return Object.entries(GRID_BREAKPOINTS).reduce(
    (css: string, [breakpoint, screenSize]) => {
      const infix = screenSize === '0' ? '' : `-${breakpoint}`;
      const mqOpen =
        screenSize !== '0' ? `@media (min-width: ${screenSize}) {\n` : '';
      const mqClose = screenSize !== '0' ? `}\n\n` : '\n';
      const _indentAmt = screenSize === '0' ? indentAmt : indentAmt * 2;

      return (css += `${mqOpen}${generateUtility(
        utility,
        _indentAmt,
        infix,
      )}${mqClose}`);
    },
    '',
  );
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
    const indent =
      properties.length > 1 ? `\n${getIndentAmount(indentAmt)}` : ' ';
    const nl = properties.length > 1 && i > 0 ? '\n' : ' ';
    return (css += `${indent}${prop}: ${value} !important;${nl}`);
  }, '');
}

/**
 * Generates utility classes as formatted string.
 */
export function generateUtility(
  utility: CollectionObj,
  indentAmt = INDENT_AMOUNT,
  infix = '',
): string {
  let { class: className, property: properties } = utility;
  let values = utility.values || utility.options;

  if (values == null || properties == null) return '';

  const indentBy =
    properties.length > 1 && indentAmt > INDENT_AMOUNT
      ? indentAmt / 2
      : indentAmt;
  const openingSelectorIndent =
    indentAmt === INDENT_AMOUNT ? '' : getIndentAmount(indentBy);

  // If the values are an array or string, convert it into a object
  if (Array.isArray(values)) {
    values = values.reduce((o, val) => {
      if (isPlainObject(val)) {
        // Comes from `options`
        o[val.name] = val.value;
      } else {
        // Comes from original `utilities` values
        o[val] = val;
      }
      return o;
    }, {});
  }

  const entries = Object.entries(values);

  return entries.reduce((css, [key, value], i) => {
    // Multiple properties are possible, for example with vertical
    // or horizontal margins or paddings.
    if (typeof properties === 'string') {
      properties = properties.split(' ');
    }

    // Use custom class if present
    const propertyClass = className || properties[0] || '';
    infix =
      propertyClass === '' && infix.startsWith('-') ? infix.slice(1) : infix;
    const modifier = propertyClass.length && key !== 'null' ? `-${key}` : '';
    const closingSelectorIndent =
      properties.length > 1 ? openingSelectorIndent : '';

    return (css +=
      value != null
        ? `${openingSelectorIndent}.${propertyClass}${infix}${modifier} {${generateDeclaration(
            properties,
            value as string,
            indentAmt,
          )}${closingSelectorIndent}}\n`
        : '');
  }, '');
}
