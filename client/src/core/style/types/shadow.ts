// offsetX, offsetY, blurRadius, spreadRadius
export type BoxShadow = [number, number, number, number]

export type DropShadow = [number, number, number]

export interface ShadowProps {
  umbra: BoxShadow
  penumbra: BoxShadow
  ambient: BoxShadow
}
