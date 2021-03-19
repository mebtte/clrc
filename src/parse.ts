import { LrcLine, MetadataLine, LyricLine } from './constants';

/**
 * allow multiple time tag
 * [time][time]content
 */
export const LYRIC_LINE = /^((?:\[\d+:\d+(?:\.\d+)?\])+)(.*)$/;
export const METADATA_LINE = /^\[(.+?):(.*?)\]$/; // [key:value]

const LYRIC_TIME_PART_SEPARATOR = /(?<=\])(?=\[)/; // ][
const LYRIC_TIME = /\[(\d+):(\d+)(?:\.(\d+))?\]/; // [00:00.00] or [00:00]

/**
 * parse lrc string
 * @author mebtte<hi@mebtte.com>
 */
function parse<Metadata extends { [key: string]: string }>(
  lrc: string,
  {
    sortByStartTime = false,
  }: {
    /** whether to sort lyrics by start time */
    sortByStartTime?: boolean;
  } = {}
) {
  const metadatas: MetadataLine[] = [];
  // @ts-ignore
  const metadata: Metadata = {};

  let lyrics: LyricLine[] = [];
  const invalidLines: LrcLine[] = [];

  const lines = lrc.split('\n');
  for (let i = 0, { length } = lines; i < length; i += 1) {
    const line = lines[i];

    /** lyric */
    const lyricMatch = line.match(LYRIC_LINE);
    if (lyricMatch) {
      const timesPart = lyricMatch[1]; // [time][time]content --> [time][time]
      const times = timesPart.split(LYRIC_TIME_PART_SEPARATOR); // [time1][time2] --> [time1], [time2]
      for (const time of times) {
        const timeMatch = time.match(LYRIC_TIME);
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
          raw: line,
        });
      }

      continue;
    }

    /** metadata */
    const metadataMatch = line.match(METADATA_LINE);
    if (metadataMatch) {
      const key = metadataMatch[1];
      const value = metadataMatch[2];
      metadatas.push({
        lineNumber: i,
        key,
        value,
        raw: line,
      });
      // @ts-ignore
      metadata[key] = value;

      continue;
    }

    /** invalid line */
    invalidLines.push({
      lineNumber: i,
      raw: line,
    });
  }

  if (sortByStartTime) {
    lyrics = lyrics.sort((a, b) => a.startMillisecond - b.startMillisecond);
  }

  return {
    metadatas,
    metadata,

    lyrics,
    invalidLines,
  };
}

export default parse;
