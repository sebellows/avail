import React from 'react'
import { Checkbox, Inline } from '../../elements'
import { FormEventWithTarget } from '../../types'

const CheckboxExample = (
  <Inline space={16} style={{ textAlign: 'center' }}>
    <Checkbox
      name="checkboxA"
      checked={true}
      onChange={(e: FormEventWithTarget) => console.log(`checkboxA is ${e.target.checked}`)}
    />
    <Checkbox
      name="checkboxB"
      checked={false}
      onChange={(e: FormEventWithTarget) => console.log(`checkboxB is ${e.target.checked}`)}
    />
    <Checkbox
      name="checkboxC"
      checked={true}
      indeterminate
      onChange={(e: FormEventWithTarget) => console.log(`checkboxB is ${e.target.checked}`)}
    />
  </Inline>
)
export default CheckboxExample
