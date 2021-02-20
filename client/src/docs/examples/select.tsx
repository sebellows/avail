import React from 'react'
import { Grid, Select } from '../../elements'

const SelectExample = (
  <Grid>
    <Select fontSize={['sm', 'sm', 'md', 'lg']} padding={[12, 12, 16]}>
      <optgroup label="Swedish cars">
        <option>Saab</option>
        <option>Volvo</option>
      </optgroup>

      <optgroup label="Norwegian cars">
        <option>Buddy</option>
        <option>Think</option>
      </optgroup>
    </Select>
  </Grid>
)
export default SelectExample
