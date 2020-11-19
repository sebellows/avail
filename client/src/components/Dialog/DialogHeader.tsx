import React, { forwardRef, Ref, useRef } from 'react'
import { Icon } from '../Icon'
import { classNames } from '../../core/utils'
import { Styled } from './styles'
import { DialogHeaderProps } from './props'
import { useTheme } from '../../ThemeContext'

const DialogHeader = forwardRef<{}, DialogHeaderProps>(
  ({ className = null, children, onClose }, ref: Ref<any>) => {
    const { theme } = useTheme()
    const buttonRef = useRef(null)

    function handleClick(event: React.SyntheticEvent) {
      event.preventDefault()
      onClose(event)
    }

    const headerContent =
      typeof children == 'string' ? <h3 className="dialog-title">{children}</h3> : children

    return (
      <Styled.Header ref={ref} theme={theme} className={classNames('dialog-header', className)}>
        {headerContent}
        <Styled.Close
          ref={buttonRef}
          type="button"
          theme={theme}
          className="close"
          aria-label="Close"
          onClick={handleClick}
        >
          <span className="sr-only">Close</span>
          <Icon name="close" aria-hidden="true" />
        </Styled.Close>
      </Styled.Header>
    )
  },
)

DialogHeader.displayName = 'DialogHeader'

export { DialogHeader }
