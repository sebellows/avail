import React from 'react';
import { classNames } from '../core/utils/classNames';

export interface FeedbackProps {
  className?: string;
  type: string;
  children?: any;
  [key: string]: any;
}

export const Feedback: React.FC<FeedbackProps> = ({ className, children, type, ...props }) => (
  <small className={classNames(props.className, type && `${type}-feedback`)} {...props}>
    {children}
  </small>
);
