export type Constructor = new (...args: any[]) => any
export type Func = (...args: any[]) => any

export type valueof<T> = typeof T[keyof typeof T] | T[keyof T]

export type Primitive = string | boolean | number | symbol | null | undefined

export type LiteralToPrimitive<T extends any> = T extends string
  ? string
  : T extends number
  ? number
  : T extends boolean
  ? boolean
  : T

export type CollectionObj<T> = Record<string, T>
export type CollectionArray<T> = CollectionObj<T>[]
export type Collection<T> = CollectionObj<T> | CollectionArray<T>

// declare namespace Avail {
//   type ReplaceProps<
//     Inner extends React.ElementType | React.ComponentType<any> = React.ElementType,
//     P
//   > = Omit<React.ComponentPropsWithRef<Inner>, P> & P

//   interface ClassNameOnlyProps {
//     className?: string
//   }

//   interface ComponentProps<
//     As extends React.ElementType | React.ComponentType<any> = React.ElementType
//   > extends ClassNameOnlyProps {
//     as?: As
//     theme?: Theme
//   }

//   type ComponentPropsWithChildren<
//     As extends React.ElementType | React.ComponentType<any> = React.ElementType
//   > = React.PropsWithChildren<ComponentProps<As>>

//   type ComponentPropsWithRef<T extends React.ElementType> = React.PropsWithRef<ComponentProps<T>>

//   interface RefForwardingComponent<TInitial extends React.ElementType, P = unknown> {
//     <As extends React.ElementType | React.ComponentType<TInitial> = TInitial>(
//       props: React.PropsWithChildren<ReplaceProps<As, ComponentProps<As> & P>>,
//       ref?: any,
//     ): React.ReactElement | null
//     displayName?: string
//   }

//   type Theme = Record<string, Record<string, any>>

//   type FieldError = Record<string, string>

//   interface OptionProps {
//     disabled?: boolean
//     name?: string | number
//     readOnly?: boolean
//     selected?: boolean
//     value: string | number
//   }

//   type Option = string | OptionProps

//   type FormElement = HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement

//   interface Control extends InputHTMLAttributes<FormElement>, ComponentProps<FormElement> {
//     arialabel?: string
//     disabled?: boolean
//     error?: FieldError
//     isInvalid?: boolean
//     isValid?: boolean
//     // catch-all
//     // [key: string]: any;
//   }

//   interface OptionControl<T extends string | OptionProps> extends Control {
//     defaultOption?: T
//     options?: T[]
//   }

//   interface ControlGroup<
//     As extends React.ElementType | React.ComponentType<any> = React.ElementType
//   > extends ComponentProps<As> {
//     classMap?: ClassMap
//     description?: string
//     errors?: FieldError
//     id?: string
//     keyLabel?: string
//     valueLabel?: string
//     legend?: string
//     presets?: string[] | Record<string, any>
//     onAdd?: React.ReactEventHandler<T>
//     onChange?: React.FormEventHandler<T>
//     onRemove?: React.ReactEventHandler<T>
//     after?: string | React.ReactNode // TODO: currently unused
//     before?: string | React.ReactNode // TODO: currently unused
//     // [key: string]: any
//   }

//   interface ClassMap {
//     control?: string
//     container?: string
//     description?: string
//     error?: string
//     field?: string
//     label?: string
//     legend?: string
//   }

//   type ConfigRecord = Record<string | number | symbol, unknown>

//   interface Setting extends ConfigRecord {
//     id?: string
//     legend?: string
//     fields?: Record<string, SettingField>
//   }

//   interface SettingField {
//     id: string
//     type: string
//     checked?: boolean // used on checkboxes and switches
//     classMap?: ClassMap
//     description?: string
//     inputType?: string
//     label?: string | React.ReactElement
//     legend?: string
//     items?: OptionProps[] // used on repeater fields
//     options?: OptionProps[] // used on select and radiogroup fields
//     attrs?: Record<string, any>
//     readOnly?: boolean
//     validators?: Record<string, any>
//     value?: string | number
//   }

//   interface Settings {
//     [key: string]: Setting
//   }

//   interface Utility extends ConfigRecord {
//     id?: string
//     class?: string
//     description?: string
//     enabled?: boolean
//     inputType?: string
//     property?: string
//     responsive?: boolean
//     options?: string[] | OptionProps[]
//     subitems?: OptionProps[]
//     subproperties?: Record<string, any>
//     items?: OptionProps[] // used on repeater fields
//   }

//   interface Utilities {
//     [key: string]: Utility
//   }

//   interface State {
//     settings: Record<string, Setting>
//     utilities: Record<string, Utility>
//   }

//   type StateType = keyof State

//   type Config<P = any> = {
//     [K in StateType]: P extends State[K] ? K : State[K]
//   }[StateType]

//   interface StateConfig {
//     name: string
//     value: string | boolean
//   }
// }

// export = Avail
// export as namespace Avail
