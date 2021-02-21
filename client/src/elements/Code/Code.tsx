import React, { forwardRef, useRef } from 'react'
import Prism from 'prismjs'
import styled from 'styled-components/macro'
import { FontStyleProps, FontStyleStyleProps, fontStyle } from '../../styles'
import { codeBaseStyle } from './styles'
import { classNames } from '../../utils'
import { JsxString } from '../../providers'

interface CodeProps extends FontStyleProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  fromJsx?: boolean
  language?: string
  plugins?: string[]
}

const codeFontStyle = fontStyle('code')

const Root = styled.pre<FontStyleStyleProps>(codeBaseStyle, codeFontStyle)

export const Code = forwardRef<
  HTMLPreElement,
  CodeProps & Omit<React.HTMLProps<HTMLElement>, 'size'>
>(
  (
    {
      children,
      fromJsx = false,
      language = 'tsx',
      plugins = ['line-numbers'],
      size = 'sm',
      fontWeight,
      ...restProps
    },
    ref,
  ) => {
    const codeRef = useRef(null)

    const highlight = React.useCallback(() => {
      if (codeRef && codeRef.current !== null) {
        Prism.highlightElement(codeRef.current!)
      }
    }, [codeRef])

    React.useEffect(() => {
      highlight()
    })

    return (
      <Root
        data-ui="Code"
        {...restProps}
        className={classNames(restProps?.className, ...plugins)}
        $size={size}
        $fontWeight={fontWeight}
        ref={ref}
      >
        {fromJsx ? (
          <code ref={codeRef} className={`language-${language}`}>
            {JsxString(children as React.ReactElement<{}, any>)}
          </code>
        ) : (
          <code>{children}</code>
        )}
      </Root>
    )
  },
)

Code.displayName = 'Code'
