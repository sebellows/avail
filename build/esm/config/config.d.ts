export declare const classNames: {
    aspectRatio: {
        name: string;
        valueClasses: {
            '1by1': string;
            '3by2': string;
            '4by3': string;
            '16by9': string;
            '21by9': string;
            '3by4': string;
            '3by5': string;
        };
    };
    aspectRatioItem: null;
    background: {
        name: string;
        useVariants: boolean;
    };
    border: {
        name: string;
        useDirections: boolean;
        useVariants: boolean;
        valueClasses: {
            '0': string;
            default: string;
            thick: string;
        };
    };
    borderRadius: {
        name: string;
        useDirections: boolean;
        valueClasses: {
            '0': string;
            default: string;
            sm: string;
            lg: string;
            circle: string;
            pill: string;
        };
    };
    boxShadow: {
        name: string;
        valueClasses: {
            default: string;
            sm: string;
            lg: string;
            none: string;
        };
    };
    color: {
        name: string;
        useVariants: boolean;
    };
    display: {
        name: string;
        useBreakpoints: boolean;
        valueClasses: {
            none: string;
            inline: string;
            inlineBlock: string;
            block: string;
            table: string;
            tableRow: string;
            tableCell: string;
            flex: string;
            inlineFlex: string;
        };
    };
    flexDirection: {
        name: string;
        useBreakpoints: boolean;
        valueClasses: {
            row: string;
            column: string;
            rowReverse: string;
            columnReverse: string;
        };
    };
    flexWrap: {
        name: string;
        useBreakpoints: boolean;
        valueClasses: {
            wrap: string;
            nowrap: string;
            wrapReverse: string;
        };
    };
    flex: {
        name: string;
        useBreakpoints: boolean;
        valueClasses: {
            fill: string;
            auto: string;
            min: string;
        };
    };
    flexGrow: {
        name: string;
        useBreakpoints: boolean;
        valueClasses: {
            '0': number;
            '1': number;
        };
    };
    flexShrink: {
        name: string;
        useBreakpoints: boolean;
        valueClasses: {
            '0': number;
            '1': number;
        };
    };
    justifyContent: {
        name: string;
        useBreakpoints: boolean;
        valueClasses: {
            start: string;
            end: string;
            center: string;
            between: string;
            around: string;
        };
    };
    alignItems: {
        name: string;
        useBreakpoints: boolean;
        valueClasses: {
            start: string;
            end: string;
            center: string;
            baseline: string;
            stretch: string;
        };
    };
    alignContent: {
        name: string;
        useBreakpoints: boolean;
        valueClasses: {
            start: string;
            end: string;
            center: string;
            between: string;
            around: string;
            stretch: string;
        };
    };
    alignSelf: {
        name: string;
        useBreakpoints: boolean;
        valueClasses: {
            auto: string;
            start: string;
            end: string;
            center: string;
            baseline: string;
            stretch: string;
        };
    };
    float: {
        name: string;
        useBreakpoints: boolean;
        valueClasses: {
            left: string;
            right: string;
            none: string;
        };
    };
    fontFamily: {
        name: string;
        valueClasses: {
            mono: string[];
            sans: string[];
            serif: string[];
        };
    };
    fontSize: {
        name: string;
        valueClasses: {
            normal: string;
            fine: string;
            sm: string;
            lg: string;
            h1: string;
            h2: string;
            h3: string;
            h4: string;
            h5: string;
            h6: string;
            display1: string;
            display2: string;
            display3: string;
            display4: string;
        };
    };
    fontStyle: {
        name: string;
        valueClasses: {
            italic: string;
            normal: string;
        };
    };
    fontWeight: {
        name: string;
        valueClasses: {
            normal: string;
            thin: string;
            light: string;
            medium: string;
            semibold: string;
            bold: string;
            black: string;
            bolder: string;
            lighter: string;
        };
    };
    overflow: {
        name: string;
        valueClasses: {
            auto: string;
            hidden: string;
            scroll: string;
            visible: string;
        };
    };
    overflowX: {
        name: string;
        valueClasses: {
            auto: string;
            hidden: string;
            scroll: string;
            visible: string;
        };
    };
    overflowY: {
        name: string;
        valueClasses: {
            auto: string;
            hidden: string;
            scroll: string;
            visible: string;
        };
    };
    position: {
        name: string;
        useBreakpoints: boolean;
        valueClasses: {
            absolute: {
                name: string;
                useDirections: string[];
            };
            fixed: {
                name: string;
                useDirections: string[];
            };
            relative: string;
            static: string;
            sticky: {
                name: string;
                useDirections: string[];
            };
        };
    };
    width: {
        name: string;
        useBreakpoints: boolean;
        useSizes: boolean;
        useKeywordSizes: boolean;
        includeViewportUnits: boolean;
    };
    height: {
        name: string;
        useBreakpoints: boolean;
        useSizes: boolean;
        useKeywordSizes: boolean;
        includeViewportUnits: boolean;
    };
    minWidth: {
        name: string;
        useBreakpoints: boolean;
        useSizes: number[];
        useInitial: boolean;
        useKeywordSizes: boolean;
        includeViewportUnits: boolean;
    };
    maxWidth: {
        name: string;
        useBreakpoints: boolean;
        useSizes: number[];
        useInitial: boolean;
        useKeywordSizes: boolean;
        includeViewportUnits: boolean;
    };
    margin: {
        name: string;
        useBreakpoints: boolean;
        useDirections: boolean;
        useSpacing: boolean;
        includeNegativeValues: boolean;
    };
    padding: {
        name: string;
        useBreakpoints: boolean;
        useDirections: boolean;
        useSpacing: boolean;
    };
    textAlign: {
        name: string;
        valueClasses: {
            center: string;
            left: string;
            right: string;
            justify: string;
        };
    };
    textDecoration: {
        name: string;
        valueClasses: {
            none: string;
            underline: string;
        };
    };
    textTransform: {
        name: string;
        valueClasses: {
            lowercase: string;
            uppercase: string;
            capitalize: string;
        };
    };
    textWrap: {
        name: string;
        valueClasses: {
            wrap: string;
            nowrap: string;
        };
    };
    transition: {
        name: string;
        valueClasses: {
            easeIn: string;
            easeOut: string;
            easeInOut: string;
        };
    };
    verticalAlign: {
        name: string;
        valueClasses: {
            baseline: string;
            top: string;
            middle: string;
            textBottom: string;
            textTop: string;
        };
    };
    visible: string;
    invisible: string;
};
export declare const extras: {
    accessibility: {
        name: string;
        declaration: string;
    };
    accessibilityFocusable: {
        name: string;
        declaration: string;
    };
    btn: {
        name: string;
        useVariants: boolean;
        declaration: string;
        styles: string[];
    };
    clearfix: {
        name: string;
        declaration: string;
    };
    small: {
        name: string;
        declaration: string;
    };
    textHide: {
        name: string;
        declaration: string;
    };
    textTruncate: {
        name: string;
        declaration: string;
    };
    textReset: {
        name: string;
        declaration: string;
    };
};
