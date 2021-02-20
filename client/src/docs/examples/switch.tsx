import React from 'react'
import { Inline, Switch } from '../../elements'
import { FormEventWithTarget } from '../../types'

let value = 'a'
const setValue = (val: string) => {
  value = val
}

const SwitchExample = (
  <Inline space={[12, 12, 16]} style={{ textAlign: 'center' }}>
    <Switch
      name="switchA"
      value="a"
      checked={value === 'a'}
      onChange={(e: FormEventWithTarget) => setValue(e.target.value)}
    />
    <Switch
      name="switchA"
      value="b"
      checked={value === 'b'}
      onChange={(e: FormEventWithTarget) => setValue(e.target.value)}
    />
    <Switch
      name="switchA"
      value="c"
      checked={value === 'c'}
      onChange={(e: FormEventWithTarget) => setValue(e.target.value)}
    />
  </Inline>
)
export default SwitchExample
