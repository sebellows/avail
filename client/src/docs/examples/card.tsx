/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Card, Stack, Text } from '../../elements'

const CardExample = (
  <Stack gap={12} style={{ textAlign: 'center' }}>
    <Card padding={16} radius={['sm', 'sm', 'md']} shadow={1}>
      <Text size={['sm', 'sm', 'md']}>
        Text with <a href="#">link</a>
      </Text>
    </Card>

    <Card padding={16} radius={['sm', 'sm', 'md']} shadow={1} variant="primary">
      <Text size={['sm', 'sm', 'md']}>
        Text with <a href="#">link</a>
      </Text>
    </Card>

    <Card padding={16} radius={['sm', 'sm', 'md']} shadow={1} variant="success">
      <Text size={['sm', 'sm', 'md']}>
        Text with <a href="#">link</a>
      </Text>
    </Card>

    <Card padding={16} radius={['sm', 'sm', 'md']} shadow={1} variant="warning">
      <Text size={['sm', 'sm', 'md']}>
        Text with <a href="#">link</a>
      </Text>
    </Card>

    <Card padding={16} radius={['sm', 'sm', 'md']} shadow={1} variant="danger">
      <Text size={['sm', 'sm', 'md']}>
        Text with <a href="#">link</a>
      </Text>
    </Card>
  </Stack>
)
export default CardExample
