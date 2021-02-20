import React from 'react'
import { Inline, Radio } from '../../elements'
import { FormEventWithTarget } from '../../types'

let value = 'a'
const setValue = (val: string) => {
  value = val
}

const RadioExample = (
  <Inline as="fieldset" space={16} style={{ textAlign: 'center' }}>
    <Radio
      name="radioTest"
      value="a"
      checked={value === 'a'}
      onChange={(e: FormEventWithTarget) => setValue(e.target.value)}
    />
    <Radio
      name="radioTest"
      value="b"
      checked={value === 'b'}
      onChange={(e: FormEventWithTarget) => setValue(e.target.value)}
    />
    <Radio
      name="radioTest"
      value="c"
      checked={value === 'c'}
      onChange={(e: FormEventWithTarget) => setValue(e.target.value)}
    />
  </Inline>
)
export default RadioExample
