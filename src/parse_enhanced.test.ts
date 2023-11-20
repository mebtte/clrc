import parseEnhanced from './parse_enhanced';

const lyric = `[by: lrc-maker]
[ti: Somebody to Love]

[00:00.00] <00:00.04> When <00:00.16> the <00:00.82> truth <00:01.29> is <00:01.63> found <00:03.09> to <00:03.37> be <00:05.92> lies 
[00:06.47] <00:07.67> And <00:07.94> all <00:08.36> the <00:08.63> joy <00:10.28> within <00:10.53> you <00:13.09> dies 
[00:13.34] <00:14.32> Don't <00:14.73> you <00:15.14> want <00:15.57> somebody <00:16.09> to <00:16.46> love`;
const parsedLyric = [
  {
    lineNumber: 0,
    raw: '[by: lrc-maker]',
    type: 'metadata',
    key: 'by',
    value: ' lrc-maker',
  },
  {
    lineNumber: 1,
    raw: '[ti: Somebody to Love]',
    type: 'metadata',
    key: 'ti',
    value: ' Somebody to Love',
  },
  {
    lineNumber: 2,
    raw: '',
    type: 'invalid',
  },
  {
    lineNumber: 3,
    raw: '[00:00.00] <00:00.04> When <00:00.16> the <00:00.82> truth <00:01.29> is <00:01.63> found <00:03.09> to <00:03.37> be <00:05.92> lies ',
    type: 'enhanced_lyric',
    startMillisecond: 0,
    content:
      ' <00:00.04> When <00:00.16> the <00:00.82> truth <00:01.29> is <00:01.63> found <00:03.09> to <00:03.37> be <00:05.92> lies ',
    words: [
      {
        index: 0,
        raw: '<00:00.04> When ',
        startMillisecond: 40,
        content: ' When ',
      },
      {
        index: 1,
        raw: '<00:00.16> the ',
        startMillisecond: 160,
        content: ' the ',
      },
      {
        index: 2,
        raw: '<00:00.82> truth ',
        startMillisecond: 820,
        content: ' truth ',
      },
      {
        index: 3,
        raw: '<00:01.29> is ',
        startMillisecond: 1290,
        content: ' is ',
      },
      {
        index: 4,
        raw: '<00:01.63> found ',
        startMillisecond: 1630,
        content: ' found ',
      },
      {
        index: 5,
        raw: '<00:03.09> to ',
        startMillisecond: 3090,
        content: ' to ',
      },
      {
        index: 6,
        raw: '<00:03.37> be ',
        startMillisecond: 3370,
        content: ' be ',
      },
      {
        index: 7,
        raw: '<00:05.92> lies ',
        startMillisecond: 5920,
        content: ' lies ',
      },
    ],
  },
  {
    lineNumber: 4,
    raw: '[00:06.47] <00:07.67> And <00:07.94> all <00:08.36> the <00:08.63> joy <00:10.28> within <00:10.53> you <00:13.09> dies ',
    type: 'enhanced_lyric',
    startMillisecond: 6470,
    content:
      ' <00:07.67> And <00:07.94> all <00:08.36> the <00:08.63> joy <00:10.28> within <00:10.53> you <00:13.09> dies ',
    words: [
      {
        index: 0,
        raw: '<00:07.67> And ',
        startMillisecond: 7670,
        content: ' And ',
      },
      {
        index: 1,
        raw: '<00:07.94> all ',
        startMillisecond: 7940,
        content: ' all ',
      },
      {
        index: 2,
        raw: '<00:08.36> the ',
        startMillisecond: 8360,
        content: ' the ',
      },
      {
        index: 3,
        raw: '<00:08.63> joy ',
        startMillisecond: 8630,
        content: ' joy ',
      },
      {
        index: 4,
        raw: '<00:10.28> within ',
        startMillisecond: 10280,
        content: ' within ',
      },
      {
        index: 5,
        raw: '<00:10.53> you ',
        startMillisecond: 10530,
        content: ' you ',
      },
      {
        index: 6,
        raw: '<00:13.09> dies ',
        startMillisecond: 13090,
        content: ' dies ',
      },
    ],
  },
  {
    lineNumber: 5,
    raw: "[00:13.34] <00:14.32> Don't <00:14.73> you <00:15.14> want <00:15.57> somebody <00:16.09> to <00:16.46> love",
    type: 'enhanced_lyric',
    startMillisecond: 13340,
    content:
      " <00:14.32> Don't <00:14.73> you <00:15.14> want <00:15.57> somebody <00:16.09> to <00:16.46> love",
    words: [
      {
        index: 0,
        raw: "<00:14.32> Don't ",
        startMillisecond: 14320,
        content: " Don't ",
      },
      {
        index: 1,
        raw: '<00:14.73> you ',
        startMillisecond: 14730,
        content: ' you ',
      },
      {
        index: 2,
        raw: '<00:15.14> want ',
        startMillisecond: 15140,
        content: ' want ',
      },
      {
        index: 3,
        raw: '<00:15.57> somebody ',
        startMillisecond: 15570,
        content: ' somebody ',
      },
      {
        index: 4,
        raw: '<00:16.09> to ',
        startMillisecond: 16090,
        content: ' to ',
      },
      {
        index: 5,
        raw: '<00:16.46> love',
        startMillisecond: 16460,
        content: ' love',
      },
    ],
  },
];

describe('parseEnhanced', () => {
  test('parse enhanced without error', () => {
    expect(parseEnhanced(lyric)).toEqual(parsedLyric);
  });
});
