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
import { classNames } from './core/utils'

const ThemeContext = React.createContext('light')

const SubmitButton = styled(Button)`
  position: fixed;
  top: 90vh;
  right: ${toREM(spacers.base * 2)};
  z-index: ${zIndexes.submitBtn};
`

export default function App() {
  const [theme, setTheme] = useState('light')
  const [activeTab, setActiveTab] = useState('settings')
  const [loading, setLoading] = useState(false)
  const [addExitClass, setExitClass] = useState(false)

  const formRef = useRef(null)

  useEffect(() => {
    if (loading) {
      const fadeSpinner = setTimeout(() => {
        setExitClass(true)
      }, 2000)
      return () => clearTimeout(fadeSpinner)
    }
  }, [loading])

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

  return (
    <ThemeContext.Provider value={theme}>
      <div
        id="App"
        className={classNames(`theme-${theme}`)}
        style={{
          position: 'relative',
          overflow: 'hidden',
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

          <Switch value={theme} onChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
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
