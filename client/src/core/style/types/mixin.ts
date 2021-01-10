import { DropShadow, ShadowProps } from './shadow'
import { FontWeightKey } from './text'

export interface BaseMixin<Styles extends {} = {}> {
  button?: {
    textWeight: FontWeightKey
  }
  // color: StyleColorSchemes
  container?: number[]
  focusRing?: {
    offset: number
    width: number
  }
  // fonts: StyleFonts
  media?: number[]
  radius?: number[]
  dropShadows?: (DropShadow | null)[]
  shadows?: (ShadowProps | null)[]
  space?: number[]
  // control: StyleControl
  styles?: Styles
}

export type MixinProps = {
  mixin: BaseMixin
}
