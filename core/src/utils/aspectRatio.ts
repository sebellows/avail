import { percentage } from './units'

const setBaseClass = (baseClass: string, childClass: string) => {
  return `
    .${baseClass} {
      position: relative;
      display: block;
      width: 100%;
      padding: 0;
      overflow: hidden;
    }
    .${baseClass}::before {
      display: block;
      content: '';
    }
    .${baseClass} .${childClass},
    .${baseClass} iframe,
    .${baseClass} embed,
    .${baseClass} object,
    .${baseClass} video {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: 0;
    }
  `
}

export const setAspectRatio = (config: any) => {
  const { name: baseClass, values } = config.aspectRatio
  const itemClass = config.aspectRatioItem || `${baseClass}-item`
  let css = setBaseClass(baseClass, itemClass)

  Object.entries(values).forEach(([key, value]) => {
    const [den, num] = (value as string).split(':')
    css += `
            .${baseClass}-${key} {
                padding-top: ${percentage(+num, +den)} !important;
            }
        `
  })

  return css
}
