import React, { forwardRef, Ref } from 'react'
import { classNames } from '../../core/utils'

import { Icon } from '../Icon'

import { Styled } from './styles'
import { PillTabProps } from './props'

const PillTab = forwardRef<{}, PillTabProps>(
  (
    {
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
    return (
      <Styled.Tab id={id} ref={ref} className={classNames('pill-tab', props.className)}>
        <Styled.TabContent>
          <Styled.TabSwitch name={checkboxID} checked={checked} value={value} onChange={onChange}>
            {children}
          </Styled.TabSwitch>
        </Styled.TabContent>

        <Styled.Toggle
          icon
          size={24}
          className="pill-tab-toggle"
          onClick={onSelect}
          aria-controls={id}
          aria-expanded={selected}
        >
          <Icon name="settings" />
        </Styled.Toggle>
      </Styled.Tab>
    )
  },
)

PillTab.displayName = 'PillTab'

export { PillTab }
