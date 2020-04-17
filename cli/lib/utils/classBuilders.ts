import { AvailModuleConfig } from '../contracts';

export function generateDeclarationBlock(value: string, ...props: string[]) {
    return props.reduce((css, prop, i) => {
        const eol = i !== props.length - 1 ? '\n' : '';
        return (css += `${prop}: ${value} !important;${eol}`);
    }, '');
}

export function generateValueClasses(config: AvailModuleConfig, bpSuffix?: string) {
    const { class: moduleClass, property, values } = config;
    const className = moduleClass || '';
    const props = Array.isArray(property) ? property : [property!];

    return Object.entries(values!).reduce((css, [key, value]): string => {
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
