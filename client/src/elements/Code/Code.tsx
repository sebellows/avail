import React, { forwardRef } from 'react'
import Refractor from 'react-refractor'
import styled from 'styled-components/macro'
import { FontStyleProps, FontStyleStyleProps, fontStyle } from '../../styles'
import { codeBaseStyle } from './styles'

interface CodeProps extends FontStyleProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  language?: string
}

const codeFontStyle = fontStyle('code')

const Root = styled.pre<FontStyleStyleProps>(codeBaseStyle, codeFontStyle)

export const Code = forwardRef(
  (props: CodeProps & Omit<React.HTMLProps<HTMLElement>, 'size'>, ref) => {
    const { children, language: languageProp, size = 'sm', fontWeight, ...restProps } = props
    const language = typeof languageProp === 'string' ? languageProp : undefined
    const registered = language ? Refractor.hasLanguage(language as any) : false

    return (
      <Root data-ui="Code" {...restProps} $size={size} $fontWeight={fontWeight} ref={ref}>
        {!(language && registered) && <code>{children}</code>}
        {language && registered && (
          <Refractor inline language={language} value={String(children)} />
        )}
      </Root>
    )
  },
)

Code.displayName = 'Code'
