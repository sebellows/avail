import { ThemeProps } from '../../theme'
import { get, toREM } from '../../utils'
import { generateStyles, GridStyleProps } from '../../styles'

export interface StackSpaceStyleProps extends Pick<GridStyleProps, '$gap'> {}

export const stackBaseStyle = () => {
  return {
    '&:not([hidden])': {
      display: 'grid',
    },
    '&[data-as="ul"],&[data-as="ol"]': {
      listStyle: 'none',
    },
    gridTemplateColumns: 'minmax(0, 1fr)',
    gridAutoRows: 'min-content',
  }
}

export const stackSpaceStyle = generateStyles<StackSpaceStyleProps & ThemeProps>(
  'gap',
  (value, i, props) => {
    const spaces = get(props, 'theme.space')
    const spaceValue = spaces[value]
    return toREM(spaceValue ?? 0)
  },
)
