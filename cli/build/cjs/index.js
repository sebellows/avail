'use strict';

var fs = require('fs');

const isNil = (obj) => obj === undefined || obj === null;
const isPlainObject = (obj) => Object.prototype.toString.call(obj) === '[object Object]';
const stripUnit = (value) => value.match(/\d+/g) ? parseInt(value) : +value;
const toPx = (value) => {
    return typeof value == 'string' ? `${stripUnit(value)}px` : `${value}px`;
};
const getNestedProp = (obj, key) => {
    try {
        return key.split('.').reduce((o, prop) => o[prop], obj);
    }
    catch (err) {
        return null;
    }
};

const negativeMargins = (settings) => {
    return Object.entries(settings.spacing).reduce((obj, [k, v]) => {
        return { ...obj, [`${settings.negativeMarginPrefix}${k}`]: `-${v}` };
    }, {});
};
var createModules = (settings) => ({
    backgroundColor: {
        class: 'bg',
        property: 'background-color',
        values: {
            ...settings.variants,
            body: getNestedProp(settings, 'body.bg'),
            white: getNestedProp(settings, 'colors.white') || '#fff',
            black: getNestedProp(settings, 'colors.black') || '#000',
            transparent: 'transparent',
        },
    },
    border: {
        class: 'border',
        property: 'border',
        values: {
            null: `${getNestedProp(settings, 'border.width.default')} solid ${getNestedProp(settings, 'border.color')}`,
            thick: `${getNestedProp(settings, 'border.width.thick')} solid ${getNestedProp(settings, 'border.color')}`,
            '0': 'none',
        },
    },
    borderTop: {
        class: 'border-top',
        property: 'border-top',
        values: {
            null: `${getNestedProp(settings, 'border.width.default')} solid ${getNestedProp(settings, 'border.color')}`,
            '0': 'none',
        },
    },
    borderRight: {
        class: 'border-right',
        property: 'border-right',
        values: {
            null: `${getNestedProp(settings, 'border.width.default')} solid ${getNestedProp(settings, 'border.color')}`,
            '0': 'none',
        },
    },
    borderBottom: {
        class: 'border-bottom',
        property: 'border-bottom',
        values: {
            null: `${getNestedProp(settings, 'border.width.default')} solid ${getNestedProp(settings, 'border.color')}`,
            '0': 'none',
        },
    },
    borderLeft: {
        class: 'border-left',
        property: 'border-left',
        values: {
            null: `${getNestedProp(settings, 'border.width.default')} solid ${getNestedProp(settings, 'border.color')}`,
            '0': 'none',
        },
    },
    borderColor: {
        class: 'border',
        property: 'border-color',
        values: {
            ...settings.variants,
            white: 'white',
            black: 'black',
            '0': 'none',
        },
    },
    borderRadius: {
        class: 'rounded',
        property: 'border-radius',
        values: {
            null: getNestedProp(settings, 'borderRadius.default'),
            sm: getNestedProp(settings, 'borderRadius.small'),
            lg: getNestedProp(settings, 'borderRadius.large'),
            circle: '50%',
            pill: '50rem',
            '0': 'none',
        },
    },
    borderRadiusTop: {
        class: 'rounded-top',
        property: ['border-top-right-radius', 'border-top-left-radius'],
        values: {
            null: getNestedProp(settings, 'borderRadius.default'),
            sm: getNestedProp(settings, 'borderRadius.small'),
            lg: getNestedProp(settings, 'borderRadius.large'),
        },
    },
    borderRadiusRight: {
        class: 'rounded-right',
        property: ['border-top-right-radius', 'border-bottom-right-radius'],
        values: {
            null: getNestedProp(settings, 'borderRadius.default'),
            sm: getNestedProp(settings, 'borderRadius.small'),
            lg: getNestedProp(settings, 'borderRadius.large'),
        },
    },
    borderRadiusBottom: {
        class: 'rounded-bottom',
        property: ['border-bottom-right-radius', 'border-bottom-left-radius'],
        values: {
            null: getNestedProp(settings, 'borderRadius.default'),
            sm: getNestedProp(settings, 'borderRadius.small'),
            lg: getNestedProp(settings, 'borderRadius.large'),
        },
    },
    borderRadiusLeft: {
        class: 'rounded-left',
        property: ['border-top-left-radius', 'border-bottom-right-radius'],
        values: {
            null: getNestedProp(settings, 'borderRadius.default'),
            sm: getNestedProp(settings, 'borderRadius.small'),
            lg: getNestedProp(settings, 'borderRadius.large'),
        },
    },
    boxShadow: {
        class: 'shadow',
        property: 'box-shadow',
        values: {
            null: '0px 3px 1px -2px black, 0px 2px 2px 0px black, 0px 1px 5px 0px black',
            sm: '0px 2px 1px -1px black, 0px 1px 1px 0px black, 0px 1px 3px 0px black',
            lg: '0px 5px 5px -3px black, 0px 8px 10px 1px black, 0px 3px 14px 2px black',
            none: 'none',
        },
    },
    color: {
        class: 'text',
        property: 'color',
        values: {
            ...settings.variants,
            white: getNestedProp(settings, 'color.white'),
            body: getNestedProp(settings, 'body.color'),
            muted: getNestedProp(settings, 'color.muted'),
            black50: 'rgba(0, 0, 0, .5)',
            white50: 'rgba(255, 255, 255, .5)',
            reset: 'inherit',
        },
    },
    display: {
        class: 'd',
        property: 'display',
        responsive: true,
        values: {
            block: 'block',
            inline: 'inline',
            inlineBlock: 'inline-block',
            flex: 'flex',
            inlineFlex: 'inline-flex',
            table: 'table',
            tableRow: 'table-row',
            tableCell: 'table-cell',
            none: 'none',
        },
    },
    flexDirection: {
        class: 'flex',
        property: 'flex-direction',
        responsive: true,
        values: {
            row: 'row',
            column: 'column',
            rowReverse: 'row-reverse',
            columnReverse: 'column-reverse',
        },
    },
    flexWrap: {
        class: 'flex',
        property: 'flex-wrap',
        responsive: true,
        values: {
            wrap: 'wrap',
            nowrap: 'nowrap',
            wrapReverse: 'wrap-reverse',
        },
    },
    flex: {
        class: 'flex',
        property: 'flex',
        responsive: true,
        values: {
            fill: '1 1 0%',
            auto: '1 1 auto',
            min: '0 1 auto',
        },
    },
    flexGrow: {
        class: 'flex-grow',
        property: 'flex-grow',
        responsive: true,
        values: {
            '0': 0,
            '1': 1,
        },
    },
    flexShrink: {
        class: 'flex-shrink',
        property: 'flex-shrink',
        responsive: true,
        values: {
            '0': 0,
            '1': 1,
        },
    },
    justifyContent: {
        class: 'justify-content',
        property: 'justify-content',
        responsive: true,
        values: {
            start: 'flex-start',
            end: 'flex-end',
            center: 'center',
            between: 'space-between',
            around: 'space-around',
        },
    },
    alignItems: {
        class: 'align-items',
        property: 'align-items',
        responsive: true,
        values: {
            start: 'flex-start',
            end: 'flex-end',
            center: 'center',
            baseline: 'baseline',
            stretch: 'stretch',
        },
    },
    alignContent: {
        class: 'align-content',
        property: 'align-content',
        responsive: true,
        values: {
            start: 'flex-start',
            end: 'flex-end',
            center: 'center',
            between: 'space-between',
            around: 'space-around',
            stretch: 'stretch',
        },
    },
    alignSelf: {
        class: 'align-self',
        property: 'align-self',
        responsive: true,
        values: {
            auto: 'auto',
            start: 'flex-start',
            end: 'flex-end',
            center: 'center',
            baseline: 'baseline',
            stretch: 'stretch',
        },
    },
    order: {
        class: 'order',
        property: 'order',
        responsive: true,
        values: {
            first: -1,
            '0': 0,
            '1': 1,
            '2': 2,
            '3': 3,
            '4': 4,
            '5': 5,
            last: 6,
        },
    },
    float: {
        class: 'float',
        property: 'float',
        responsive: true,
        values: {
            left: 'left',
            right: 'right',
            none: 'none',
        },
    },
    fontFamily: {
        class: 'text',
        property: 'font-family',
        values: {
            mono: getNestedProp(settings, 'fontFamilies.mono').join(' '),
            sans: getNestedProp(settings, 'fontFamilies.mono').join(' '),
            serif: getNestedProp(settings, 'fontFamilies.mono').join(' '),
        },
    },
    fontSize: {
        class: 'text',
        property: 'font-size',
        values: {
            normal: '1rem',
            fine: '.75rem',
            sm: '.875rem',
            lg: '1.25rem',
        },
    },
    headings: {
        class: null,
        property: 'font-size',
        values: {
            h1: '2.5rem',
            h2: '2rem',
            h3: '1.75rem',
            h4: '1.5rem',
            h5: '1.25rem',
            h6: '1rem',
        },
    },
    displayText: {
        class: 'display',
        property: 'font-size',
        values: {
            '1': '6rem',
            '2': '5rem',
            '3': '4rem',
            '4': '3rem',
        },
    },
    fontStyle: {
        class: 'font',
        property: 'font-style',
        values: {
            italic: 'italic',
            normal: 'normal',
        },
    },
    fontWeight: {
        class: 'font-weight',
        property: 'font-weight',
        values: {
            normal: 'normal',
            thin: '100',
            light: '300',
            medium: '500',
            semibold: '600',
            bold: '700',
            black: '900',
            bolder: 'bolder',
            lighter: 'lighter',
        },
    },
    overflow: {
        class: 'overflow',
        property: 'overflow',
        values: {
            auto: 'auto',
            hidden: 'hidden',
            scroll: 'scroll',
            visible: 'visible',
        },
    },
    overflowX: {
        class: 'overflow-x',
        property: 'overflow-x',
        values: {
            auto: 'auto',
            hidden: 'hidden',
            scroll: 'scroll',
            visible: 'visible',
        },
    },
    overflowY: {
        class: 'overflow-y',
        property: 'overflow-y',
        values: {
            auto: 'auto',
            hidden: 'hidden',
            scroll: 'scroll',
            visible: 'visible',
        },
    },
    position: {
        class: 'position',
        property: 'position',
        responsive: true,
        values: {
            absolute: 'absolute',
            fixed: 'fixed',
            relative: 'relative',
            static: 'static',
            sticky: 'sticky',
        },
    },
    width: {
        class: 'w',
        property: 'width',
        responsive: true,
        values: {
            ...settings.sizes,
            ...settings.keywordSizes,
            auto: 'auto',
        },
    },
    minWidth: {
        class: 'min-w',
        property: 'min-width',
        responsive: true,
        values: {
            '100': '100%',
            initial: 'initial',
        },
    },
    maxWidth: {
        class: 'mw',
        property: 'max-width',
        responsive: true,
        values: {
            ...settings.keywordSizes,
            '100': '100%',
            none: 'none',
        },
    },
    viewportWidth: {
        class: 'vw',
        property: 'width',
        values: {
            '100': '100vw',
        },
    },
    minViewportWidth: {
        class: 'min-vw',
        property: 'min-width',
        values: {
            '100': '100vw',
        },
    },
    height: {
        class: 'h',
        property: 'height',
        responsive: true,
        values: {
            ...settings.sizes,
            auto: 'auto',
        },
    },
    maxHeight: {
        class: 'mh',
        property: 'max-height',
        responsive: true,
        values: {
            '100': '100%',
        },
    },
    viewportHeight: {
        class: 'vw',
        property: 'height',
        values: {
            '100': '100vh',
        },
    },
    minViewportHeight: {
        class: 'min-vw',
        property: 'min-height',
        values: {
            '100': '100vh',
        },
    },
    margin: {
        class: 'm',
        property: 'margin',
        responsive: true,
        values: settings.spacing,
    },
    marginTop: {
        class: 'mt',
        property: 'margin-top',
        responsive: true,
        values: settings.spacing,
    },
    marginRight: {
        class: 'mr',
        property: 'margin-right',
        responsive: true,
        values: settings.spacing,
    },
    marginBottom: {
        class: 'mb',
        property: 'margin-bottom',
        responsive: true,
        values: settings.spacing,
    },
    marginLeft: {
        class: 'ml',
        property: 'margin-left',
        responsive: true,
        values: settings.spacing,
    },
    marginX: {
        class: 'mx',
        property: ['margin-left', 'margin-right'],
        responsive: true,
        values: settings.spacing,
    },
    marginY: {
        class: 'my',
        property: ['margin-top', 'margin-bottom'],
        responsive: true,
        values: settings.spacing,
    },
    negativeMargin: {
        class: 'm',
        property: 'margin',
        responsive: true,
        values: negativeMargins(settings),
    },
    negativeMarginTop: {
        class: 'mt',
        property: 'margin-top',
        responsive: true,
        values: negativeMargins(settings),
    },
    negativeMarginRight: {
        class: 'mr',
        property: 'margin-right',
        responsive: true,
        values: negativeMargins(settings),
    },
    negativeMarginBottom: {
        class: 'mb',
        property: 'margin-bottom',
        responsive: true,
        values: negativeMargins(settings),
    },
    negativeMarginLeft: {
        class: 'ml',
        property: 'margin-left',
        responsive: true,
        values: negativeMargins(settings),
    },
    negativeMarginX: {
        class: 'mx',
        property: ['margin-left', 'margin-right'],
        responsive: true,
        values: negativeMargins(settings),
    },
    negativeMarginY: {
        class: 'my',
        property: ['margin-top', 'margin-bottom'],
        responsive: true,
        values: negativeMargins(settings),
    },
    padding: {
        class: 'p',
        property: 'padding',
        responsive: true,
        values: settings.spacing,
    },
    paddingTop: {
        class: 'pt',
        property: 'padding-top',
        responsive: true,
        values: settings.spacing,
    },
    paddingRight: {
        class: 'pr',
        property: 'padding-right',
        responsive: true,
        values: settings.spacing,
    },
    paddingBottom: {
        class: 'pb',
        property: 'padding-bottom',
        responsive: true,
        values: settings.spacing,
    },
    paddingLeft: {
        class: 'pl',
        property: 'padding-left',
        responsive: true,
        values: settings.spacing,
    },
    paddingX: {
        class: 'px',
        property: ['padding-left', 'padding-right'],
        responsive: true,
        values: settings.spacing,
    },
    paddingY: {
        class: 'py',
        property: ['padding-top', 'padding-bottom'],
        responsive: true,
        values: settings.spacing,
    },
    textAlign: {
        class: 'text',
        property: 'text-align',
        values: {
            center: 'center',
            left: 'left',
            right: 'right',
            justify: 'justify',
        },
    },
    textDecoration: {
        class: 'text-decoration',
        property: 'text-decoration',
        values: {
            none: 'none',
            underline: 'underline',
        },
    },
    textTransform: {
        class: 'text',
        property: 'text-transform',
        values: {
            lowercase: 'lowercase',
            uppercase: 'uppercase',
            capitalize: 'capitalize',
        },
    },
    whitespace: {
        class: 'text',
        property: 'white-space',
        values: {
            wrap: 'wrap',
            nowrap: 'nowrap',
        },
    },
    transition: {
        class: 'transition',
        property: 'transition',
        values: {
            easeIn: 'all .3s cubic-bezier(0.55, 0, 0.55, 0.2)',
            easeOut: 'all .4s cubic-bezier(0.25, 0.8, 0.25, 1)',
            easeInOut: 'all .5s cubic-bezier(0.35, 0, 0.25, 1)',
        },
    },
    verticalAlign: {
        class: 'align',
        property: 'vertical-align',
        values: {
            baseline: 'baseline',
            top: 'top',
            middle: 'middle',
            textBottom: 'text-bottom',
            textTop: 'text-top',
        },
    },
    visibility: {
        class: null,
        property: 'visibility',
        values: {
            visible: 'visible',
            invisible: 'hidden',
        },
    },
});
// import { AvailSettings } from '../util';
// import { getNestedProp } from '../utils/common';
// export default (settings: AvailSettings) => ({
//     aspectRatio: {
//         name: 'embed-responsive',
//         values: {
//             '1by1': '1:1',
//             '3by2': '3:2',
//             '4by3': '4:3',
//             '16by9': '16:9',
//             '21by9': '21:9',
//             '3by4': '3:4',
//             '3by5': '3:5',
//         },
//     },
//     aspectRatioItem: {
//         name: '',
//     },
//     background: {
//         name: 'bg',
//         useVariants: true,
//     },
//     border: {
//         name: 'border',
//         useDirections: true,
//         useVariants: true,
//         values: {
//             '0': 'none',
//             default: `1px solid ${getNestedProp(settings, 'grays.300')}`,
//             thick: `3px solid ${getNestedProp(settings, 'grays.300')}`,
//         },
//     },
//     borderRadius: {
//         name: 'rounded',
//         useDirections: true,
//         values: {
//             '0': 'none',
//             default: '.25rem',
//             sm: '.125rem',
//             lg: '.5rem',
//             circle: '50%',
//             pill: '50rem',
//         },
//     },
//     boxShadow: {
//         name: 'shadow',
//         values: {
//             default: '0px 3px 1px -2px black, 0px 2px 2px 0px black, 0px 1px 5px 0px black',
//             sm: '0px 2px 1px -1px black, 0px 1px 1px 0px black, 0px 1px 3px 0px black',
//             lg: '0px 5px 5px -3px black, 0px 8px 10px 1px black, 0px 3px 14px 2px black',
//             none: 'none',
//         },
//     },
//     color: {
//         name: 'text',
//         useVariants: true,
//     },
//     display: {
//         name: 'd',
//         responsive: true,
//         values: {
//             none: 'none',
//             inline: 'inline',
//             inlineBlock: 'inline-block',
//             block: 'block',
//             table: 'table',
//             tableRow: 'table-row',
//             tableCell: 'table-cell',
//             flex: 'flex',
//             inlineFlex: 'inline-flex',
//         },
//     },
//     flexDirection: {
//         name: 'flex',
//         responsive: true,
//         values: {
//             row: 'row',
//             column: 'column',
//             rowReverse: 'row-reverse',
//             columnReverse: 'column-reverse',
//         },
//     },
//     flexWrap: {
//         name: 'flex',
//         responsive: true,
//         values: {
//             wrap: 'wrap',
//             nowrap: 'nowrap',
//             wrapReverse: 'wrap-reverse',
//         },
//     },
//     flex: {
//         name: 'flex',
//         responsive: true,
//         values: {
//             fill: '1 1 0%',
//             auto: '1 1 auto',
//             min: '0 1 auto',
//         },
//     },
//     flexGrow: {
//         name: 'flex-grow',
//         responsive: true,
//         values: {
//             '0': 0,
//             '1': 1,
//         },
//     },
//     flexShrink: {
//         name: 'flex-shrink',
//         responsive: true,
//         values: {
//             '0': 0,
//             '1': 1,
//         },
//     },
//     justifyContent: {
//         name: 'justify-content',
//         responsive: true,
//         values: {
//             start: 'flex-start',
//             end: 'flex-end',
//             center: 'center',
//             between: 'space-between',
//             around: 'space-around',
//         },
//     },
//     alignItems: {
//         name: 'align-items',
//         responsive: true,
//         values: {
//             start: 'flex-start',
//             end: 'flex-end',
//             center: 'center',
//             baseline: 'baseline',
//             stretch: 'stretch',
//         },
//     },
//     alignContent: {
//         name: 'align-content',
//         responsive: true,
//         values: {
//             start: 'flex-start',
//             end: 'flex-end',
//             center: 'center',
//             between: 'space-between',
//             around: 'space-around',
//             stretch: 'stretch',
//         },
//     },
//     alignSelf: {
//         name: 'align-self',
//         responsive: true,
//         values: {
//             auto: 'auto',
//             start: 'flex-start',
//             end: 'flex-end',
//             center: 'center',
//             baseline: 'baseline',
//             stretch: 'stretch',
//         },
//     },
//     float: {
//         name: 'float',
//         responsive: true,
//         values: {
//             left: 'left',
//             right: 'right',
//             none: 'none',
//         },
//     },
//     fontFamily: {
//         name: 'text',
//         values: {
//             mono: [
//                 'SFMono-Regular',
//                 'Menlo',
//                 'Monaco',
//                 'Consolas',
//                 '"Liberation Mono"',
//                 '"Courier New"',
//                 'monospace',
//             ],
//             sans: [
//                 '-apple-system',
//                 'BlinkMacSystemFont',
//                 '"Segoe UI"',
//                 'Roboto',
//                 '"Helvetica Neue"',
//                 'Arial',
//                 '"Noto Sans"',
//                 'sans-serif',
//                 '"Apple Color Emoji"',
//                 '"Segoe UI Emoji"',
//                 '"Segoe UI Symbol"',
//                 '"Noto Color Emoji"',
//             ],
//             serif: ['Georgia', 'Palatino', '"Times New Roman"', 'Times', 'serif'],
//         },
//     },
//     fontSize: {
//         name: 'text',
//         values: {
//             normal: '1rem',
//             fine: '.75rem',
//             sm: '.875rem',
//             lg: '1.25rem',
//             h1: '2.5rem',
//             h2: '2rem',
//             h3: '1.75rem',
//             h4: '1.5rem',
//             h5: '1.25rem',
//             h6: '1rem',
//             display1: '6rem',
//             display2: '5rem',
//             display3: '4rem',
//             display4: '3rem',
//         },
//     },
//     fontStyle: {
//         name: 'font',
//         values: {
//             italic: 'italic',
//             normal: 'normal',
//         },
//     },
//     fontWeight: {
//         name: 'font-weight',
//         values: {
//             normal: 'normal',
//             thin: '100',
//             light: '300',
//             medium: '500',
//             semibold: '600',
//             bold: '700',
//             black: '900',
//             bolder: 'bolder',
//             lighter: 'lighter',
//         },
//     },
//     overflow: {
//         name: 'overflow',
//         values: {
//             auto: 'auto',
//             hidden: 'hidden',
//             scroll: 'scroll',
//             visible: 'visible',
//         },
//     },
//     overflowX: {
//         name: 'overflow-x',
//         values: {
//             auto: 'auto',
//             hidden: 'hidden',
//             scroll: 'scroll',
//             visible: 'visible',
//         },
//     },
//     overflowY: {
//         name: 'overflow-y',
//         values: {
//             auto: 'auto',
//             hidden: 'hidden',
//             scroll: 'scroll',
//             visible: 'visible',
//         },
//     },
//     position: {
//         name: 'position',
//         responsive: true,
//         values: {
//             absolute: {
//                 name: 'absolute',
//                 useDirections: ['top', 'right', 'bottom', 'left'],
//             },
//             fixed: {
//                 name: 'fixed',
//                 useDirections: ['top', 'bottom'],
//             },
//             relative: 'relative',
//             static: 'static',
//             sticky: {
//                 name: 'sticky',
//                 useDirections: ['top', 'bottom'],
//             },
//         },
//     },
//     width: {
//         name: 'w',
//         responsive: true,
//         useSizes: true,
//         useKeywordSizes: true,
//         includeViewportUnits: false,
//     },
//     height: {
//         name: 'h',
//         responsive: true,
//         useSizes: true,
//         useKeywordSizes: true,
//         includeViewportUnits: true,
//     },
//     minWidth: {
//         name: 'mw',
//         responsive: true,
//         useSizes: [100],
//         useInitial: true,
//         useKeywordSizes: true,
//         includeViewportUnits: false,
//     },
//     maxWidth: {
//         name: 'mh',
//         responsive: true,
//         useSizes: [100],
//         useInitial: true,
//         useKeywordSizes: true,
//         includeViewportUnits: true,
//     },
//     margin: {
//         name: 'm',
//         responsive: true,
//         useDirections: true,
//         useSpacing: true,
//         includeNegativeValues: true,
//     },
//     padding: {
//         name: 'm',
//         responsive: true,
//         useDirections: true,
//         useSpacing: true,
//     },
//     textAlign: {
//         name: 'text',
//         values: {
//             center: 'center',
//             left: 'left',
//             right: 'right',
//             justify: 'justify',
//         },
//     },
//     textDecoration: {
//         name: 'text-decoration',
//         values: {
//             none: 'none',
//             underline: 'underline',
//         },
//     },
//     textTransform: {
//         name: 'text',
//         values: {
//             lowercase: 'lowercase',
//             uppercase: 'uppercase',
//             capitalize: 'capitalize',
//         },
//     },
//     whitespace: {
//         name: 'text',
//         values: {
//             wrap: 'wrap',
//             nowrap: 'nowrap',
//         },
//     },
//     transition: {
//         name: 'transition',
//         values: {
//             easeIn: 'all .3s cubic-bezier(0.55, 0, 0.55, 0.2)',
//             easeOut: 'all .4s cubic-bezier(0.25, 0.8, 0.25, 1)',
//             easeInOut: 'all .5s cubic-bezier(0.35, 0, 0.25, 1)',
//         },
//     },
//     verticalAlign: {
//         name: 'align',
//         values: {
//             baseline: 'baseline',
//             top: 'top',
//             middle: 'middle',
//             textBottom: 'text-bottom',
//             textTop: 'text-top',
//         },
//     },
//     visibility: {
//         name: '',
//         values: {
//             visible: 'visible',
//             invisible: 'hidden',
//         },
//     },
// });

