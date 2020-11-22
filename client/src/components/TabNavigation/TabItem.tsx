import React, { forwardRef, Ref } from 'react'
import { useTabContext } from './useTabContext'
import { to } from './router'
import { Styled } from './styles'
import { classNames } from '../../core/utils'
import { useTheme } from '../../ThemeContext'

/**
 * Navigation controllers for the Tabs component.
 */
const TabItem = forwardRef<{}, any>(({ target, children, disabled, ...props }, ref: Ref<any>) => {
  const { theme } = useTheme()
  const { active, onSelect, tabID } = useTabContext({ target })

  function handleClick(event: any) {
    event.preventDefault()
    onSelect(target)
    to(target)
  }

  return (
    <Styled.Tab
      ref={ref}
      theme={theme}
      href={`#${target}`}
      role="tab"
      id={tabID}
      className={classNames('tab', props?.className, disabled && 'disabled')}
      aria-selected={active}
      onClick={handleClick}
    >
      {children}
    </Styled.Tab>
  )
})

TabItem.displayName = 'TabItem'

export { TabItem }
