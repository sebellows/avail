/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { forwardRef, useEffect, useRef } from 'react'
import { ESCAPE, isNil, listen, noScroll } from '../../core/utils'
import {
  useEnsuredRef,
  useEventCallback,
  useFirstMountState,
  useLifecycles,
  usePrevious,
} from '../../hooks'
import { ModalTrigger } from './ModalTrigger'
import { ModalContent } from './ModalContent'

function ignoreSiblings(siblings: NodeList | string[], fn: (el: HTMLElement) => void) {
  if (siblings && siblings.length) {
    siblings.forEach((selector: string | Node) => {
      if (typeof selector == 'string') {
        const el = document.querySelector(selector) as HTMLElement
        fn(el)
      } else {
        fn(selector as HTMLElement)
      }
    })
  }
}

interface ModalProps extends Avail.ComponentProps {
  show?: boolean
  onClose?: (e?: any) => void
  onShow?: (e?: any) => void
  onClickPrev?: (e?: any) => void
  onClickNext?: (e?: any) => void
}

const Modal: Avail.RefForwardingComponent<'div', ModalProps> = forwardRef(
  (
    {
      as: Component = 'div',
      ariaLabel,
      children,
      className = '',
      ignore = ['#root'],
      role = 'dialog',
      show = false,
      trigger,
      onClose = null,
      onShow = null,
      onKeyUp,
      onClickPrev,
      onClickNext,
    },
    ref,
  ) => {
    const isFirstMount = useFirstMountState()

    const modalRef = useEnsuredRef<HTMLDivElement>(ref)

    const prevShow = usePrevious(show)

    const removeKeyDownListenerRef = useRef(null)

    const handleShow = useEventCallback(() => {
      setTimeout(() => {
        ignoreSiblings(ignore, (el) => el.setAttribute('aria-hidden', 'true'))
      })

      removeKeyDownListenerRef.current = listen(document.documentElement, 'keydown', handleKeyUp)

      onShow?.()

      noScroll.on()
    })

    const handleClose = useEventCallback((msg?: string) => {
      onClose?.()
      console.log('Modal->handleClose', `msg: ${msg}`)

      setTimeout(() => {
        ignoreSiblings(ignore, (el) => el.removeAttribute('aria-hidden'))
        noScroll.off()
      })
    })

    useLifecycles(
      () => {
        if (show) {
          handleShow()
        }
      },
      () => {
        const closeout = setTimeout(() => {
          if (!prevShow) {
            handleClose('Modal Unmounting and closing')
          }
        })
        clearTimeout(closeout)
      },
    )

    useEffect(() => {
      if (!isFirstMount && !isNil(prevShow) && prevShow !== show) {
        // console.log('Modal->useEffect->show', show)
        show ? handleShow() : handleClose()
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFirstMount, show, handleClose, handleShow])

    const handleKeyUp = (event: any) => {
      if (event.keyCode === ESCAPE) {
        handleClose('Modal->handleKeyUp->escape')
      } else {
        onKeyUp?.(event)
      }
    }

    return (
      <>
        {trigger && <ModalTrigger>{trigger}</ModalTrigger>}
        {show && (
          <ModalContent
            as={Component}
            ref={modalRef}
            role={role}
            {...{ className, ariaLabel, onKeyUp: handleKeyUp, onClickNext, onClickPrev }}
          >
            {children}
          </ModalContent>
        )}
      </>
    )
  },
)

Modal.displayName = 'Modal'

export { Modal }
