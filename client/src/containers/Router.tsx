/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { NavItem } from './types'

const Router = ({ items }: Pick<NavItem, 'items'>) => {
  const renderComponent = (
    props,
    { component: Component, items: childRoutes, ...route }: NavItem,
  ) => {
    const { match } = props

    return (
      <>
        {match && (
          <Component {...props} route={route} routes={childRoutes}>
            {childRoutes && childRoutes.length > 0 && (
              <>
                {childRoutes.map((childRoute: NavItem, index: number) =>
                  renderRoute(childRoute, index),
                )}
              </>
            )}
          </Component>
        )}
      </>
    )
  }

  const renderRoute = (route: NavItem, index: number) => {
    if (route.redirect) {
      return (
        <Route key={index} exact={route.exact} path={route.path}>
          <Redirect to={route.redirect} />
        </Route>
      )
    }

    return (
      <Route key={index} {...route}>
        {(props) => {
          return renderComponent(props, route as NavItem)
        }}
      </Route>
    )
  }

  return (
    <React.Suspense fallback={<p>Loading...</p>}>
      <Switch>{items.map((route, index) => renderRoute(route, index))}</Switch>
    </React.Suspense>
  )
}

export { Router }
