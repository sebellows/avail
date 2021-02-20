import React, { forwardRef } from 'react'
import styled from 'styled-components/macro'
import { GridProps as GlobalGridProps, gridStyle, GridStyleProps } from '../../styles'
import { Box, BoxProps } from '../Box'

type GridProps = Omit<BoxProps, 'display'> &
  GlobalGridProps &
  Omit<React.HTMLProps<HTMLDivElement>, 'height' | 'rows'>

const Root = styled(Box)<GridStyleProps>(gridStyle)

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  (
    {
      as: Component,
      autoRows,
      autoCols,
      autoFlow,
      columns,
      gap,
      gapX,
      gapY,
      rows,
      children,
      ...restProps
    },
    ref,
  ) => {
    console.log('Grid->rows', rows)
    return (
      <Root
        data-as={typeof Component === 'string' ? Component : undefined}
        data-ui="Grid"
        {...restProps}
        $autoRows={autoRows}
        $autoCols={autoCols}
        $autoFlow={autoFlow}
        $columns={columns}
        $gap={gap}
        $gapX={gapX}
        $gapY={gapY}
        $rows={rows}
        forwardedAs={Component}
        as={Component}
        ref={ref}
      >
        {children}
      </Root>
    )
  },
)

Grid.displayName = 'Grid'
