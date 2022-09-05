# clrc [![version](https://img.shields.io/npm/v/clrc)](https://www.npmjs.com/package/clrc) [![license](https://img.shields.io/npm/l/clrc)](https://github.com/mebtte/react-lrc/blob/master/LICENSE) [![](https://img.shields.io/bundlephobia/minzip/clrc)](https://bundlephobia.com/result?p=clrc)

LRC format parser for JavaScript/TypeScript. Here is a [playground](https://mebtte.github.io/clrc).

[2.x README](https://github.com/mebtte/clrc/blob/master/README.md)

## Features

- Typescript support
- Browser & Node.js support

## Install & Usage

```bash
npm install clrc
```

```js
import { parse } from 'clrc';

const lrc = `[ar:张叶蕾]
something wrong
[00:54.04]每一辆飞车彻夜向前开
[00:58.22]飞到了路崖边永不回来
`;

console.log(parse(lrc));
```

The output is:

```json
[
  {
    "lineNumber": 0,
    "raw": "[ar:张叶蕾]",
    "type": "metadata",
    "key": "ar",
    "value": "张叶蕾"
  },
  {
    "lineNumber": 1,
    "raw": "something wrong",
    "type": "invalid"
  },
  {
    "lineNumber": 2,
    "raw": "[00:54.04]每一辆飞车彻夜向前开",
    "type": "lyric",
    "startMillisecond": 54040,
    "content": "每一辆飞车彻夜向前开"
  },
  {
    "lineNumber": 3,
    "raw": "[00:58.22]飞到了路崖边永不回来",
    "type": "lyric",
    "startMillisecond": 58220,
    "content": "飞到了路崖边永不回来"
  }
]
```

## Reference

### parse(lrcString)

parse lrc string to array.

### LineType

types of line:

- `LineType.INVALID` means it's invalid line
- `LineType.LYRIC` means it's lyric line
- `LineType.METADATA` means it's metadata line

## License

[MIT](./LICENSE)
