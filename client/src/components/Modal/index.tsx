/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { forwardRef, Ref, useEffect, useState, useRef } from 'react'
import { ESCAPE, listen, noScroll } from '../../core/utils'
import { useEventCallback } from '../../hooks/useEventCallback'
import { useWillUnmount } from '../../hooks/useWillUnmount'
import { ModalTrigger } from './ModalTrigger'
import { ModalContent } from './ModalContent'
import { useFirstMountState } from '../../hooks'
import { usePrevious } from '../../hooks/usePrevious'

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

const Modal = forwardRef<{}, any>(
  (
    {
      ariaLabel,
      children,
      className = '',
      ignore = ['#root'],
      role = 'dialog',
      show = false,
      trigger,
      onClose = null,
      onShow = null,
      onKeyUp = (event: any) => {},
      onClickPrev = (event: any) => {},
      onClickNext = (event: any) => {},
    },
    ref: Ref<any>,
  ) => {
    // const [exited, setExited] = useState(!show)

    const isFirstMount = useFirstMountState()

    const focalRef = useRef(null)
    const prevShow = usePrevious(show)
    const removeKeyDownListenerRef = useRef(null)

    const handleShow = useEventCallback(() => {
      setTimeout(() => {
        ignoreSiblings(ignore, (el) => el.setAttribute('aria-hidden', 'true'))
      })

      removeKeyDownListenerRef.current = listen(document.documentElement, 'keydown', handleKeyUp)

      onShow?.()

      noScroll.on()

      // setExited(false)
    })

    const handleClose = useEventCallback((msg?: string) => {
      onClose?.()
      console.log('Modal->handleClose', `msg: ${msg}`)

      setTimeout(() => {
        ignoreSiblings(ignore, (el) => el.removeAttribute('aria-hidden'))
        noScroll.off()
        // prevShow.current = true
      })
    })

    useEffect(() => {
      document.body.addEventListener('close', (e?: any) => {
        console.log('Modal->addListener', e)
      })

      return function unmount() {
        document.body.removeEventListener('close', (e?: any) => {
          console.log('Modal->removeListener', e)
        })
      }
    }, [])

    useEffect(() => {
      console.log('Modal->show?', show)
      if (!isFirstMount && !show) {
        handleClose()
      } else if (show) {
        handleShow()
      }

      // return () => handleClose('Modal->useEffect->handleShow');
    }, [isFirstMount, show, handleClose, handleShow])

    // useEffect(() => {
    //   const { current: wasShown } = prevShow
    //   if (!exited || (exited && wasShown)) return

    //   handleClose('Modal->useEffect->handleClose')
    // }, [exited, handleClose, prevShow])

    useWillUnmount(() => {
      // setExited(true)
      const closeout = setTimeout(() => {
        if (!prevShow) {
          handleClose('Modal->useWillUnmount->prevShow.current')
        }
      })
      clearTimeout(closeout)
    })

    const handleKeyUp = (event: any) => {
      // console.log('Modal->handleKeyUp called', event.keyCode, `ESCAPE = ${ESCAPE}`);
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
            ref={ref}
            focalRef={focalRef}
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
