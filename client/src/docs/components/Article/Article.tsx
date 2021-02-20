import { Box, Container, Flex, Heading, Label, Stack, Text } from '../../../elements'
import React from 'react'
import { ArticleContent } from './ArticleContent'
// import { getHeadings, getTOCTree } from './helpers'
import { HeadingNode } from './types'
import { isPlainObject } from '../../../utils'
// import { isArray, isRecord, isString } from '$lib/types'

export function Article(props: { article: Record<string, unknown> }) {
  const { article } = props
  // const headings = useMemo(() => getHeadings(article.content), [article.content])
  // const toc = useMemo(() => getTOCTree(headings), [headings])
  const toc = []
  const layout = (isPlainObject(article.layout) ? article.layout : {}) as Record<string, unknown>

  return (
    <article>
      {isPlainObject(article) && (
        <Flex>
          <Box flex={3}>
            <Box paddingX={[3, 4, 5]} paddingY={[3, 4, 5, 5, 6, 7]}>
              <Box marginBottom={[2, 3, 4]}>
                <Container maxWidth={1}>
                  <Heading as="h1" size={[2, 2, 3, 4]}>
                    {String(article?.title)}
                  </Heading>
                </Container>
              </Box>

              <Container maxWidth={1}>
                <Stack gap={[4, 4, 5, 6]}>
                  {Array.isArray(article?.content) && (
                    <ArticleContent>{/* {children} */}</ArticleContent>
                  )}
                </Stack>
              </Container>
            </Box>
          </Box>

          <Box
            display={['none', 'none', 'none', 'block']}
            flex={1}
            style={{ minWidth: '12em', maxWidth: '16rem' }}
          >
            {!layout?.wide && toc?.length > 0 && (
              <Box padding={[3, 4, 5]} style={{ position: 'sticky', top: 0 }}>
                <Label>On this page</Label>

                <Box marginTop={[2, 3, 4]}>{/* <HeadingList headings={toc} /> */}</Box>
              </Box>
            )}
          </Box>
        </Flex>
      )}
    </article>
  )
}

function HeadingList({ headings, space = 4 }: { headings: HeadingNode[]; space?: number }) {
  return (
    <Stack gap={space}>
      {headings.map((heading) => (
        <Box key={heading.slug}>
          <Text size={2 - (heading.level - 2)}>
            <a href={`#${heading.slug}`}>{heading.text}</a>
          </Text>

          {heading.level < 3 && heading.children.length > 0 && (
            <Box marginTop={4} paddingLeft={2}>
              <HeadingList headings={heading.children} space={Math.max(heading.level + 2 - 1, 3)} />
            </Box>
          )}
        </Box>
      ))}
    </Stack>
  )
}