const moduleDefaults = {
    backgroundColor: true,
    border: true,
    borderRadius: true,
    boxShadow: true,
    color: true,
    display: true,
    flexDirection: true,
    flexWrap: true,
    flex: true,
    flexGrow: true,
    flexShrink: true,
    justifyContent: true,
    alignItems: true,
    alignContent: true,
    alignSelf: true,
    float: true,
    fontFamily: true,
    fontSize: true,
    fontStyle: true,
    fontWeight: true,
    overflow: true,
    overflowX: true,
    overflowY: true,
    position: true,
    width: true,
    height: true,
    minWidth: true,
    maxWidth: true,
    margin: true,
    padding: true,
    textAlign: true,
    textDecoration: true,
    textTransform: true,
    whitespace: true,
    transition: true,
    verticalAlign: true,
    visibility: true,
};
var createSettings = (config = {}) => {
    const configuredSettings = config || {};
    const _settings = {
        prefix: '',
        reboot: true,
        modules: moduleDefaults,
        breakpoints: {
            sm: '576px',
            md: '768px',
            lg: '992px',
            xl: '1200px',
        },
        grays: {
            '100': '#f8f9fa',
            '200': '#e9ecef',
            '300': '#dee2e6',
            '400': '#ced4da',
            '500': '#adb5bd',
            '600': '#6c757d',
            '700': '#495057',
            '800': '#343a40',
            '900': '#212529',
        },
        colors: {
            white: '#fff',
            black: '#000',
            blue: '#0d6efd',
            purple: '#6f42c1',
            pink: '#d63384',
            red: '#dc3545',
            orange: '#fd7e14',
            yellow: '#ffc107',
            green: '#28a745',
            teal: '#20c997',
            cyan: '#17a2b8',
            muted: '#6c757d',
        },
        variants: {
            primary: '',
            secondary: '',
            success: '',
            info: '',
            warning: '',
            danger: '',
            light: '',
            dark: '',
            white: '',
            black: '',
            transparent: 'transparent',
        },
        body: {},
        border: {},
        borderRadius: {},
        directions: {
            t: 'top',
            r: 'right',
            b: 'bottom',
            l: 'left',
            y: ['top', 'bottom'],
            x: ['left', 'right'],
        },
        fontFamilies: {
            mono: [
                'SFMono-Regular',
                'Menlo',
                'Monaco',
                'Consolas',
                '"Liberation Mono"',
                '"Courier New"',
                'monospace',
            ],
            sans: [
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                '"Noto Sans"',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
                '"Noto Color Emoji"',
            ],
            serif: ['Georgia', 'Palatino', '"Times New Roman"', 'Times', 'serif'],
        },
        keywordSizes: {
            min: 'min-content',
            max: 'max-content',
            fit: 'fit-content',
            fill: 'fill-available',
        },
        negativeValuePrefix: 'n',
        negativeMarginPrefix: 'n',
        sizes: {
            '0': '0',
            '25': '25%',
            '50': '50%',
            '75': '75%',
            '100': '100%',
        },
        spacing: {
            0: '0',
            1: '.25rem',
            2: '.5rem',
            3: '1rem',
            4: '1.5rem',
            5: '3rem',
        },
    };
    _settings.body = {
        backgroundColor: getNestedProp(_settings, 'colors.white'),
        color: getNestedProp(_settings, 'grays.800'),
    };
    _settings.border = {
        width: {
            default: '1px',
            thick: '3px',
        },
        color: getNestedProp(_settings, 'grays.300'),
    };
    _settings.borderRadius = {
        default: '.25rem',
        small: '.125rem',
        large: '.5rem',
    };
    _settings.variants = {
        primary: getNestedProp(_settings, 'colors.blue'),
        secondary: getNestedProp(_settings, 'grays.600'),
        success: getNestedProp(_settings, 'colors.green'),
        info: getNestedProp(_settings, 'colors.cyan'),
        warning: getNestedProp(_settings, 'colors.yellow'),
        danger: getNestedProp(_settings, 'colors.red'),
        light: getNestedProp(_settings, 'grays.100'),
        dark: getNestedProp(_settings, 'grays.800'),
        white: getNestedProp(_settings, 'colors.white'),
        black: getNestedProp(_settings, 'colors.black'),
        transparent: 'transparent',
    };
    return { ..._settings, ...configuredSettings };
};

