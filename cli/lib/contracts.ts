export type Constructor = new (...args: any[]) => any;
export type Func = (...args: any[]) => any;
export type Config = { [key: string]: any };

/**
 * Matches any primitive value
 * Source: {@link https://github.com/sindresorhus/type-fest}
 * @see {@link https://developer.mozilla.org/en-US/docs/Glossary/Primitive}
 */
export type Primitive = null | undefined | string | number | boolean | symbol | bigint;

/**
 * Create a type from an object type without certain keys. This type is a
 * stricter version of TypeScript's `Omit`.
 *
 * Source: {@link https://github.com/sindresorhus/type-fest}
 *
 * @example
 * ```
 *     import {Except} from 'type-fest';
 *     type Foo = {
 *         a: number;
 *         b: string;
 *         c: boolean;
 *     };
 *     type FooWithoutA = Except<Foo, 'a' | 'c'>; //=> {b: string}
 * ```
 */
export type Except<ObjectType, KeysType extends keyof ObjectType> = Pick<
    ObjectType,
    Exclude<keyof ObjectType, KeysType>
>;

export type AvailModuleType =
    | 'background'
    | 'border'
    | 'borderRadius'
    | 'boxShadow'
    | 'color'
    | 'display'
    | 'flexDirection'
    | 'flexWrap'
    | 'flex'
    | 'flexGrow'
    | 'flexShrink'
    | 'justifyContent'
    | 'alignItems'
    | 'alignContent'
    | 'alignSelf'
    | 'float'
    | 'fontFamily'
    | 'fontSize'
    | 'fontStyle'
    | 'fontWeight'
    | 'overflow'
    | 'overflowX'
    | 'overflowY'
    | 'position'
    | 'width'
    | 'height'
    | 'minWidth'
    | 'maxWidth'
    | 'margin'
    | 'padding'
    | 'textAlign'
    | 'textDecoration'
    | 'textTransform'
    | 'whitespace'
    | 'transition'
    | 'verticalAlign'
    | 'visibility';

// export type ModuleConfig = Record<AvailModuleType, boolean>;

export interface AvailSettings extends Record<string, any> {
    prefix?: string;
    reboot?: boolean;
    modules: Record<AvailModuleType, boolean>;
    breakpoints: Record<string, string>;
    grays: Record<string, string>;
    colors: Record<string, string>;
    variants: Record<string, string>;
    body: { backgroundColor: string; color: string };
    border: { width: string; color: string };
    borderRadius: Record<string, string>;
    directions: Record<string, string>;
    fontFamilies: Record<string, string>;
    keywordSizes: Record<string, string>;
    negativeMarginPrefix: string;
    sizes: Record<string, string>;
    spacing: Record<string, string>;
}

export interface AvailModuleConfig {
    class: string | null;
    property: string | string[];
    responsive?: boolean;
    values?: Record<string, any>;
}

// export type AvailModules = Record<AvailModuleType, AvailModuleConfig>;
export interface AvailModules {
    [key: string]: AvailModuleConfig;
}

export interface AvailConfig {
    settings: AvailSettings;
    modules: AvailModules;
    extras?: Record<string, any>;
}

export const instanceOfAny = (object: any, constructors: Constructor[]): boolean =>
    constructors.some((c) => object instanceof c);
