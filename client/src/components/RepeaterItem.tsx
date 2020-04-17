import React from 'react';
import { isNil } from '../core/utils/common';
import { FormControlGroup } from '../core/contracts';
import { classNames } from '../core/utils/classNames';
import { MinusIcon, PlusIcon } from './Icon';

export const RepeaterItem: React.FC<FormControlGroup> = ({
  id = '',
  className = '',
  children = null,
  legend = null,
  before = null,
  onAdd,
  onRemove,
  ...props
}) => {
  return (
    <div className={classNames('repeater-field', className)}>
      {!isNil(before) && <span className="repeater-prepend">{before}</span>}

      <div className="repeater-group">{children}</div>

      <span className="repeater-append">
        <button type="button" className="btn fab mini-fab btn-default add" onClick={onAdd}>
          <PlusIcon size="12" />
        </button>
        <button type="button" className="btn fab mini-fab btn-default remove" onClick={onRemove}>
          <MinusIcon size="12" />
        </button>
      </span>
    </div>
  );
};

export default RepeaterItem;
