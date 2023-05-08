import { LineType, MetadataLine, LyricLine, InvalidLine } from './constants';
import { timestampToMillsecond } from './utils';

const LYRIC_LINE = /^((?:\[\d{2,}:\d{2}(?:\.\d{2,3})?\])+)(.*)$/; // [time]content | [time][time][...]content
const METADATA_LINE = /^\[(.+?):(.*?)\]$/; // [key:value]

/**
 * parse lrc string
 * @author mebtte<hi@mebtte.com>
 */
function parse<MetadataKey extends string>(lrc: string) {
  const parsedLines: (InvalidLine | MetadataLine<MetadataKey> | LyricLine)[] =
    [];

  const lines = lrc.split('\n');
  for (let i = 0, { length } = lines; i < length; i += 1) {
    const raw = lines[i];

    /** lyric */
    const lyricMatch = raw.match(LYRIC_LINE);
    if (lyricMatch) {
      const timesPart = lyricMatch[1]; // [time][time]content --> [time][time]
      const times = timesPart.split(']['); // [time1][time2] --> [time1 | time2]
      for (const time of times) {
        const lyricLine: LyricLine = {
          lineNumber: i,
          raw,

          type: LineType.LYRIC,
          startMillisecond: timestampToMillsecond(time.replace(/[[\]]/g, '')),
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
