export const SPACE = 32;
export const ENTER = 13;
export const ESCAPE = 27;
export const LEFT = 37;
export const UP = 38;
export const RIGHT = 39;
export const DOWN = 40;
export const PAGEUP = 33;
export const PAGEDOWN = 34;
export const HOME = 36;
export const END = 35;
export const TAB = 9;
export const SHIFT = 16;
export const CTRL = 17;
export const BACKSPACE = 8;
export const ALT = 18;
export const PAUSE = 19;
export const BREAK = 19;
export const INSERT = 45;
export const INS = 45;
export const DELETE = 46;
export const F7 = 118;
export const PERIOD = 190;
export const META = 91; // WIN_KEY_LEFT
export const MAC_META = 224;

export const isNumberKey = (key: number): boolean => {
  return (key > 47 && key < 58) || (key > 95 && key < 106);
};

export const isArrowKey = (key: number): boolean => {
  return [UP, DOWN, LEFT, RIGHT].includes(key);
};
