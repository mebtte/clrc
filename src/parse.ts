import { LineType, Line, MetadataLine, LyricLine } from './constants';

/**
 * allow multiple time tag
 * [time][time]content
 */
const LYRIC_LINE = /^((?:\[\d+:\d+(?:\.\d+)?\])+)(.*)$/;
const METADATA_LINE = /^\[(.+?):(.*?)\]$/; // [key:value]
const LYRIC_TIME = /^(\d+):(\d+)(?:\.(\d+))?$/; // 00:00.00 or 00:00

/**
 * parse lrc string
 * @author mebtte<hi@mebtte.com>
 */
function parse<MetadataKey extends string>(lrc: string) {
  const parsedLines: Line[] = [];

  const lines = lrc.split('\n');
  for (let i = 0, { length } = lines; i < length; i += 1) {
    const raw = lines[i];

    /** lyric */
    const lyricMatch = raw.match(LYRIC_LINE);
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
        const lyricLine: LyricLine = {
          lineNumber: i,
          raw,

          type: LineType.LYRIC,
          startMillisecond:
            +minute * 60 * 1000 + +second * 1000 + centisecondNumber,
          content: lyricMatch[2],
        };
        parsedLines.push(lyricLine);
      }

      continue;
    }

    /** metadata */
    const metadataMatch = raw.match(METADATA_LINE);
    if (metadataMatch) {
      const key = metadataMatch[1] as MetadataKey;
      const value = metadataMatch[2];
      const metadataLine: MetadataLine<MetadataKey> = {
        lineNumber: i,
        raw,

        type: LineType.METADATA,
        key,
        value,
      };
      parsedLines.push(metadataLine);

      continue;
    }

    /** invalid line */
    parsedLines.push({
      lineNumber: i,
      raw,

      type: LineType.INVALID,
    });
  }

  return parsedLines;
}

export default parse;
