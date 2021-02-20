import React, { useRef } from 'react'
import Prism from 'prismjs'
import { classNames } from '../../utils'
import { JsxString } from './JSXString'

const CodeBlock = ({ children, language = 'tsx', plugins = ['line-numbers'] }) => {
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
    <pre className={classNames(...plugins)}>
      <code ref={codeRef} className={`language-${language}`}>
        {JsxString(children as React.ReactElement<{}, any>)}
      </code>
    </pre>
  )
}

CodeBlock.displayName = 'CodeBlock'

export { CodeBlock }
