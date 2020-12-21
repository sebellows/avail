import React, { forwardRef } from 'react'

import { Button } from '../Button'
import { Icon } from '../Icon'
import { classNames, isNil } from '../../core/utils'

import { StyledItem } from './styles'
import { useTheme } from '../../ThemeContext'

const RepeaterItem: Avail.RefForwardingComponent<'div', Avail.ControlGroup> = forwardRef(
  (
    {
      as: Component = 'div',
      className = '',
      children = null,
      before = null,
      onAdd,
      onRemove,
      ...props
    },
    ref,
  ) => {
    const { theme } = useTheme()

    return (
      <StyledItem.Wrapper
        {...props}
        as={Component}
        ref={ref}
        className={classNames('repeater-item', className)}
      >
        <StyledItem.Skein className="repeater-item-skein" theme={theme} />
        {!isNil(before) && (
          <StyledItem.Prepend className="repeater-item-prepend" theme={theme}>
            {before}
          </StyledItem.Prepend>
        )}

        <StyledItem.Group className="repeater-item-group" theme={theme}>
          {children}
        </StyledItem.Group>

        <StyledItem.Append className="repeater-item-append" theme={theme}>
          <Button fab variant="white" size={20} className="add" onClick={onAdd}>
            <Icon name="plus" size="12" />
          </Button>
          <Button fab variant="white" size={20} className="remove" onClick={onRemove}>
            <Icon name="minus" size="12" />
          </Button>
        </StyledItem.Append>
      </StyledItem.Wrapper>
    )
  },
)

RepeaterItem.displayName = 'RepeaterItem'

export { RepeaterItem }
