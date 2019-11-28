import { AvailConfig } from '../util';

export const createVariants = (className: string, prop: string, config: AvailConfig) => {
    return Object.entries(config.settings.variants).reduce((css, [key, value]) => {
        return (css += `
            .${className}-${key} {
                ${prop}: ${value} !important;
            }
        `);
    }, '');
};
