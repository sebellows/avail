import createModules from './config/modules';
import createSettings from './config/settings';
import { AvailConfig, AvailSettings, AvailModules, AvailModuleConfig } from './contracts';
import { MediaQueryController } from './utils/mediaQuery';
import { isPlainObject } from './utils/common';
// import { generateValueClasses } from './utils/classUtils';

export class AvailBuilder {
    config: AvailConfig;

    get modules() {
        return this._modules;
    }
    set modules(modules: AvailModules) {
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
    private _modules: AvailModules = {};

    get modulesInUse() {
        return this._modulesInUse;
    }
    set modulesInUse(modules: any) {
        const moduleNames: string[] = [];
        Object.entries(modules).forEach(([key, value]) => {
            if (value && (typeof value == 'boolean' || isPlainObject(value))) {
                moduleNames.push(key);
            }
        });
        this._modulesInUse = moduleNames;
    }
    private _modulesInUse: string[] = [];

    get settings(): AvailSettings {
        return this._settings;
    }
    set settings(settings: AvailSettings) {
        this._settings = createSettings(settings);
    }
    private _settings: AvailSettings = createSettings();

    private mq: MediaQueryController;

    constructor(config?: AvailConfig) {
        if (config && config.settings) {
            this.settings = config.settings;
        }
        this.modulesInUse = this.settings.modules!;
        this.modules = { ...createModules(this.settings), ...(config ? config.modules : {}) };
        this.config = config || { settings: this.settings, modules: this.modules };
        this.mq = new MediaQueryController(this.config);
        // console.log('Settings', this.settings);
    }

    generateDeclarationBlock(value: string, ...props: string[]) {
        return props.reduce((css, prop, i) => {
            const eol = i !== props.length - 1 ? '\n' : '';
            return (css += `${prop}: ${value} !important;${eol}`);
        }, '');
    }

    generateValueClasses(config: AvailModuleConfig) {
        const { class: moduleClass, property, values } = config;
        const props = Array.isArray(property) ? property : [property!];
        const className = moduleClass || '';

        return Object.entries(values!).reduce((css, [key, value]): string => {
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
            const { responsive } = config!;

            if (!responsive) {
                return (css += this.generateValueClasses(config!));
            } else {
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
