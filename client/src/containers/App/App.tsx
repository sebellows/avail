/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { AnimationEvent, useEffect, useState, SyntheticEvent, useRef } from 'react'
import styled from 'styled-components'

import { SettingsForm } from '../SettingsForm'
import { UtilitiesForm } from '../UtilitiesForm'
import { Tabs, Tab } from '../../components/Tabs'
import { Button, Dropdown, Spinner, Toast, Icon } from '../../components'

import { Logo } from '../../Logo'
import { mixin } from '../../core/style'
import { capitalize, classNames, hyphenate } from '../../core/utils'
import { AVAIL_THEME, ThemeProvider, useTheme } from '../../ThemeContext'

import '../../App.scss'
import 'react-toastify/dist/ReactToastify.css'
import { Draggable } from '../../components/Draggable'
import { AppHeader } from './AppHeader'
import { Layout } from './Layout'

const SubmitButton = styled(Button)`
  position: fixed;
  top: 90vh;
  left: calc(100vw - 5.5rem);
  ${mixin.zIndex('submitBtn')}
`

export default function App() {
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
    <ThemeProvider>
      <Layout>
        {loading && <Spinner exit={addExitClass} onAnimationEnd={handleLoad} />}

        {/* <Store> */}
        <form ref={formRef} onSubmit={handleSubmit}>
          <Tabs
            id="avail-config"
            defaultActiveTab={activeTab}
            onSelect={(target: string) => setActiveTab(target)}
          >
            <Tab id="settings" title="Global Settings">
              <SettingsForm />
            </Tab>
            <Tab id="utilities" title="Utility Class Configuration">
              <UtilitiesForm id="avail-utilities" />
            </Tab>
          </Tabs>
          <Draggable>
            <SubmitButton fab type="submit" variant="primary">
              <span className="sr-only">Submit</span>
              <Icon name="download" />
            </SubmitButton>
          </Draggable>
        </form>
      </Layout>
    </ThemeProvider>
  )
}
