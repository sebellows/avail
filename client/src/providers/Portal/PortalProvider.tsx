import React from 'react'
import { PortalContext } from './PortalContext'

interface PortalProviderProps {
  boundaryElement?: HTMLElement | null
  children: React.ReactNode
  element: HTMLElement | null
}

const __BROWSER__ = typeof window !== 'undefined'

export function PortalProvider(props: PortalProviderProps) {
  return (
    <PortalContext.Provider
      value={{
        boundaryElement: props.boundaryElement || null,
        element: props.element || (__BROWSER__ && document.body) || null,
      }}
    >
      {props.children}
    </PortalContext.Provider>
  )
}
