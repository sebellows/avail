/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { forwardRef, Ref } from 'react'
import { classNames } from '../../core/utils'
import { Styled } from './styles'
import { DialogProps } from './props'
import { DialogHeader } from './DialogHeader'
import { toPX } from '../../core/style'
import { useTheme } from '../../ThemeContext'

const noopEvent = (event: React.SyntheticEvent) => {}

const Dialog = forwardRef<{}, DialogProps>(
  ({ className, size, title, onClose = noopEvent, children }, ref: Ref<any>) => {
    const { theme } = useTheme()

    return (
      <Styled.Wrapper
        ref={ref}
        role="document"
        className={classNames('dialog', className)}
        style={{ maxWidth: size ? toPX(size) : 'auto' }}
      >
        <Styled.Content theme={theme} className="dialog-content">
          <DialogHeader onClose={onClose}>{title}</DialogHeader>
          <Styled.Body className="dialog-body">
            <div className="dialog-body-inner">{children}</div>
          </Styled.Body>
        </Styled.Content>
      </Styled.Wrapper>
    )
  },
)

Dialog.displayName = 'Dialog'

export { Dialog, DialogHeader }
