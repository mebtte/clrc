import {
  LrcLine,
  MetadataLine,
  LyricLine,
  ParseOptions,
  DEFAULT_OPTIONS,
  LyricLineWithSecondLrc,
} from './constants';

/**
 * allow multiple time tag
 * [time][time]content
 */
const LYRIC_LINE = /^((?:\[\d+:\d+(?:\.\d+)?\])+)(.*)$/;
const METADATA_LINE = /^\[(.+?):(.*?)\]$/; // [key:value]

const LYRIC_TIME = /^(\d+):(\d+)(?:\.(\d+))?$/; // 00:00.00 or 00:00
const SPACE_START = /^\s+/;
const SPACE_END = /\s+$/;

/**
 * parse lrc string
 * @author mebtte<hi@mebtte.com>
 */
function parse<MetadataKey extends string>(
  lrc: string,
  {
    sortByStartTime = DEFAULT_OPTIONS.sortByStartTime,
    trimStart = DEFAULT_OPTIONS.trimStart,
    trimEnd = DEFAULT_OPTIONS.trimEnd,
    combineSameTimeLrc = DEFAULT_OPTIONS.combineSameTimeLrc,
  }: ParseOptions = {}
) {
  const metadatas: MetadataLine<MetadataKey>[] = [];
  // @ts-ignore
  const metadata: {
    [key in MetadataKey]?: string;
  } = {};

  let lyrics: LyricLine[] = [];
  let arrayContentLyrics: LyricLineWithSecondLrc[] = [];
  const invalidLines: LrcLine[] = [];

  const lines = lrc.split('\n');
  for (let i = 0, { length } = lines; i < length; i += 1) {
    const raw = lines[i];

    let line = raw;
    if (trimStart) {
      line = line.replace(SPACE_START, '');
    }
    if (trimEnd) {
      line = line.replace(SPACE_END, '');
    }

    /** lyric */
    const lyricMatch = line.match(LYRIC_LINE);
    if (lyricMatch) {
      const timesPart = lyricMatch[1]; // [time][time]content --> [time][time]
      const times = timesPart.split(']['); // [time1][time2] --> [time1 | time2]
      for (const time of times) {
        const timeMatch = time.replace(/(\[|\])/g, '').match(LYRIC_TIME);
        const minute = timeMatch[1];
        const second = timeMatch[2];
        const centisecond = timeMatch[3] || '00'; // compatible with [00:00]
        const centisecondNumber =
          centisecond.length === 3 ? +centisecond : +centisecond * 10; // // compatible with [00:00.000]

        lyrics.push({
          lineNumber: i,
          startMillisecond:
            +minute * 60 * 1000 + +second * 1000 + centisecondNumber,
          content: lyricMatch[2],
          raw,
        });
        arrayContentLyrics.push({
          lineNumber: i,
          startMillisecond:
            +minute * 60 * 1000 + +second * 1000 + centisecondNumber,
          content: [lyricMatch[2]],
          raw,
        });
      }

      continue;
    }

    /** metadata */
    const metadataMatch = line.match(METADATA_LINE);
    if (metadataMatch) {
      const key = metadataMatch[1] as MetadataKey;
      const value = metadataMatch[2];
      metadatas.push({
        lineNumber: i,
        key,
        value,
        raw,
      });
      // @ts-ignore
      metadata[key] = value;

      continue;
    }

    /** invalid line */
    invalidLines.push({
      lineNumber: i,
      raw,
    });
  }

  if (sortByStartTime) {
    lyrics = lyrics.sort((a, b) => a.startMillisecond - b.startMillisecond);
  }

  /** must sort array by time before combine */
  arrayContentLyrics = arrayContentLyrics.sort(
    (a, b) => a.startMillisecond - b.startMillisecond
  );

  let i = 0;
  while (i < arrayContentLyrics.length - 1) {
    const firstLrc = arrayContentLyrics[i];
      const secondLrc = arrayContentLyrics[i + 1];
    if (firstLrc.startMillisecond === secondLrc.startMillisecond) {
      firstLrc.content = [...firstLrc.content, ...secondLrc.content];
      arrayContentLyrics.splice(i + 1, 1);
      i -= 1;
    }
    i += 1;
  }

  return {
    metadatas,
    metadata,

    lyrics: combineSameTimeLrc ? arrayContentLyrics : lyrics,
    invalidLines,
  };
}

export default parse;
