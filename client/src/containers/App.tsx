import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { APP_ROUTES } from './Routes'
import { Router } from './Router'
import { NavItem } from './types'
import { Layout } from './Layout'
// import 'bootstrap/dist/css/bootstrap.css'

const routes = Object.values(APP_ROUTES)
  .map((section) => {
    return Array.isArray(section) ? section : [section]
  })
  .reduce<NavItem[]>((acc: NavItem[], section) => {
    acc = [...acc, ...(section as NavItem[])]
    return acc
  }, [])
console.log('routes', routes)

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Router items={routes} />
      </Layout>
    </BrowserRouter>
  )
}
