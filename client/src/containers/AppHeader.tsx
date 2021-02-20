import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Card, Flex, Inline, Select, Text } from '../elements'
import { useRootTheme } from '../theme'
import { Logo } from './partials/Logo'

// const CardLink = ({ children }) => <Card as="a">{children}</Card>

const AppHeader = () => {
  const { theme, scheme, setScheme } = useRootTheme()

  function selectTheme(e: any) {
    console.log('selectTheme', e.target.value)
    const selectedTheme = e.target.value
    if (scheme !== selectedTheme) {
      setScheme(selectedTheme)
    }
  }

  return (
    <Card
      as="header"
      borderBottom
      paddingY={[8, 12, 16]}
      paddingLeft={[12, 16, 20]}
      paddingRight={[8, 12, 16]}
    >
      <Flex as="nav" align="center">
        <Box flex={1}>
          <Flex align="center">
            <Flex align="center" flex={1}>
              <Inline as="a" space={2}>
                <Logo width={40} />
                <Text
                  size={['sm', 'sm', 'lg']}
                  fontWeight="bold"
                  style={{ color: 'var(--card-fg-color' }}
                >
                  Avail
                </Text>
              </Inline>
            </Flex>

            <Inline space={4}>
              <Text size="sm">
                <Link to="/docs">DOCS</Link>
              </Text>
              <Select
                fontSize={['sm', 'sm', 'md', 'lg']}
                padding={[8, 8, 12]}
                defaultValue={scheme}
                onChange={selectTheme}
              >
                {Object.keys(theme.color).map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </Select>
            </Inline>
          </Flex>
        </Box>
      </Flex>
    </Card>
  )
}

AppHeader.displayName = 'AppHeader'

export { AppHeader }
