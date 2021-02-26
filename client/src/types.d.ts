declare type Constructor<T> = new (args: any) => T
declare type Func = (...args: any[]) => any

// declare type valueof<T> = typeof T[keyof typeof T] | T[keyof T]
declare type valueof<T> = T[keyof T]

declare type Primitive = string | boolean | number | symbol | null | undefined

declare type LiteralToPrimitive<T extends any> = T extends string
  ? string
  : T extends number
  ? number
  : T extends boolean
  ? boolean
  : T

declare type Booleanish = boolean | 'true' | 'false'

declare type ConditionalKeys<Base, Condition> = NonNullable<
  // Wrap in `NonNullable` to strip away the `undefined` type from the produced union.
  {
    // Map through all the keys of the given base type.
    [Key in keyof Base]: // Pick only keys with types extending the given `Condition` type.
    Base[Key] extends Condition
      ? // Retain this key since the condition passes.
        Key
      : // Discard this key since the condition fails.
        never

    // Convert the produced object into a union type of the keys which passed the conditional test.
  }[keyof Base]
>
declare type ConditionalPick<Base, Condition> = Pick<Base, ConditionalKeys<Base, Condition>>

/** Avoid type "any object" */
declare type AnyObject<T = any> = Record<string, T>
declare type CollectionObj<T = unknown> = Record<string, T>
declare type Collection<T = any> = CollectionObj<T>[]
declare type CollectionItem<T extends object = object> = Record<keyof T, valueof<T>>
declare type CollectionIter<Item extends CollectionItem = CollectionItem, V = any> = (
  v: valueof<Item>,
  i?: number,
  o?: Item,
) => V

/**
 * Get function or non-function properties from defined types.
 * @see {@link https://stackoverflow.com/a/58210459}
 */
declare type FunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? K : never
}[keyof T]
declare type FunctionProperties<T> = Pick<T, FunctionPropertyNames<T>>
declare type NonFunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? never : K
}[keyof T]
declare type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>

/**
 * Replace property Target in T with Replacement
 * @example
 * type Example = Replace<{foo: string}, 'foo', number>
 */
declare type Replace<T, Target extends keyof T, Replacement> = Omit<T, Target> &
  { [key in Target]: Replacement }

declare type RenameKey<T, K extends keyof T, R extends PropertyKey> = {
  [P in keyof T as P extends K ? R : P]: T[P]
}

declare type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [key in K]+?: Exclude<T[key], null | undefined> }

/**
 * @type {CSSObject}
 * @example
 * [
 *   {
 *     borderRadius: "0.1875rem"
 *   }, {
 *     "@media screen and (min-width: 35.9375em)": {
 *       borderRadius: "0.3125rem"
 *     }
 *   }, {
 *     "@media screen and (min-width: 61.8125em)": {
 *       borderRadius: "0.5625rem"
 *     }
 *   }
 * ]
 */
// declare type CSSObject<T = Primitive> = AnyObject<T> | AnyObject<AnyObject<T>>
declare type CSSObject<T = Primitive> = StyledCSSObject & (AnyObject<T> | AnyObject<AnyObject<T>>)

// interface ThemeProps {
//   bg?: string
//   fg?: string
//   borderColor?: string
//   boxShadow?: string
//   hoverColor?: string
//   checked?: string
// }

// interface Theme {
//   name: string
//   bg: string
//   fg: string
//   primary: string
//   accent: string
//   link: ThemeProps
//   borderColor: string
//   control: ThemeProps
//   disabled: ThemeProps
//   focus: ThemeProps
//   hover: ThemeProps
//   invalid: ThemeProps
//   muted: string
// }
declare type Theme = AnyObject

export type EventWithTarget<T> = React.SyntheticEvent<T> & { target: T }
export type FormEventWithTarget<T = HTMLInputElement> = React.FormEvent<T> & { target: T }

export {
  Constructor,
  CSSObject,
  Func,
  valueof,
  ValueType,
  Primitive,
  LiteralToPrimitive,
  Booleanish,
  ConditionalKeys,
  ConditionalPick,
  AnyObject,
  Collection,
  CollectionItem,
  CollectionIter,
  FunctionPropertyNames,
  FunctionProperties,
  MakeOptional,
  NonFunctionPropertyNames,
  NonFunctionProperties,
  Replace,
  RenameKey,
  Theme,
  EventWithTarget,
  FormEventWithTarget,
}

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
    onChange?: (e?: any) => void
  }

  // interface Settings {
  //   [key: string]: Setting
  // }

  interface Settings {
    export: Setting
    colorSchemes: Setting
    global: Setting
    border: Setting
    mediaQuery: Setting
    nameGeneration: Setting
  }

  type SettingsValues = { [key in valueof<Settings>]: valueof<valueof<Settings>> }

  interface Utility extends ConfigRecord {
    id?: string
    class?: string
    description?: string
    active?: boolean
    inputType?: string
    property?: string
    responsive?: boolean
    options?: string[] | OptionProps[]
    subitems?: OptionProps[]
    modifiers?: Record<string, any>
    items?: OptionProps[] // used on repeater fields
    onChange?: (e?: any) => void
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
