import { ComponentPropsWithRef } from 'react'
import { ComponentProps } from '../../core/contracts'

export interface DropdownItemProps extends ComponentProps {
  isActive?: boolean
  checked?: boolean
  disabled?: boolean
  name?: string
  size?: number
  type?: 'checkbox' | 'radio'
  value?: unknown
  width?: number | string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  onHoverStart?: (e?: any) => void
  onHoverEnd?: (e?: any) => void
}

export interface DropdownProps
  extends Omit<ComponentPropsWithRef<'div'>, 'onSelect'>,
    ComponentProps {
  alignMenu?: 'left' | 'right' | 'center'
  // Update toggle label to selected item text (like a pseudo-select form control)
  asSelect?: boolean
  itemAs?: keyof JSX.IntrinsicElements | React.ComponentType<any>
  carat?: boolean
  items?: Record<string, string> | string[]
  itemProps?: DropdownItemProps
  selected?: Record<string, string> | string
  width?: number | string
  onSelect?: (selection: any, e: any) => void
}
