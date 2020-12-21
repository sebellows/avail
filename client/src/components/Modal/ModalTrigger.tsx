import React, { forwardRef } from 'react'

interface ModalTriggerProps extends Avail.ComponentProps {
  children: any
  [key: string]: any
}

const ModalTrigger = forwardRef<HTMLButtonElement, ModalTriggerProps>(
  ({ children, ...props }, ref) => {
    return (
      <>
        {React.cloneElement(children, {
          ref: ref,
          ...props,
        })}
      </>
    )
  },
)

ModalTrigger.displayName = 'ModalTrigger'

export { ModalTrigger }
