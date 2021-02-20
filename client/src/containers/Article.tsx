/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { CodeBlock } from '../components/CodeBlock'
import { useFirstMountState, usePrevious } from '../hooks'
import { capitalize } from '../utils'
import { loadable } from './loadable'

interface ArticleProps extends React.PropsWithChildren<{}> {
  page: Record<string, any>
}

const Select = (
  <div>
    <select name="swedish-cars" id="swedish-cars" className="Select form-control">
      <option>Saab</option>
      <option>Volvo</option>
    </select>
  </div>
)

const defaultPage = {
  title: 'Select',
  description: 'The Select component provides control of options.',
  code: Select,
}

const examples = ['badge', 'box', 'button', 'card', 'checkbox', 'radio', 'select', 'switch']
const exampleResolver = (loc: string) => {
  if (examples.includes(loc)) {
    return loadable(() => import('../docs/examples/badge'))
  }
  return null
}

const Article = ({ children = null, page = defaultPage }: ArticleProps) => {
  const [example, setExample] = useState(null)
  const [title, setTitle] = useState(null)
  const location = useLocation()
  const isFirstMount = useFirstMountState()
  const prevLocation = usePrevious(location)

  useEffect(() => {
    if (!isFirstMount && prevLocation !== location) {
      const paths = location.pathname.split('/')
      const componentName = paths[paths.length - 1]
      const Component = exampleResolver(componentName)
      setExample(Component)
      setTitle(capitalize(componentName))
    }
  }, [location])

  return (
    <div data-ui="Container" className="Container mx-auto p-5">
      <div data-ui="Box" className="Box mb-3">
        <h1 data-ui="Heading" className="Heading h1">
          {title}
        </h1>
      </div>
      <div data-ui="Container" className="Container w-100 mx-auto p-0">
        <div data-ui="Stack" className="Stack">
          <div data-ui="Box" className="Box my-3">
            <div data-ui="Box" className="Text lead m-0">
              Description should go here.
            </div>
          </div>
          <div data-ui="Box" className="Box my-3">
            <div
              data-ui="Card"
              className="Card bg-white text-body shadow-sm rounded-sm position-relative"
            >
              <div data-ui="Card" className="Card bg-white text-body rounded-0 border-bottom">
                <div
                  data-ui="Card"
                  className="Card bg-light text-body rounded-0 p-4 h-100 overflow-auto"
                >
                  {example}
                </div>
              </div>

              <div
                data-ui="Card"
                className="Card bg-white text-body shadow-sm rounded-sm position-relative"
              >
                <div data-ui="Card" className="Card bg-white text-body rounded-0 border-bottom">
                  <div
                    data-ui="Card"
                    className="Card bg-white text-body rounded-0 p-4 h-100 overflow-auto"
                  >
                    <CodeBlock>{example}</CodeBlock>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Article
