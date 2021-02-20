import React from 'react'
import { NavLink } from 'react-router-dom'
import { classNames } from '../utils'
import { APP_ROUTES } from './Routes'
import { NavItem, NavMenuLink } from './types'

const Dashboard = ({ children, ...props }: React.PropsWithChildren<{}>) => {
  const [drawerOpen, toggleDrawer] = React.useState(true)

  return (
    <div id="dashboard" className={classNames({ 'sidebar-hidden': !drawerOpen })}>
      <header className="app-header">
        <ul className="nav">
          <li className="nav-item">
            <button type="button" className="btn" onClick={() => toggleDrawer(!drawerOpen)}>
              ❮
            </button>
          </li>
          <li className="nav-item">
            <NavLink to={(APP_ROUTES.home as NavMenuLink).path} className="nav-link">
              {(APP_ROUTES.home as NavMenuLink).title}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={(APP_ROUTES.docs as NavItem).path} className="nav-link">
              {APP_ROUTES.docs.title}
            </NavLink>
          </li>
        </ul>
      </header>

      <aside
        className={classNames('app-sidebar', 'border-right', {
          show: drawerOpen,
          hide: !drawerOpen,
        })}
      >
        <ul className="nav flex-column">
          {APP_ROUTES.docs.items.map((item, i) => (
            <li key={item.id} className="nav-item">
              <NavLink to={item.path} className="nav-link text-reset">
                {item.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </aside>

      <main id="main" className="main">
        <div className="main-content">{children}</div>
      </main>
    </div>
  )
}

export { Dashboard }
