export interface DropdownItemProps extends Avail.ComponentProps {
  isActive?: boolean
  checked?: boolean
  disabled?: boolean
  name?: string
  size?: number
  // type?: 'checkbox' | 'radio'
  value?: unknown
  width?: number | string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  onHoverStart?: (e?: any) => void
  onHoverEnd?: (e?: any) => void
}

export interface DropdownProps extends Avail.ComponentProps {
  alignMenu?: 'left' | 'right' | 'center'
  // Update toggle label to selected item text (like a pseudo-select form control)
  asSelect?: boolean
  itemAs?: keyof JSX.IntrinsicElements | React.ComponentType<any>
  carat?: boolean
  items?: Record<string, string> | string[]
  itemProps?: DropdownItemProps
  selected?: Record<string, string> | string | string[]
  width?: number | string
  onClick?: (selection: any, e?: any) => void
}
