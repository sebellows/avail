import { ThemeColorVariantKey } from '../../theme'

export type BadgeMode = 'default' | 'outline'
export type BadgeVariant = ThemeColorVariantKey

export interface BadgeStyleProps {
  $mode: BadgeMode
  $variant: BadgeVariant
}
