// offsetX, offsetY, blurRadius, spreadRadius
export type BoxShadow = [number, number, number, number]

export interface ThemeShadow {
  umbra: BoxShadow
  penumbra: [number, number, number, number]
  ambience: [number, number, number, number]
}
