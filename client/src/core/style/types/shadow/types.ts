export type BoxShadow = [number, number, number, number]

export type DropShadow = [number, number, number]

export interface ShadowProps<T extends number | BoxShadow = number> {
  hue?: string
  umbra?: T
  penumbra?: T
  ambience?: T
}

export interface ResponsiveDropShadowStyleProps {
  dropShadows?: number | number[]
}

export interface ResponsiveShadowStyleProps {
  shadows?: number | number[]
}
