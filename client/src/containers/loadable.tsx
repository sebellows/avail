import React from 'react'

export const loadable = (importFunc, { fallback = null } = { fallback: null }) => {
  const LazyComponent = React.lazy(importFunc)

  return (props) => (
    <React.Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </React.Suspense>
  )
}
