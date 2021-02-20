/* eslint-disable @typescript-eslint/no-unused-vars */
import { BaseTheme } from './types'
import { createGlobalStyle, css } from 'styled-components'
import { toREM } from '../utils/units'
import { ThemeColor, ThemeColorBase } from './colors'

function vars(themeColor: ThemeColor) {
  // Custom properties that may be used by other atoms
  const { base, card, solid, muted } = themeColor

  return css`
    --bg-color: ${base.bg};
    --fg-color: ${base.fg};
    --border-color: ${base.border};
    --focus-ring-color: ${base.focusRing};
    --primary-fg-color: ${solid.primary.active.fg};
    --primary-bg-color: ${solid.primary.active.bg};
    --primary-border-color: ${solid.primary.active.border};
    --accent-fg-color: ${solid.accent.active.fg};
    --accent-bg-color: ${solid.accent.active.bg};
    --accent-border-color: ${solid.accent.active.border};
    --muted-fg-color: ${muted.default.active.fg};
    --muted-bg-color: ${muted.default.active.bg};
    --muted-border-color: ${muted.default.active.border};
    --danger-fg-color: ${solid.danger.active.fg};
    --danger-bg-color: ${solid.danger.active.bg};
    --danger-border-color: ${solid.danger.active.border};
    --success-fg-color: ${solid.success.active.fg};
    --success-bg-color: ${solid.success.active.bg};
    --success-border-color: ${solid.success.active.border};
    --warning-fg-color: ${solid.warning.active.fg};
    --warning-bg-color: ${solid.warning.active.bg};
    --warning-border-color: ${solid.warning.active.border};
    --link-fg-color: ${base.link.fg};
    --code-fg-color: ${card.active.code.fg};
    --code-bg-color: ${card.active.code.bg};
    --code-border-color: ${card.active.code.bg};
    --shadow-outline-color: ${base.shadow.outline};
    --shadow-umbra-color: ${base.shadow.umbra};
    --shadow-penumbra-color: ${base.shadow.penumbra};
    --shadow-ambient-color: ${base.shadow.ambient};
  `
}

