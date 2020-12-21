import styled from 'styled-components'
import { mixin, zIndexes, color, radius } from '../../core/style'

export const Styled = {
  Wrapper: styled.div`
    margin: 1.75rem auto;
    position: relative;
    width: auto;
  `,
  Close: styled.button`
    border: none;
    padding: 0.1875rem;
    ${mixin.inlineFlexCenter}
    ${mixin.size('2rem')}
    ${({ theme }) => mixin.bgColor(theme.bg)}
    ${({ theme }) => mixin.color(theme.fg)}
    ${mixin.borderRadius('circle')}
    opacity: 0.5;
    filter: drop-shadow(0 0 0 ${color.bg.body});
    ${mixin.transition({ duration: 'easeIn', timing: 'easeIn' }, 'opacity', 'filter')}
    ${mixin.appearanceNone}

    &:hover {
      opacity: 0.75;
    }
    &:focus {
      outline: none;
      ${mixin.dropShadow(0, 1)}
    }
  `,
  Content: styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    ${({ theme }) => mixin.bgColor(theme.bg)}
    background-clip: padding-box;
    ${mixin.borderRadius('lg')}
    ${mixin.boxShadow.elevation(2)};
    outline: 0;
    pointer-events: auto;
    z-index: ${zIndexes.dialog};
  `,
  Header: styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid ${({ theme }) => theme.borderColor};
    border-top-left-radius: calc(${radius.base} - 1px);
    border-top-right-radius: calc(${radius.base} - 1px);
  `,
  Body: styled.div`
    position: relative;
    flex: 1 1 auto;
    ${mixin.padding.all(3, 4)}
  `,
  Footer: styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-end;
    padding: 0.75rem;
    border-bottom: 1px solid ${({ theme }) => theme.borderColor};
    border-bottom-right-radius: calc(${radius.base} - 1px);
    border-bottom-left-radius: calc(${radius.base} - 1px);
  `,
}
