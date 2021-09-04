interface SvgrSync {
  sync(searchFrom: string, configFile: any): string
}

declare module '@svgr/core' {
  const defaultExport: SvgrSync
  export default defaultExport
  export const resolveConfig: SvgrSync

  const svgrCore: any
  export = svgrCore
}