export const GlobalStyle = createGlobalStyle((props: { theme: BaseTheme }) => {
  const { theme } = props
  const { scheme, color, fonts, space } = theme
  console.log('scheme', scheme, color)

  return css`
    :root {
      ${vars(color)}
    }
    @media (prefers-reduced-motion: no-preference) {
      :root {
        scroll-behavior: smooth;
      }
    }
    html,
    body {
      height: 100%;
    }
    *,
    *::before,
    *::after {
      box-sizing: inherit;
    }
    body {
      margin: 0;
      font-family: ${fonts.text.family};
      font-size: ${toREM(fonts.text.sizes.md.fontSize)};
      line-height: ${fonts.text.sizes.md.lineHeight};
      color: var(--fg-color);
      background-color: var(--bg-color);
      box-sizing: border-box;
      -webkit-text-size-adjust: 100%;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }

    [tabindex='-1']:focus:not(:focus-visible) {
      outline: 0 !important;
    }

    h6,
    h5,
    h4,
    h3,
    h2,
    h1 {
      font-family: ${fonts.heading.family};
      font-weight: ${fonts.heading.weights.regular};
      line-height: 1.2;
      margin-top: 0;
      margin-bottom: 0.5rem;
    }

    p {
      margin-top: 0;
      margin-bottom: 1rem;
    }

    abbr[title],
    abbr[data-bs-original-title] {
      text-decoration: underline;
      -webkit-text-decoration: underline dotted;
      text-decoration: underline dotted;
      cursor: help;
      -webkit-text-decoration-skip-ink: none;
      text-decoration-skip-ink: none;
    }

    address {
      margin-bottom: 1rem;
      font-style: normal;
      line-height: inherit;
    }

    ol,
    ul {
      padding-left: 2rem;
    }

    ol,
    ul,
    dl {
      margin-top: 0;
      margin-bottom: 1rem;
    }

    ol ol,
    ul ul,
    ol ul,
    ul ol {
      margin-bottom: 0;
    }

    dt {
      font-weight: 700;
    }

    dd {
      margin-bottom: 0.5rem;
      margin-left: 0;
    }

    blockquote {
      margin: 0 0 1rem;
    }

    b,
    strong {
      font-weight: bolder;
    }

    small {
      font-size: 0.875em;
    }

    mark {
      padding: 0.2em;
      background-color: #fcf8e3;
    }

    sub,
    sup {
      position: relative;
      font-size: 0.75em;
      line-height: 0;
      vertical-align: baseline;
    }

    sub {
      bottom: -0.25em;
    }

    sup {
      top: -0.5em;
    }

    a {
      color: var(--link-fg-color);
      text-decoration: underline;
    }
    a:hover {
      color: var(--link-fg-color);
    }

    a:not([href]):not([class]),
    a:not([href]):not([class]):hover {
      color: inherit;
      text-decoration: none;
    }

    pre,
    code,
    kbd,
    samp {
      font-family: ${fonts.code.family};
      font-size: ${fonts.code.sizes.sm.fontSize};
      direction: ltr /* rtl:ignore */;
      unicode-bidi: bidi-override;
    }

    pre {
      display: block;
      margin-top: 0;
      margin-bottom: 1rem;
      overflow: auto;
      font-size: 0.875em;
    }
    pre code {
      font-size: inherit;
      color: inherit;
      word-break: normal;
    }

    code {
      color: var(--code-fg-color);
      word-wrap: break-word;
    }
    a > code {
      color: inherit;
    }

    kbd {
      padding: 0.2rem 0.4rem;
      font-size: 0.875em;
      color: #fff;
      background-color: #212529;
      border-radius: 0.2rem;
    }
    kbd kbd {
      padding: 0;
      font-size: 1em;
      font-weight: 700;
    }

    figure {
      margin: 0 0 1rem;
    }

    img,
    svg {
      vertical-align: middle;
    }

    table {
      caption-side: bottom;
      border-collapse: collapse;
    }

    caption {
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
      color: #6c757d;
      text-align: left;
    }

    th {
      text-align: inherit;
      text-align: -webkit-match-parent;
    }

    thead,
    tbody,
    tfoot,
    tr,
    td,
    th {
      border-color: inherit;
      border-style: solid;
      border-width: 0;
    }

    label {
      display: inline-block;
    }

    button {
      border-radius: 0;
    }

    button:focus {
      outline: dotted 1px;
      outline: -webkit-focus-ring-color auto 5px;
    }

    input,
    button,
    select,
    optgroup,
    textarea {
      margin: 0;
      font-family: inherit;
      font-size: inherit;
      line-height: inherit;
    }

    button,
    select {
      text-transform: none;
    }

    [role='button'] {
      cursor: pointer;
    }

    select {
      word-wrap: normal;
    }

    [list]::-webkit-calendar-picker-indicator {
      display: none;
    }

    button,
    [type='button'],
    [type='reset'],
    [type='submit'] {
      -webkit-appearance: button;
    }
    button:not(:disabled),
    [type='button']:not(:disabled),
    [type='reset']:not(:disabled),
    [type='submit']:not(:disabled) {
      cursor: pointer;
    }

    ::-moz-focus-inner {
      padding: 0;
      border-style: none;
    }

    textarea {
      resize: vertical;
    }

    fieldset {
      min-width: 0;
      padding: 0;
      margin: 0;
      border: 0;
    }

    legend {
      float: left;
      width: 100%;
      padding: 0;
      margin-bottom: 0.5rem;
      font-size: calc(1.275rem + 0.3vw);
      line-height: inherit;
    }
    @media (min-width: 1200px) {
      legend {
        font-size: 1.5rem;
      }
    }
    legend + * {
      clear: left;
    }

    ::-webkit-datetime-edit-fields-wrapper,
    ::-webkit-datetime-edit-text,
    ::-webkit-datetime-edit-minute,
    ::-webkit-datetime-edit-hour-field,
    ::-webkit-datetime-edit-day-field,
    ::-webkit-datetime-edit-month-field,
    ::-webkit-datetime-edit-year-field {
      padding: 0;
    }

    ::-webkit-inner-spin-button {
      height: auto;
    }

    [type='search'] {
      outline-offset: -2px;
      -webkit-appearance: textfield;
    }

    /* rtl:raw:
    [type="tel"],
    [type="url"],
    [type="email"],
    [type="number"] {
      direction: ltr;
    }
    */
    ::-webkit-search-decoration {
      -webkit-appearance: none;
    }

    ::-webkit-color-swatch-wrapper {
      padding: 0;
    }

    ::file-selector-button {
      font: inherit;
    }

    ::-webkit-file-upload-button {
      font: inherit;
      -webkit-appearance: button;
    }

    output {
      display: inline-block;
    }

    iframe {
      border: 0;
    }

    summary {
      display: list-item;
      cursor: pointer;
    }

    progress {
      vertical-align: baseline;
    }

    [hidden] {
      display: none !important;
    }
  `
})