function generateDeclarationBlock(value, ...props) {
    return props.reduce((css, prop, i) => {
        const eol = i !== props.length - 1 ? '\n' : '';
        return (css += `${prop}: ${value} !important;${eol}`);
    }, '');
}
function generateValueClasses(config, bpSuffix) {
    const { class: moduleClass, property, values } = config;
    const className = moduleClass || '';
    const props = Array.isArray(property) ? property : [property];
    return Object.entries(values).reduce((css, [key, value]) => {
        // const suffix = key !== 'default' ? `-${key}` : '';
        const sep = className && key ? '-' : '';
        bpSuffix = bpSuffix || '';
        const suffix = !key ? '' : `${bpSuffix}${sep}${key}`;
        const declaration = generateDeclarationBlock(value, ...props);
        return (css += `
                .${className}${suffix} {
                    ${declaration}
                }
            `);
    }, '');
}

/**
 * Breakpoint viewport sizes and media queries.
 *
 * Breakpoints are defined as a map of (name: minimum width), order from small to large:
 *
 * @example
 * ```
 *     const breakpoints = { xs: 0, sm: 576px, md: 768px, lg: 992px, xl: 1200px };
 * ```
 */
class MediaQueryController {
    constructor(config) {
        this.breakpoints = {};
        this.breakpoints = config.settings.breakpoints;
    }
    /**
     * Name of the next breakpoint, or null for the last breakpoint.
     *
     * @example
     * ```
     *     getNextBreakpoint('sm'); // => 'md'
     * ```
     */
    getNextBreakpoint(name) {
        const breakpointNames = Object.keys(this.breakpoints);
        const n = breakpointNames.indexOf(name);
        return !isNil(n) && n < breakpointNames.length ? breakpointNames[n + 1] : null;
    }
    /**
     * Minimum breakpoint width. Null for the smallest (first) breakpoint.
     *
     * @example
     * ```
     *     breakpointMin('sm'); // => '576px'
     * ```
     */
    breakpointMin(name) {
        return this.breakpoints[name] && stripUnit(this.breakpoints[name]) != 0
            ? this.breakpoints[name]
            : null;
    }
    /**
     * Maximum breakpoint width. Null for the largest (last) breakpoint.
     * The maximum value is calculated as the minimum of the next one less 0.02px
     * to work around the limitations of `min-` and `max-` prefixes and viewports with fractional widths.
     * See https://www.w3.org/TR/mediaqueries-4/#mq-min-max
     * Uses 0.02px rather than 0.01px to work around a current rounding bug in Safari.
     * See https://bugs.webkit.org/show_bug.cgi?id=178261
     *
     * @example
     * ```
     *     breakpointMax('sm'); // => '767.98px'
     * ```
     */
    breakpointMax(name) {
        const next = this.getNextBreakpoint(name);
        return next ? toPx(stripUnit(this.breakpointMin(next)) - 0.02) : null;
    }
    /**
     * Returns a blank string if smallest breakpoint, otherwise returns the name with a dash in front.
     * Useful for making responsive utilities.
     *
     * @example
     * ```
     *     getBreakpointSuffix('xs'); // =>  ''
     *     getBreakpointSuffix('sm'); // => '-sm'
     * ```
     */
    getBreakpointSuffix(name) {
        return this.breakpointMin(name) == null ? '' : `-${name}`;
    }
    wrapInMediaQuery(config) {
        // const { class: className, values, responsive, property } = config;
        // console.log('breakpoints', Object.entries(this.breakpoints));
        return Object.entries(this.breakpoints).reduce((css, [bp, width]) => {
            return (css += this.mediaBreakpointUp(bp, generateValueClasses(config, this.getBreakpointSuffix(bp))));
        }, '');
    }
    /**
     * Media of at least the minimum breakpoint width. No query for the smallest breakpoint.
     * Makes the `content` apply to the given breakpoint and wider.
     */
    mediaBreakpointUp(name, content) {
        const min = this.breakpointMin(name);
        if (min) {
            return `
        @media (min-width: ${min}) {
          ${content}
        }
      `;
        }
        return content;
    }
    /**
     * Media of at most the maximum breakpoint width. No query for the largest breakpoint.
     * Makes the `content` apply to the given breakpoint and narrower.
     */
    mediaBreakpointDown(name, content) {
        const max = this.breakpointMax(name);
        if (max) {
            return `
                @media (max-width: ${max}) {
                    ${content}
                }
            `;
        }
        return content;
    }
    /**
     * Media that spans multiple breakpoint widths.
     * Injects the `content` and makes it apply between the min and max breakpoints.
     */
    mediaBreakpointBetween(lower, upper, content) {
        const min = this.breakpointMin(lower);
        const max = this.breakpointMax(upper);
        if (!isNil(min) && !isNil(max)) {
            return `
                @media (min-width: ${min}) and (max-width: ${max}) {
                    ${content}
                }
            `;
        }
        else if (isNil(max)) {
            return this.mediaBreakpointUp(lower, content);
        }
        else if (isNil(min)) {
            return this.mediaBreakpointDown(upper, content);
        }
    }
    /**
     * Media between the breakpoint's minimum and maximum widths.
     * No minimum for the smallest breakpoint, and no maximum for the largest one.
     * Makes the `content` apply only to the given breakpoint, not viewports any wider or narrower.
     */
    mediaBreakpointOnly(name, content) {
        const min = this.breakpointMin(name);
        const max = this.breakpointMax(name);
        if (!isNil(min) && !isNil(max)) {
            return `
                @media (min-width: ${min}) and (max-width: ${max}) {
                    ${content}
                }
            `;
        }
        else if (isNil(max)) {
            return this.mediaBreakpointUp(name, content);
        }
        else if (isNil(min)) {
            return this.mediaBreakpointDown(name, content);
        }
    }
}

