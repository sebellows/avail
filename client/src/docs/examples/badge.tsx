import React from 'react'
import { Badge, Inline, Stack } from '../../elements'

const BadgeExample = (
  <Stack gap={12} style={{ textAlign: 'center' }}>
    <Inline space={8}>
      <Badge>Label</Badge>
      <Badge variant="primary">Label</Badge>
      <Badge variant="success">Label</Badge>
      <Badge variant="warning">Label</Badge>
      <Badge variant="danger">Label</Badge>
    </Inline>

    <Inline space={8}>
      <Badge mode="outline">Label</Badge>
      <Badge mode="outline" variant="primary">
        Label
      </Badge>
      <Badge mode="outline" variant="success">
        Label
      </Badge>
      <Badge mode="outline" variant="warning">
        Label
      </Badge>
      <Badge mode="outline" variant="danger">
        Label
      </Badge>
    </Inline>
  </Stack>
)

export default BadgeExample
