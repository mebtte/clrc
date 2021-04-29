# clrc [![version](https://img.shields.io/npm/v/clrc)](https://www.npmjs.com/package/clrc) [![license](https://img.shields.io/npm/l/clrc)](https://github.com/mebtte/react-lrc/blob/master/LICENSE) [![](https://img.shields.io/bundlephobia/minzip/clrc)](https://bundlephobia.com/result?p=clrc)

LRC format parser for JavaScript/TypeScript.

## [Playground](https://mebtte.github.io/clrc)

## Features

- Typescript support
- Browser & Node.js support

## Install & Usage

```bash
npm i clrc --save
```

```js
import { parse } from 'clrc';

const lrc = `
[ar:张叶蕾]
invalid line
[00:54.04]每一辆飞车彻夜向前开
[00:58.22]飞到了路崖边永不回来
`;

console.log(parse(lrc));
```

The output is:

```json
{
  "metadatas": [
    {
      "lineNumber": 1,
      "key": "ar",
      "value": "张叶蕾",
      "raw": "[ar:张叶蕾]"
    }
  ],
  "metadata": {
    "ar": "张叶蕾"
  },
  "lyrics": [
    {
      "lineNumber": 3,
      "startMillisecond": 54040,
      "content": "每一辆飞车彻夜向前开",
      "raw": "[00:54.04]每一辆飞车彻夜向前开"
    },
    {
      "lineNumber": 4,
      "startMillisecond": 58220,
      "content": "飞到了路崖边永不回来",
      "raw": "[00:58.22]飞到了路崖边永不回来"
    }
  ],
  "invalidLines": [
    {
      "lineNumber": 0,
      "raw": ""
    },
    {
      "lineNumber": 2,
      "raw": "invalid line"
    },
    {
      "lineNumber": 5,
      "raw": ""
    }
  ]
}
```

## APIs

### parse(lrcString[, options])

`parse` used for parsing lrc string to object.

#### Options

- `sortByStartTime` whether to sort lyrics by start time, default `false`
- `trimStart` whether to remove start spaces, default `true`
- `trimEnd` whether to remove end spaces, default `false`

## Typescript support

### Working with generic

```ts
parse<'ar' | 'by'>(lrc);
// metadata is { ar?: string, by?: string }
```

### Export useful type

```ts
import { LrcLine, MetadataLine, LyricLine, ParseOptions } from 'clrc';
```

## License

[MIT](./LICENSE)