// import { generateValueClasses } from './utils/classUtils';
class AvailBuilder {
    constructor(config) {
        this._modules = {};
        this._modulesInUse = [];
        this._settings = createSettings();
        if (config && config.settings) {
            this.settings = config.settings;
        }
        this.modulesInUse = this.settings.modules;
        this.modules = { ...createModules(this.settings), ...(config ? config.modules : {}) };
        this.config = config || { settings: this.settings, modules: this.modules };
        this.mq = new MediaQueryController(this.config);
        // console.log('Settings', this.settings);
    }
    get modules() {
        return this._modules;
    }
    set modules(modules) {
        this._modules = modules;
        // const availModules = Object.keys(modules);
        // if (this.modulesInUse.length) {
        //     availModules.forEach((_module) => {
        //         if (this.modulesInUse.indexOf(_module) === -1) {
        //             delete this._modules[_module];
        //         }
        //     });
        // }
    }
    get modulesInUse() {
        return this._modulesInUse;
    }
    set modulesInUse(modules) {
        const moduleNames = [];
        Object.entries(modules).forEach(([key, value]) => {
            if (value && (typeof value == 'boolean' || isPlainObject(value))) {
                moduleNames.push(key);
            }
        });
        this._modulesInUse = moduleNames;
    }
    get settings() {
        return this._settings;
    }
    set settings(settings) {
        this._settings = createSettings(settings);
    }
    generateDeclarationBlock(value, ...props) {
        return props.reduce((css, prop, i) => {
            const eol = i !== props.length - 1 ? '\n' : '';
            return (css += `${prop}: ${value} !important;${eol}`);
        }, '');
    }
    generateValueClasses(config) {
        const { class: moduleClass, property, values } = config;
        const props = Array.isArray(property) ? property : [property];
        const className = moduleClass || '';
        return Object.entries(values).reduce((css, [key, value]) => {
            const sep = className ? '-' : '';
            const suffix = !key ? '' : `${sep}${key}`;
            const declaration = this.generateDeclarationBlock(value, ...props);
            return (css += `
                .${className}${suffix} {
                    ${declaration}
                }
            `);
        }, '');
    }
    generateModuleClasses() {
        return Object.entries(this.modules).reduce((css, [key, config]) => {
            const { responsive } = config;
            if (!responsive) {
                return (css += this.generateValueClasses(config));
            }
            else {
                return (css += this.mq.wrapInMediaQuery(config));
            }
        }, '');
    }
    buildCSS() {
        let css = '';
        css += this.generateModuleClasses();
        return css;
    }
}

function start() {
    const fit = new AvailBuilder();
    try {
        fs.writeFileSync('public/avail.css', fit.buildCSS());
    }
    catch (err) {
        console.error('Avail Error:', err);
    }
}
start();
