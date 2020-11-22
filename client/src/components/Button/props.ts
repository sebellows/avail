import { ComponentProps } from '../../core/contracts'

export interface ButtonProps extends ComponentProps {
  fab?: boolean
  icon?: boolean
  size?: string
  type?: 'button' | 'submit'
  variant?: string
  [key: string]: any
}

export interface ToggleButtonProps
  extends Omit<ButtonProps, 'type'>,
    React.PropsWithChildren<ComponentProps> {
  type?: 'checkbox' | 'radio'
  name?: string
  checked?: boolean
  disabled?: boolean
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  value: unknown
}
