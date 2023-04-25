# clrc [![version](https://img.shields.io/npm/v/clrc)](https://www.npmjs.com/package/clrc) [![license](https://img.shields.io/npm/l/clrc)](https://github.com/mebtte/react-lrc/blob/master/LICENSE) [![](https://img.shields.io/bundlephobia/minzip/clrc)](https://bundlephobia.com/result?p=clrc)

LRC format parser for JavaScript/TypeScript. Here is a [playground](https://mebtte.github.io/clrc).

[2.x README](https://github.com/mebtte/clrc/blob/5c6efcbbfe08d4021e0a7d6252088c5deca428f7/README.md)

## Features

- Support [enhanced lrc](<https://en.wikipedia.org/wiki/LRC_(file_format)#Enhanced_format>)
- Typescript support
- Browser & Node.js support

## Install & Usage

```bash
npm install clrc
```

```js
import { parse } from 'clrc';

const lrc = `basking in the glow
[ar:Oso Oso]
[00:32.79][00:56.00]Little <00:33.58>jagged <00:34.14>edge<00:35.25>
[00:35.50]I'm <00:35.89>leaning <00:36.80>in <00:37.59>again<00:38.46>;

console.log(parse(lrc, {enhanced: true}));
```

The output is:

```json
[
  {
    "lineNumber": 0,
    "raw": "basking in the glow",
    "type": "invalid"
  },
  {
    "lineNumber": 1,
    "raw": "[ar:Oso Oso]",
    "type": "metadata",
    "key": "ar",
    "value": "Oso Oso"
  },
  {
    "type": "lyric_enhanced",
    "lineNumber": 2,
    "raw": "[00:32.79][00:56.00]Little <00:33.58>jagged <00:34.14>edge<00:35.25>",
    "content": "Little jagged edge",
    "startMillisecond": 32790,
    "syllables": [
      {
        "sylNumber": 0,
        "raw": "Little ",
        "startMillisecond": 32790,
        "content": "Little "
      },
      {
        "sylNumber": 1,
        "raw": "<00:33.58>jagged ",
        "startMillisecond": 33580,
        "content": "jagged "
      },
      {
        "sylNumber": 2,
        "raw": "<00:34.14>edge",
        "startMillisecond": 34140,
        "content": "edge"
      },
      {
        "sylNumber": 3,
        "raw": "<00:35.25>",
        "startMillisecond": 35250,
        "content": ""
      }
    ]
  },
  {
    "type": "lyric_enhanced",
    "lineNumber": 3,
    "raw": "[00:32.79][00:56.00]Little <00:33.58>jagged <00:34.14>edge<00:35.25>",
    "content": "Little jagged edge",
    "startMillisecond": 56000,
    "syllables": [
      {
        "sylNumber": 0,
        "raw": "Little ",
        "startMillisecond": 56000,
        "content": "Little "
      },
      {
        "sylNumber": 1,
        "raw": "<00:33.58>jagged ",
        "startMillisecond": 56790,
        "content": "jagged "
      },
      {
        "sylNumber": 2,
        "raw": "<00:34.14>edge",
        "startMillisecond": 57350,
        "content": "edge"
      },
      {
        "sylNumber": 3,
        "raw": "<00:35.25>",
        "startMillisecond": 58460,
        "content": ""
      }
    ]
  },
  {
    "type": "lyric_enhanced",
    "lineNumber": 4,
    "raw": "[00:35.50]I'm <00:35.89>leaning <00:36.80>in <00:37.59>again<00:38.46>",
    "content": "I'm leaning in again",
    "startMillisecond": 35500,
    "syllables": [
      {
        "sylNumber": 0,
        "raw": "I'm ",
        "startMillisecond": 35500,
        "content": "I'm "
      },
      {
        "sylNumber": 1,
        "raw": "<00:35.89>leaning ",
        "startMillisecond": 35890,
        "content": "leaning "
      },
      {
        "sylNumber": 2,
        "raw": "<00:36.80>in ",
        "startMillisecond": 36800,
        "content": "in "
      },
      {
        "sylNumber": 3,
        "raw": "<00:37.59>again",
        "startMillisecond": 37590,
        "content": "again"
      },
      {
        "sylNumber": 4,
        "raw": "<00:38.46>",
        "startMillisecond": 38460,
        "content": ""
      }
    ]
  }
]
```

## Reference

### parse(lrcString)

parse lrc string to Line array.

### toString(Line[])

parse Line array back into valid lrc string.

### expand(lrcString)

returns new lrc string with all repeating lyrics inserted into separate lines.

### LineType

types of line:

- `LineType.INVALID` means it's invalid line
- `LineType.LYRIC` means it's lyric line
- `LineType.METADATA` means it's metadata line
- `LineType.LYRIC_ENHANCED` means it's lyric with inline enhanced lrc tags. 

## License

[MIT](./LICENSE)
