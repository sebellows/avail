import React, { forwardRef, Ref } from 'react'

import { Button } from '../Button'
import { Icon } from '../Icon'
import { classNames, isNil } from '../../core/utils'
import { FormGroupProps } from '../../core/contracts'

import { StyledItem } from './styles'
import { useTheme } from '../../ThemeContext'

const RepeaterItem = forwardRef<{}, FormGroupProps>(
  (
    {
      id = '',
      className = '',
      children = null,
      first = false,
      legend = null,
      before = null,
      onAdd,
      onRemove,
    },
    ref: Ref<any>,
  ) => {
    const theme = useTheme()

    return (
      <StyledItem.Wrapper
        ref={ref}
        className={classNames('repeater-item', className, { 'is-first': first })}
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
