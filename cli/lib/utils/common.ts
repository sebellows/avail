export const isNil = (obj: any) => obj === undefined || obj === null;

export const isPlainObject = (obj: any) =>
    Object.prototype.toString.call(obj) === '[object Object]';

export const stripUnit = (value: string): number =>
    value.match(/\d+/g) ? parseInt(value) : +value;

export const toPx = (value: number | string) => {
    return typeof value == 'string' ? `${stripUnit(value)}px` : `${value}px`;
};

export const kebabCase = (str: string) =>
    str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();

export const getNestedProp = (obj: any, key: string) => {
    try {
        return key.split('.').reduce((o, prop) => o[prop], obj);
    } catch (err) {
        return null;
    }
};
