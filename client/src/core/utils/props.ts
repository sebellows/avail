const FORM_CONTROL_PROPS = [
  'autofocus',
  'autocomplete',
  'checked',
  'cols',
  'disabled',
  'height',
  'id',
  'list',
  'max',
  'maxLength',
  'min',
  'minLength',
  'multiple',
  'name',
  'pattern',
  'placeholder',
  'readOnly',
  'required',
  'rows',
  'size',
  'step',
  'style',
  'tabIndex',
  'value',
  'width',
  'onBlur',
  'onChange',
  'onFocus',
  'onKeyDown',
  'onKeyUp',
]

const COMPONENT_PROPS = ['children', 'className', 'style']

type FilterFn = (
  props: string[],
  excludeProps: string[],
) => (prop: string, i?: number, arr?: string[]) => boolean

const validPropsFilter: FilterFn = (props: string[], excludeProps: string[] = []) => (
  prop: string,
): boolean => props.indexOf(prop) !== -1 && excludeProps.indexOf(prop) === -1

const invalidPropsFilter: FilterFn = (props: string[], excludeProps: string[] = []) => (
  prop: string,
): boolean => props.indexOf(prop) === -1 && excludeProps.indexOf(prop) === -1

interface PropsFilterOptions {
  include?: string[]
  exclude?: string[]
}

const propsFilter = (filterFn: FilterFn, validProps = FORM_CONTROL_PROPS) => {
  return function (
    props: Record<string, any>,
    options: PropsFilterOptions = {},
  ): Record<string, any> {
    options = { include: [], exclude: [], ...options }

    if (!props || Object.keys(props).length === 0) {
      return {}
    }

    const _validProps = [...validProps, ...options.include]
    const validatorFn = filterFn(_validProps, options.exclude)

    return Object.keys(props)
      .filter(validatorFn)
      .reduce((_props, prop) => {
        _props[prop] = props[prop]
        return _props
      }, {})
  }
}

export const validFormProps = propsFilter(validPropsFilter)
export const containerProps = propsFilter(invalidPropsFilter)
export const standardComponentProps = propsFilter(validPropsFilter, COMPONENT_PROPS)
