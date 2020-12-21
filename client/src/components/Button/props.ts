export interface ButtonProps extends Avail.ComponentProps {
  fab?: boolean
  icon?: boolean
  size?: number | string
  type?: 'button' | 'submit'
  variant?: string
  [key: string]: any
}

export interface ToggleButtonProps extends Omit<ButtonProps, 'type'> {
  type?: 'checkbox' | 'radio'
  name?: string
  checked?: boolean
  disabled?: boolean
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  value: unknown
}
