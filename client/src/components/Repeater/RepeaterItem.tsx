import React, { forwardRef, Ref } from 'react';
import { classNames, isNil } from '../../core/utils';
import { MinusIcon, PlusIcon } from '../Icon';
import { FormArrayProps } from './props';
import { StyledItem } from './styles';

const RepeaterItem = forwardRef<{}, FormArrayProps>(
  (
    {
      id = '',
      className = '',
      children = null,
      legend = null,
      before = null,
      onAdd,
      onRemove,
      ...props
    },
    ref: Ref<any>,
  ) => {
    return (
      <StyledItem.Wrapper ref={ref} className={classNames('form-array-item', className)}>
        {!isNil(before) && (
          <StyledItem.Prepend className="form-array-item-prepend">{before}</StyledItem.Prepend>
        )}

        <StyledItem.Group className="form-array-item-group">{children}</StyledItem.Group>

        <StyledItem.Append className="form-array-item-append">
          <button type="button" className="btn fab mini-fab btn-default add" onClick={onAdd}>
            <PlusIcon size="12" />
          </button>
          <button type="button" className="btn fab mini-fab btn-default remove" onClick={onRemove}>
            <MinusIcon size="12" />
          </button>
        </StyledItem.Append>
      </StyledItem.Wrapper>
    );
  },
);

RepeaterItem.displayName = 'RepeaterItem';

export { RepeaterItem };
