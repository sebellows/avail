import {parseColor, rgbToHex, screen as _screen, multiply as _multiply} from '../../core/style/libs'

export function multiply(bg: string, fg: string) {
  const b = parseColor(bg)
  const s = parseColor(fg)
  const hex = rgbToHex(_multiply(b, s))

  return hex
}

export function screen(bg: string, fg: string) {
  const b = parseColor(bg)
  const s = parseColor(fg)
  const hex = rgbToHex(_screen(b, s))

  return hex
}
