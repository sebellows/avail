import { Config, AvailConfig, AvailModuleConfig } from '../contracts';
import { isNil, stripUnit, toPx } from './common';
import { generateValueClasses } from './classBuilders';

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
export class MediaQueryController {
    breakpoints: Config = {};

    constructor(config: AvailConfig) {
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
    getNextBreakpoint(name: string) {
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
    breakpointMin(name: string) {
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
    breakpointMax(name: string) {
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
    getBreakpointSuffix(name: string): string | null {
        return this.breakpointMin(name) == null ? '' : `-${name}`;
    }

    wrapInMediaQuery(config: AvailModuleConfig) {
        // const { class: className, values, responsive, property } = config;
        // console.log('breakpoints', Object.entries(this.breakpoints));
        return Object.entries(this.breakpoints).reduce((css, [bp, width]) => {
            return (css += this.mediaBreakpointUp(
                bp,
                generateValueClasses(config, this.getBreakpointSuffix(bp)!),
            ));
        }, '');
    }

    /**
     * Media of at least the minimum breakpoint width. No query for the smallest breakpoint.
     * Makes the `content` apply to the given breakpoint and wider.
     */
    mediaBreakpointUp(name: string, content: string) {
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
    mediaBreakpointDown(name: string, content: string) {
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
    mediaBreakpointBetween(lower: string, upper: string, content: string) {
        const min = this.breakpointMin(lower);
        const max = this.breakpointMax(upper);

        if (!isNil(min) && !isNil(max)) {
            return `
                @media (min-width: ${min}) and (max-width: ${max}) {
                    ${content}
                }
            `;
        } else if (isNil(max)) {
            return this.mediaBreakpointUp(lower, content);
        } else if (isNil(min)) {
            return this.mediaBreakpointDown(upper, content);
        }
    }

    /**
     * Media between the breakpoint's minimum and maximum widths.
     * No minimum for the smallest breakpoint, and no maximum for the largest one.
     * Makes the `content` apply only to the given breakpoint, not viewports any wider or narrower.
     */
    mediaBreakpointOnly(name: string, content: string) {
        const min = this.breakpointMin(name);
        const max = this.breakpointMax(name);

        if (!isNil(min) && !isNil(max)) {
            return `
                @media (min-width: ${min}) and (max-width: ${max}) {
                    ${content}
                }
            `;
        } else if (isNil(max)) {
            return this.mediaBreakpointUp(name, content);
        } else if (isNil(min)) {
            return this.mediaBreakpointDown(name, content);
        }
    }
}
