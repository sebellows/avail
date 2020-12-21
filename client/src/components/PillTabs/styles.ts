import styled from 'styled-components'
import { mixin } from '../../core/style'

/** Utility Tabs */
export const Styled = {
  Tabs: styled.ol`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
    grid-gap: 1rem;
    list-style: none;
    ${mixin.padding.all(3)}
  `,
  Tab: styled.li`
    width: 100%;
    ${mixin.flex({ align: 'center', justify: 'space-between' })}
    ${mixin.padding.all(1, 2)}
    ${({ theme }) => mixin.bgColor(theme.bg)}
    ${mixin.borderRadius('lg')}
    ${mixin.boxShadow.elevation(1)}
    ${mixin.transition({ property: 'box-shadow', duration: 'easeIn', timing: 'fastOutSlowIn' })}

    &:hover {
      ${({ theme }) => mixin.bgColor(theme.hover.bg)}
      ${mixin.boxShadow.elevation(2)}
    }

    .pill-tab-content {
      ${mixin.flex({ align: 'end' })}
    }

    .switch {
      ${mixin.margin.bottom(0)}
      ${mixin.margin.right(2)}
    }
  `,
}
