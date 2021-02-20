import React from 'react'
import { AppContextProps, AppProvider } from './Provider'

interface DocsProps extends AppContextProps {
  children?: React.ReactNode
  pageData?: Record<string, any>
  pageProps?: Record<string, any>
}

const Docs = ({ children = null, pageData = {}, ...pageProps }: DocsProps) => {
  return (
    <AppProvider {...pageData}>
      {React.cloneElement(React.Children.only(children as any), { ...pageData, ...pageProps })}
    </AppProvider>
  )
}

export { Docs }
