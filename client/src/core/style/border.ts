import { responsiveStyle } from './helpers'
import { toREM } from './units'

export function responsiveBorderStyle() {
  return ['border', 'borderTop', 'borderRight', 'borderBottom', 'borderLeft'].map(
    (prop: string) => {
      return responsiveStyle('border', (value: any) =>
        value ? { '&&': { [prop]: value } } : { '&&': { [prop]: 0 } },
      )
    },
  )
}

export function responsiveBorderRadiusStyle() {
  return [
    'borderRadius',
    'borderTopLeftRadius',
    'borderTopRightRadius',
    'borderBottomRightRadius',
    'borderBottomLeftRadius',
  ].map((prop: string) => {
    return responsiveStyle('radius', (value: number, { radius }) => {
      console.log('responsiveBorderRadiusStyle', prop, value, radius)
      return value ? { '&&': { [prop]: toREM(value) } } : { '&&': { [prop]: 0 } }
    })
  })
}
