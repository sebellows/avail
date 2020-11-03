import styled from 'styled-components'
import { color, mixin, radius, shadow, transition } from '../../core/style'
import { Switch } from '../Switch'
import { Button } from '../Button'

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
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${mixin.padding.all(1, 2)}
    width: 100%;
    background-color: ${color.bg.body};
    border-radius: ${radius.lg};
    // ${mixin.shadow(0, 1)}
    box-shadow: ${shadow.elevation(1)};
    transition: box-shadow ${transition.duration.easeIn} ${transition.timing.fastOutSlowIn};

    &:hover {
      background-color: ${color.bg.light};
      // ${mixin.shadow(2, 3)}
      box-shadow: ${shadow.elevation(2)};
    }
  `,
  TabContent: styled.div`
    display: flex;
    align-items: flex-end;
  `,
  TabSwitch: styled(Switch)`
    ${mixin.margin.bottom(0)}
    ${mixin.margin.right(2)}
  `,
  Toggle: styled(Button)`
    &:hover,
    &:focus {
      color: ${color.magenta};
      outline: none;
    }
  `,
}
