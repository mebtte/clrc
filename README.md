# clrc [![version](https://img.shields.io/npm/v/clrc)](https://www.npmjs.com/package/clrc) [![license](https://img.shields.io/npm/l/clrc)](https://github.com/mebtte/react-lrc/blob/master/LICENSE)

LRC format parser for JavaScript/TypeScript.

## [Playground](https://mebtte.github.io/clrc)

## Features

- Typescript support
- Browser & Node.js support
- Metadata support
- Multiple time tag `[time1][time2][time3]content` support

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
      "lineNumber": 0,
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
      "lineNumber": 2,
      "startMillisecond": 54040,
      "content": "每一辆飞车彻夜向前开",
      "raw": "[00:54.04]每一辆飞车彻夜向前开"
    },
    {
      "lineNumber": 3,
      "startMillisecond": 58220,
      "content": "飞到了路崖边永不回来",
      "raw": "[00:58.22]飞到了路崖边永不回来"
    }
  ],
  "invalidLines": [
    {
      "lineNumber": 1,
      "raw": "invalid line"
    },
    {
      "lineNumber": 4,
      "raw": ""
    }
  ]
}
```

## APIs

### parse(lrcString[, options])

`parse` used for parsing lrc string to object.

#### Options

- `sortByStartTime` whether to sort lyrics by start time

## Typescript support

### Working with generic

```ts
// function parse support metadata generic
parse<{ ar: string; by?: string }>(lrc);
```

### Export useful type

```ts
import { LrcLine, MetadataLine, LyricLine } from 'clrc';
```

## License

[MIT](./LICENSE)
