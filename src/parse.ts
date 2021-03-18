import { MetadataLine, LyricLine, InvalidLine } from './constants';

export const METADATA_LINE = /^\[.+?:.*?\]$/; // [key:value]
/**
 * allow multiple time tag
 * [time][time]content
 */
export const LYRIC_LINE = /^(\[\d+:\d+\.\d+\])+.*$/;

const METADATA_KEY = /(?<=^\[).+?(?=:)/; // [key:value] --> key
const METADATA_VALUE = /(?<=:).*(?=\]$)/; // [key:value] --> value
const LYRIC_TIMES_PART = /^(\[\d+:\d+\.\d+\])+/; // [time][time]content --> [time][time]
const LYRIC_TIME = /(?<=\[).+?(?=\])/g; // [time1][time2] --> [time1, time2]

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
  const metadatas: MetadataLine<Metadata, keyof Metadata>[] = [];
  const metadata: Partial<Metadata> = {};

  let lyrics: LyricLine[] = [];
  const invalidLines: InvalidLine[] = [];

  const lines = lrc.split('\n');
  for (let i = 0, { length } = lines; i < length; i += 1) {
    const line = lines[i];
    /** metadata */
    if (METADATA_LINE.test(line)) {
      const key = line.match(METADATA_KEY)[0] as keyof Metadata; // [key:value] --> key
      const value = line.match(METADATA_VALUE)[0] as Metadata[typeof key]; // [key:value] --> value
      metadatas.push({
        lineNumber: i,
        key,
        value,
        raw: line,
      });
      metadata[key] = value;
    } /** lyric */ else if (LYRIC_LINE.test(line)) {
      const timesPart = line.match(LYRIC_TIMES_PART)[0]; // [time][time]content --> [time][time]
      const content = line.replace(timesPart, ''); // [time][time]content --> content
      const times = timesPart.match(LYRIC_TIME); // [time1][time2] --> [time1, time2]
      for (const time of times) {
        const [minute, secondAndCentisecond] = time.split(':');
        const [second, centisecond] = secondAndCentisecond.split('.');
        lyrics.push({
          lineNumber: i,
          startMillisecond:
            +minute * 60 * 1000 + +second * 1000 + +centisecond * 100,
          content,
          raw: line,
        });
      }
    } /** invalid line */ else {
      invalidLines.push({
        lineNumber: i,
        raw: line,
      });
    }
  }

  if (sortByStartTime) {
    lyrics = lyrics.sort((a, b) => a.startMillisecond - b.startMillisecond);
  }

  return {
    metadatas,
    metadata: metadata as Metadata,

    lyrics,
    invalidLines,
  };
}

export default parse;
