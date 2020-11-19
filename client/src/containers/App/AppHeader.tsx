/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import styled from 'styled-components'
import { Logo } from '../../Logo'
import { Button, Dropdown, Icon } from '../../components'
import { mixin } from '../../core/style'
import { useTheme } from '../../ThemeContext'
import { hyphenate } from '../../core/utils'

const StyledHeader = styled.header`
  ${({ theme }) => mixin.bgColor(theme.primary)}
  ${({ theme }) => mixin.color(mixin.invert(theme.primary))}
  ${mixin.grid.row}
  ${mixin.flex({ align: 'flex-end', justify: 'space-between' })}
  ${mixin.margin.x(0)}
  ${mixin.padding.all('base')}

  .hgroup {
    flex: 2;
  }
  .hmenu {
    flex: 1;
    text-align: right;
  }
`

const AppHeader = () => {
  const { setActiveTheme, setTheme, theme, themes, themeNames } = useTheme()

  function selectTheme(selected: string) {
    selected = hyphenate(selected)
    setActiveTheme(selected)

    const newTheme = themes.get(selected)

    if (newTheme) {
      setTheme(newTheme)
    }
  }

  function handleDropdownClick(e: any) {
    console.log('handleDropdownClick')
  }

  return (
    <StyledHeader theme={theme} className="app-header">
      <div className="hgroup">
        <h1>
          <Logo width={40} />
          <span>Avail</span>
        </h1>

        <h2>CSS Utility Class Generator</h2>
      </div>

      <div className="hmenu">
        <Dropdown items={Object.values(themeNames)} onSelect={selectTheme}>
          <Button icon onClick={handleDropdownClick}>
            <Icon name="bucket" />
          </Button>
        </Dropdown>
      </div>
    </StyledHeader>
  )
}

AppHeader.displayName = AppHeader

export { AppHeader }
