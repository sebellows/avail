import React, { forwardRef } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

import { mixin } from '../../core/style'
import { useTheme } from '../../ThemeContext'
import { BaseTabProps } from './shared'

export interface TabProps extends BaseTabProps {
  tabClassName?: string
}

export const Tab = (props: TabProps) => null

export interface TabItemProps extends BaseTabProps {
  active?: boolean
  onSelect?: (id: string, index: number, event: any) => void
}

const StyledItem = styled(motion.button)<TabItemProps>`
  border: 0;
  display: block;
  flex: 1;
  text-align: center;
  text-decoration: none;
  text-size-adjust: none;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  -webkit-appearance: none;
  ${({ theme }) => mixin.color(theme.fg)}
  ${({ theme }) => mixin.bgColor(theme.bg)}
  ${mixin.padding.all(2, 3)}
  ${mixin.transition({ property: 'background-color', duration: 'easeIn', timing: 'easeIn' })}
  &:hover,
  &[aria-selected='true'] {
    text-decoration: none;
    ${({ theme }) => mixin.color(theme.hover.fg)}
    ${({ theme }) => mixin.bgColor(theme.hover.bg)}
  }
  &:focus {
    outline: none;
  }
`

const TabItem: Avail.RefForwardingComponent<'button', TabItemProps> = forwardRef(
  (props: TabItemProps, ref) => {
    const { theme } = useTheme()

    return (
      <StyledItem
        ref={ref}
        {...props}
        type="button"
        theme={theme}
        aria-selected={!!props?.active}
      />
    )
  },
)

TabItem.displayName = 'TabItem'

export { TabItem }
