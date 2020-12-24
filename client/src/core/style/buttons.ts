import { css } from 'styled-components'
import { Color } from './libs'
import { color } from './colors'

export const buttonVariant = (value: string) => {
  const bg = Color(value)
  const borderColor = Color(value)
  const textColor = Color(value).isDark() ? Color(color.white) : Color(color.dark)

  return css`
    background-color: ${bg.string()};
    border: 1px solid ${borderColor.string()};
    color: ${textColor.string()};
    text-decoration: none;
    &:hover,
    &:focus {
      background-color: ${bg.darken(0.2).string()};
      border-color: ${borderColor.darken(0.2).string()};
      color: ${textColor.string()};
      text-decoration: none;
    }
    &:disabled {
      background-color: ${bg.alpha(0.8).desaturate(0.3).string()};
      border-color: transparent;
      color: ${textColor.alpha(0.8).string()};
      outline: none;
      pointer-events: none;
    }
  `
}
