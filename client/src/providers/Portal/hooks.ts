import { useContext } from 'react'
import { PortalContext, PortalContextInterface } from './PortalContext'

export function usePortal(): PortalContextInterface {
  const portal = useContext(PortalContext)

  if (!portal) {
    throw new Error('missing portal in context')
  }

  return portal
}
