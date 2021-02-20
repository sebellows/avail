/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import '../App.css'

// import { GlobalStyle, rootTheme, ThemeProvider } from '../theme'
import {
  Badge,
  Button,
  Card,
  Container,
  Grid,
  Heading,
  Inline,
  Radio,
  Select,
  Stack,
  Switch,
} from '../elements'
// import { AppHeader } from './AppHeader'
import { Checkbox } from '../elements/Checkbox'

const initialForm = {
  checkboxA: true,
  checkboxB: false,
  checkboxC: true,
  radioTest: 'a',
  switchA: true,
  switchB: false,
  switchC: false,
}

function Home() {
  const [form, updateForm] = React.useState(initialForm)

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    updateForm({
      ...form,
      [e.target.name]: e.target.type === 'radio' ? e.target.value : e.target.checked,
    })
  }

  return (
    <div className="container-fluid">
      <Container maxWidth="sm">
        <Stack gap={8}>
          <Heading textAlign="center">Styled Properties</Heading>
          <Card
            border="base"
            padding={8}
            radius={{ 0: 'sm', sm: 'md', lg: 'lg' }}
            shadow={4}
            flex={1}
          >
            <h1>Hello</h1>
            <Button variant="primary" icon="add" text="Submit" />
          </Card>

          <Grid rows={2}>
            <Heading as="h2" textAlign="center">
              Select
            </Heading>
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

          <Grid rows={3} gap={[4, 8]} style={{ textAlign: 'center' }}>
            <Heading as="h2">Badges</Heading>
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
          </Grid>

          <Grid rows={2} gap={[4, 8]} style={{ textAlign: 'center' }}>
            <Heading as="h3">Checkbox</Heading>
            <Inline space={16}>
              <Checkbox name="checkboxA" checked={form.checkboxA} onChange={handleOnChange} />
              <Checkbox name="checkboxB" checked={form.checkboxB} onChange={handleOnChange} />
              <Checkbox
                name="checkboxC"
                checked={form.checkboxC}
                indeterminate
                onChange={handleOnChange}
              />
            </Inline>
          </Grid>

          <Grid rows={2} gap={[4, 8]} style={{ textAlign: 'center' }}>
            <Heading as="h3" textAlign="center">
              Radio
            </Heading>
            <Inline space={16} style={{ textAlign: 'center' }}>
              <Radio
                checked={form.radioTest === 'a'}
                name="radioTest"
                value="a"
                onChange={handleOnChange}
              />
              <Radio
                checked={form.radioTest === 'b'}
                name="radioTest"
                value="b"
                onChange={handleOnChange}
              />
              <Radio
                checked={form.radioTest === 'c'}
                name="radioTest"
                value="c"
                onChange={handleOnChange}
              />
            </Inline>
          </Grid>

          <Grid gap={[4, 8]} style={{ textAlign: 'center' }}>
            <Heading as="h3" textAlign="center">
              Switch
            </Heading>
            <Inline space={16} style={{ textAlign: 'center' }}>
              <Switch name="switchA" checked={form.switchA} value="a" onChange={handleOnChange} />
              <Switch name="switchB" checked={form.switchB} value="b" onChange={handleOnChange} />
              <Switch name="switchC" checked={form.switchC} value="c" onChange={handleOnChange} />
            </Inline>
          </Grid>
        </Stack>
      </Container>
    </div>
  )
}

export default Home
