# clrc [![version](https://img.shields.io/npm/v/clrc)](https://www.npmjs.com/package/clrc) [![license](https://img.shields.io/npm/l/clrc)](https://github.com/mebtte/react-lrc/blob/master/LICENSE) [![](https://img.shields.io/bundlephobia/minzip/clrc)](https://bundlephobia.com/result?p=clrc)

Parser for LRC and enhanced LRC. Here is a [playground](https://mebtte.github.io/clrc).

[2.x README](https://github.com/mebtte/clrc/blob/5c6efcbbfe08d4021e0a7d6252088c5deca428f7/README.md)

## Features

- Typescript support
- Browser & Node.js support
- Simple format and enhanced format support

## Install & Usage

```bash
npm install clrc
```

```js
import { parse } from 'clrc';

const lrc = `[ar:张叶蕾]
something wrong
[00:54.04]每一辆飞车彻夜向前开
[00:58.22]飞到了路崖边永不回来`;

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

### parseEnhanced(lrcString)

parse enhanced lrc string to array. here is a example:

```txt
[ti: Somebody to Love]
[00:00.00] <00:00.04> When <00:00.16> the <00:00.82> truth <00:01.29> is <00:01.63> found <00:03.09> to <00:03.37> be <00:05.92> lies
```

the output is:

```json
[
  {
    "lineNumber": 0,
    "raw": "[ti: Somebody to Love]",
    "type": "metadata",
    "key": "ti",
    "value": " Somebody to Love"
  },
  {
    "lineNumber": 1,
    "raw": "[00:00.00] <00:00.04> When <00:00.16> the <00:00.82> truth <00:01.29> is <00:01.63> found <00:03.09> to <00:03.37> be <00:05.92> lies ",
    "type": "enhanced_lyric",
    "startMillisecond": 0,
    "content": " <00:00.04> When <00:00.16> the <00:00.82> truth <00:01.29> is <00:01.63> found <00:03.09> to <00:03.37> be <00:05.92> lies ",
    "words": [
      {
        "index": 0,
        "raw": "<00:00.04> When ",
        "startMillisecond": 40,
        "content": " When "
      },
      {
        "index": 1,
        "raw": "<00:00.16> the ",
        "startMillisecond": 160,
        "content": " the "
      },
      {
        "index": 2,
        "raw": "<00:00.82> truth ",
        "startMillisecond": 820,
        "content": " truth "
      },
      {
        "index": 3,
        "raw": "<00:01.29> is ",
        "startMillisecond": 1290,
        "content": " is "
      },
      {
        "index": 4,
        "raw": "<00:01.63> found ",
        "startMillisecond": 1630,
        "content": " found "
      },
      {
        "index": 5,
        "raw": "<00:03.09> to ",
        "startMillisecond": 3090,
        "content": " to "
      },
      {
        "index": 6,
        "raw": "<00:03.37> be ",
        "startMillisecond": 3370,
        "content": " be "
      },
      {
        "index": 7,
        "raw": "<00:05.92> lies ",
        "startMillisecond": 5920,
        "content": " lies "
      }
    ]
  }
]
```

### LineType

types of line:

- `LineType.INVALID` means it's invalid line
- `LineType.METADATA` means it's metadata line
- `LineType.LYRIC` means it's lyric line
- `LineType.ENHANCED_LYRIC` means it's enhanced lyric line

## Contributors

<a href="https://github.com/mebtte/clrc/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=mebtte/clrc" />
</a>

## License

[MIT](./LICENSE)
