import parse from './parse';

const lyric = `[ar:张叶蕾]
something wrong
[00:54.04]每一辆飞车彻夜向前开
[00:58.22]飞到了路崖边永不回来`;
const parsedLyric = [
  {
    lineNumber: 0,
    raw: '[ar:张叶蕾]',
    type: 'metadata',
    key: 'ar',
    value: '张叶蕾',
  },
  {
    lineNumber: 1,
    raw: 'something wrong',
    type: 'invalid',
  },
  {
    lineNumber: 2,
    raw: '[00:54.04]每一辆飞车彻夜向前开',
    type: 'lyric',
    startMillisecond: 54040,
    content: '每一辆飞车彻夜向前开',
  },
  {
    lineNumber: 3,
    raw: '[00:58.22]飞到了路崖边永不回来',
    type: 'lyric',
    startMillisecond: 58220,
    content: '飞到了路崖边永不回来',
  },
];

describe('parse', () => {
  test('parse without error', () => {
    expect(parse(lyric)).toEqual(parsedLyric);
  });
});
