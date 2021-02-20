import { toREM } from '../../utils'
import { generateStyles } from '../../styles/utils'

export const inlineBaseStyle = () => {
  return {
    lineHeight: 0,

    '&:not([hidden])': {
      display: 'block',
    },

    '& > div': {
      display: 'inline-block',
      verticalAlign: 'middle',
    },
  }
}

export const inlineSpaceStyle = generateStyles('space', (spaceValue, i, props) => {
  const { space: spaces } = props.theme
  const value = spaces[spaces.indexOf(spaceValue)]
  const space = value !== -1 ? toREM(value) : 0

  return {
    margin: `-${space} 0 0 -${space}`,
    '& > div': { padding: `${space} 0 0 ${space}` },
  }
})
