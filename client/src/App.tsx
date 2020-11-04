/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { AnimationEvent, useEffect, useState, SyntheticEvent, useRef } from 'react'
import styled from 'styled-components'

// import { Store } from './store'
import { zIndexes, spacers, toREM } from './core/style'
import { SettingsForm } from './containers/SettingsForm'
import { UtilitiesForm } from './containers/UtilitiesForm'
import { Button, Spinner, Tabs, Tab, Toast, Icon, Switch } from './components'

import './App.scss'
import 'react-toastify/dist/ReactToastify.css'
import { Logo } from './Logo'
import { capitalize, classNames } from './core/utils'
import { AVAIL_THEME, ThemeContext } from './ThemeContext'
import { usePrevious } from './hooks'

const SubmitButton = styled(Button)`
  position: fixed;
  top: 90vh;
  right: ${toREM(spacers.base * 2)};
  z-index: ${zIndexes.submitBtn};
`

export default function App() {
  const [theme, setTheme] = useState('light')
  const [themeColors, setThemeColors] = useState(AVAIL_THEME.get(theme))
  const [activeTab, setActiveTab] = useState('settings')
  const [loading, setLoading] = useState(false)
  const [addExitClass, setExitClass] = useState(false)
  const [themeMenuOpen, setThemeMenuOpen] = useState(false)

  const formRef = useRef(null)
  const activeTheme = useRef('light')

  useEffect(() => {
    if (loading) {
      const fadeSpinner = setTimeout(() => {
        setExitClass(true)
      }, 2000)
      return () => clearTimeout(fadeSpinner)
    }
  }, [loading])

  useEffect(() => {
    if (activeTheme.current !== theme) {
      activeTheme.current = theme
    }
  }, [theme])

  function handleLoad(event: AnimationEvent) {
    event.persist()
    setLoading(false)
    setExitClass(false)
  }

  function handleSubmit(event: SyntheticEvent) {
    event.preventDefault()
    event.persist()
    const values = Object.values(formRef.current).reduce((obj, field: any) => {
      obj[field.name] = field.value
      return obj
    }, {})
    console.log('submitted', values)
  }

  function invertTheme() {
    const next = activeTheme.current !== 'light' ? 'light' : 'dark'
    setTheme(next)
    setThemeColors(AVAIL_THEME.get(next))
  }

  function selectTheme(selected: string) {
    setTheme(selected)
    setThemeColors(AVAIL_THEME.get(selected))
  }

  return (
    <ThemeContext.Provider value={themeColors}>
      <div
        id="App"
        className={classNames(`theme-${theme}`)}
        style={{
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: themeColors.bg,
          color: themeColors.fg,
        }}
      >
        <header className="container">
          <div className="hgroup">
            <h1>
              <Logo width={40} />
              <span>Avail</span>
            </h1>

            <h2>CSS Utility Class Generator</h2>
          </div>

          <div className="position-relative">
            <Button icon onClick={() => setThemeMenuOpen(!themeMenuOpen)}>
              <Icon name="bucket" />
            </Button>
            <div className={classNames('dropdown-menu', { 'd-none': !themeMenuOpen })}>
              {Array.from(AVAIL_THEME.keys()).map((key) => (
                <Button key={key} onClick={() => selectTheme(key)}>
                  {key
                    .split('-')
                    .map((k) => capitalize(k))
                    .join(' ')}
                </Button>
              ))}
            </div>
          </div>

          <Switch value={theme} onChange={() => invertTheme()}>
            Mode
          </Switch>
        </header>

        <div className="container">
          {loading && <Spinner exit={addExitClass} onAnimationEnd={handleLoad} />}

          {/* <Store> */}
          <form ref={formRef} onSubmit={handleSubmit}>
            <Tabs
              id="avail-config"
              activeKey={activeTab}
              onSelect={(target: string) => setActiveTab(target)}
            >
              <Tab target="settings" title="Global Settings">
                <SettingsForm />
              </Tab>
              <Tab target="utilities" title="Utility Class Configuration">
                <UtilitiesForm id="avail-utilities" />
              </Tab>
            </Tabs>
            <SubmitButton fab type="submit" variant="primary">
              <span className="sr-only">Submit</span>
              <Icon name="download" />
            </SubmitButton>
          </form>
          {/* </Store> */}
          <Toast autoClose={5000} />
        </div>
      </div>
    </ThemeContext.Provider>
  )
}
