# @levistrauss/color

Levis color palette and color scheme generator.

```sh
yarn add @levistrauss/color
```

<!-- [![npm version](https://img.shields.io/npm/v/@levistrauss/color.svg?style=flat-square)](https://www.npmjs.com/package/@levistrauss/color) -->

## Usage

This package comes with prebuilt `palette.ts` and `brand.ts` files which can be imported directly.

`palette.ts` consists of several common spot colors that come in 11 different tints

```js
import { palette, brand } from '@levistrauss/color';

const green = palette.green['500'];
const lightGreen = palette.green['100'];
const darkGreen = palette.green['900'];

const levisRed = brand.levisRed['500'];
const denim = brand.denim['500'];
```

Individual colors can also be imported, as well:

```js
import { blue, gray } from '@levistrauss/color';
```

### Tints

When you access a tint, you actually get back an object that is defined by a `title` and a `hex` property. To use the color value, you need to use the `hex` key:

```js
const blueMedium = palette.blue['700'].hex;

console.log(blueMedium); //=> #1B4E9E
```

The way the tints break down is simple:

```sh
50  --> Lightest
100
150
200
300
400
500 --> Mid-Level/Normal/Default
600
700
800
900
950 --> Darkest
```

### Brand Colors

The available brand related colors are currently only `denim` (dark blue/indigo) and `levisRed`.

### Spot Colors

Available spot colors are:

- gray
- yellow
- orange
- red
- magenta
- purple
- blue
- cyan
- teal

### Constants

There are also simple constants available for pure black and white.

````js
import { black, white } from '@levistrauss/color';

console.log(black.title);
// "Black"
console.log(black.hex);
// "#000000"

Other available constants are shown below:

```js
import { BRAND_HUES, COLOR_PALETTE, COLOR_TINTS } from '@levistrauss/color';

console.log(BRAND_HUES);
// ["levisRed", "denim"]

console.log(COLOR_PALETTE);
// ["gray", "blue", "purple", "magenta", "red", "orange", "yellow", "green", "cyan", "teal", "indigo"]

console.log(COLOR_TINTS);
// ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"]
````

### Building a local color palette

To create a local version of the color palette instead of importing the default one from the package, you can use the command `generate-palette` (or `generate-brand` to add brand colors).

```sh
generate-palette --srcFile my-colors.json --outDir src/colors --fileName my-palette.ts
```

Additional colors need to be in a `.json` file and follow the below schema:

```json
{
  "hotpink": {
    "title": "HotPink",
    "darkest": "#000",
    "mid": "#FF69B4",
    "lightest": "#FFF",
    "midPoint": 500
  }
}
```

## Development

```sh
yarn dev
```

Open `http://localhost:1234` to see color palette with live reloading. Click a color to copy its hex value.

## License

MIT-licensed. See LICENSE.
