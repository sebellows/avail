import React from 'react'

const ArticleContent = ({ children, ...props }: Avail.PropsWithChildren) => {
  return (
    <>
      {React.Children.map(children, (child: any, i: number) => {
        return React.cloneElement(child, {
          ...child.props,
          ...props,
        })
      })}
    </>
  )
}

ArticleContent.displayName = 'ArticleContent'

export { ArticleContent }
