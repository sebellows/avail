import React, { forwardRef, Ref } from 'react'
import { classNames } from '../../core/utils'

import { Icon } from '../Icon'
import { Button } from '../Button'
import { Styled } from './styles'
import { Switch } from '../Switch'
import { useTheme } from '../../ThemeContext'

export interface PillTabProps
  extends Avail.ComponentProps,
    Pick<React.AllHTMLAttributes<HTMLInputElement>, 'checked' | 'value'> {
  selected?: boolean
  checkboxID?: string
  onChange?: (e?: any) => void
  onSelect?: React.MouseEventHandler<HTMLButtonElement>
}

const PillTab: Avail.RefForwardingComponent<'li', PillTabProps> = forwardRef(
  (
    {
      as: Component = 'li',
      selected = false,
      checked = false,
      checkboxID,
      children,
      id,
      value,
      onChange,
      onSelect,
      ...props
    },
    ref: Ref<any>,
  ) => {
    const { theme } = useTheme()

    return (
      <Styled.Tab
        as={Component}
        id={id}
        ref={ref}
        className={classNames('pill-tab', props.className)}
        theme={theme}
      >
        <div className="pill-tab-content">
          <Switch name={checkboxID} checked={checked} value={value} onChange={onChange}>
            {children}
          </Switch>
        </div>

        <Button
          icon
          size={24}
          className="pill-tab-toggle"
          aria-controls={id}
          aria-expanded={selected}
          onClick={onSelect}
        >
          <Icon name="settings" />
        </Button>
      </Styled.Tab>
    )
  },
)

PillTab.displayName = 'PillTab'

export { PillTab }
