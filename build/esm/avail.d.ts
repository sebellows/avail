import { AvailConfig, AvailSettings, AvailModules, AvailModuleConfig } from './contracts';
export declare class AvailBuilder {
    config: AvailConfig;
    get modules(): AvailModules;
    set modules(modules: AvailModules);
    private _modules;
    get modulesInUse(): any;
    set modulesInUse(modules: any);
    private _modulesInUse;
    get settings(): AvailSettings;
    set settings(settings: AvailSettings);
    private _settings;
    private mq;
    constructor(config?: AvailConfig);
    generateDeclarationBlock(value: string, ...props: string[]): string;
    generateValueClasses(config: AvailModuleConfig): string;
    generateModuleClasses(): string;
    buildCSS(): string;
}
