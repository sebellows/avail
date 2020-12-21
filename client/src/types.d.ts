import {
  Booleanish,
  // IntrinsicElementDef,
  // valueof
} from './baseTypes'

declare namespace Avail {
  type ReplaceProps<Inner extends React.ElementType, P> = Omit<
    React.ComponentPropsWithRef<Inner>,
    P
  > &
    P

  // type AvailProps<As extends keyof IntrinsicElementDef> = {
  //   [K in keyof IntrinsicElementsMap]: React.HTMLProps<valueof<IntrinsicElementsMap[K]>>
  // }[keyof IntrinsicElementsMap]

  // React.HTMLProps<HTMLDivElement>
  interface Props<As extends React.ElementType = React.ElementType> {
    as?: As
    theme?: Theme
    className?: string
    children?: React.ReactNode | React.ReactNode[]
  }

  type ComponentProps<As extends React.ElementType = React.ElementType> = React.PropsWithChildren<
    Props<As>
  >

  type PropsWithChildren<
    As extends React.ElementType = React.ElementType
  > = React.PropsWithChildren<Props<As>>

  type ComponentPropsWithRef<T extends React.ElementType> = React.PropsWithRef<ComponentProps<T>>

  type ForwardedRef<T> = ((instance: T | null) => void) | MutableRefObject<T | null> | null

  interface RefForwardingComponent<
    TInitial extends React.ElementType = React.ElementType,
    P = any
  > {
    <As extends React.ElementType = TInitial>(
      props: React.PropsWithChildren<ReplaceProps<As, Props<As> & P>>,
      ref?: any,
    ): React.ReactElement
    contextTypes?: any
    displayName?: string
  }

  type FieldError = Record<string, string>

  type AvailElement<P = any> = {
    [K in keyof JSX.IntrinsicElements]: P extends JSX.IntrinsicElements[K] ? K : never
  }[keyof JSX.IntrinsicElements]

  const AvailOptionElement = {
    option: HTMLOptionElement,
    input: HTMLInputElement,
  }
  type AvailOptionType = 'option' | 'input'

  type OptionProps = {
    disabled?: boolean
    label?: string
    readOnly?: boolean
    selected?: boolean
    value?: string | ReadonlyArray<string> | number
  }

  type Option = string | OptionProps

  type FormElement = HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement | HTMLLabelElement
  type FormElementType<As extends 'select' | 'textarea' | 'input'> = React.ElementType<As>
  enum AvailFormElement {
    input = HTMLInputElement,
    select = HTMLSelectElement,
    textarea = HTMLTextAreaElement,
  }

  interface Control<As extends React.ElementType = React.ElementType<FormElementType>>
    extends ComponentProps<As>,
      React.InputHTMLAttributes<AvailFormElement<As>> {
    arialabel?: string
    // disabled?: boolean
    error?: FieldError
    // id?: string
    label?: string | React.ReactNode
    options?: Option[] // if `select` or `radio-group`
    // plaintext?: boolean
    // readOnly?: boolean
    // type?: string
    // value?: string | string[] | number
    isInvalid?: Booleanish
    isValid?: Booleanish
    // onBlur?: React.FocusEventHandler<FormElement>
    // onChange?: React.ChangeEventHandler<FormElement>
    onAdd?: (e?: any) => void
    onRemove?: (e?: any) => void
    onUpdate?: (...args: any[]) => void
    // catch-all
    // [key: string]: any;
  }

  interface OptionControl<T extends Option = Option> extends Control {
    defaultOption?: T
    options?: T[]
  }

  interface ControlGroup<As extends React.ElementType = React.ElementType>
    extends ComponentProps<As> {
    classMap?: ClassMap
    description?: string
    errors?: FieldError
    id?: string
    keyLabel?: string
    valueLabel?: string
    legend?: string
    options?: Option[]
    presets?: string[] | Record<string, any>
    onAdd?: (e?: any) => void
    onChange?: React.ChangeEventHandler<As>
    onRemove?: (e?: any) => void
    onUpdate?: (...args: any[]) => void
    after?: string | React.ReactNode // TODO: currently unused
    before?: string | React.ReactNode // TODO: currently unused
    // [key: string]: any
  }

  type EventHandler<K extends keyof HTMLElementEventMap> = (
    this: HTMLElement,
    event: HTMLElementEventMap[K],
  ) => any

  type Listener = (this: HTMLElement, ev: TransitionEvent) => any

  interface ThemeProps {
    bg?: string
    fg?: string
    borderColor?: string
    boxShadow?: string
    hoverColor?: string
    checked?: string
  }

  interface Theme {
    name: string
    bg: string
    fg: string
    primary: string
    accent: string
    link: ThemeProps
    borderColor: string
    control: ThemeProps
    disabled: ThemeProps
    focus: ThemeProps
    hover: ThemeProps
    invalid: ThemeProps
    muted: string
  }

  interface ClassMap {
    control?: string
    container?: string
    description?: string
    error?: string
    field?: string
    label?: string
    legend?: string
  }

  type ConfigRecord = Record<string | number | symbol, unknown>

  interface Setting extends ConfigRecord {
    id?: string
    legend?: string
    fields?: Record<string, SettingField>
  }

  interface SettingField {
    id: string
    type: string
    checked?: boolean // used on checkboxes and switches
    classMap?: ClassMap
    description?: string
    inputType?: string
    label?: string | React.ReactElement
    legend?: string
    items?: OptionProps[] // used on repeater fields
    options?: OptionProps[] // used on select and radiogroup fields
    attrs?: Record<string, any>
    readOnly?: boolean
    validators?: Record<string, any>
    value?: string | number
  }

  interface Settings {
    [key: string]: Setting
  }

  interface Utility extends ConfigRecord {
    id?: string
    class?: string
    description?: string
    enabled?: boolean
    inputType?: string
    property?: string
    responsive?: boolean
    options?: string[] | OptionProps[]
    subitems?: OptionProps[]
    subproperties?: Record<string, any>
    items?: OptionProps[] // used on repeater fields
  }

  interface Utilities {
    [key: string]: Utility
  }

  interface State {
    settings: Record<string, Setting>
    utilities: Record<string, Utility>
  }

  type StateType = keyof State

  type Config<P = any> = {
    [K in StateType]: P extends State[K] ? K : State[K]
  }[StateType]

  interface StateConfig {
    name: string
    value: string | boolean
  }
}

export = Avail
export as namespace Avail
