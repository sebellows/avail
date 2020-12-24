import { screen as _screen, multiply as _multiply, Color } from '../../core/style/libs'

export function multiply(bg: string, fg: string) {
  const b = Color(bg).string()
  const s = Color(fg).string()
  const hex = Color(_multiply(b, s)).hex()

  return hex
}

export function screen(bg: string, fg: string): string {
  const b = Color(bg).string()
  const s = Color(fg).string()
  const hex = Color(_screen(b, s)).hex()

  return hex
}
