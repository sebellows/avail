/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import styled from 'styled-components'

import { mixin } from '../../core/style'
import { Toast } from '../../components'
import { useTheme } from '../../ThemeContext'

import { AppHeader } from './AppHeader'

import 'react-toastify/dist/ReactToastify.css'

const StyledLayout = styled.div`
  ${({ theme }) => mixin.bgColor(theme.bg)}
  ${({ theme }) => mixin.color(theme.fg)}
  position: relative;
  overflow: hidden;
`

export const Layout = ({ children }) => {
  const { activeTheme, theme } = useTheme()

  return (
    <StyledLayout className={`theme-${activeTheme}`} theme={theme}>
      <AppHeader />

      <div className="container">{children}</div>
      <Toast autoClose={5000} />
    </StyledLayout>
  )
}
