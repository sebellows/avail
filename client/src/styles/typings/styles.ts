/**
 * @property { string | number | Styles }  [ruleOrSelector]
 */
export type Styles = {
  [ruleOrSelector: string]: string | number | Styles
}

export type DirectionKey = 'Top' | 'Right' | 'Bottom' | 'Left' | 'X' | 'Y'
