import React from 'react'
import { Button, Inline } from '../../elements'

const ButtonExample = (
  <Inline space={[12, 12, 16]} style={{ textAlign: 'center' }}>
    <Button mode="outline" icon="add" text="Create" />
    <Button variant="primary" icon="pencil" text="Edit" />
  </Inline>
)
export default ButtonExample
