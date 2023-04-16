import {
  LineType,
  Line,
  MetadataLine,
  LyricLine,
  Syllable,
  LyricExtLine,
} from './constants';

function toMillisecond(timeMatch: RegExpMatchArray) {
  const minute = timeMatch[1];
  const second = timeMatch[2];
  const centisecond = timeMatch[3] || '00'; // compatible with [00:00]
  const centisecondNumber =
    centisecond.length === 3 ? +centisecond : +centisecond * 10; // // compatible with [00:00.000]
  return +minute * 60 * 1000 + +second * 1000 + centisecondNumber;
}

/**
 * allow multiple time tag
 * [time][time]content
 */
const LYRIC_LINE = /^((?:\[\d+:\d+(?:\.\d+)?\])+)(.*)$/; // [LYRIC_TIME]content
const METADATA_LINE = /^\[(.+?):(.*?)\]$/; // [key:value]
const LYRIC_TIME = /^(\d+):(\d+)(?:\.(\d+))?$/; // 00:00.00 or 00:00
const LYRIC_EXT_TIME = /((?:<\d+:\d+(?:\.\d+)?>)+)([^<]*)/g; // <LYRIC_TIME>content

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
        const startMill = toMillisecond(timeMatch);
        const extParts = [...lyricMatch[2].matchAll(LYRIC_EXT_TIME)];
        if (extParts.length) {
          const startLyric = lyricMatch[2].match(/^([^<]*)/)[0];
          const syllables = extParts
            .filter((extPart) => extPart[2].length)
            .map((extPart, ind) => {
              const extTimeMatch = extPart[1]
                .replace(/(<|>)/g, '')
                .match(LYRIC_TIME);
              const sylStartMill = toMillisecond(extTimeMatch);
              const syllable: Syllable = {
                sylNumber: ind + 1,
                raw: extPart[0],
                startMillisecond: sylStartMill,
                content: extPart[2],
              };
              return syllable;
            });
          syllables.splice(0, 0, {
            sylNumber: 0,
            raw: startLyric,
            startMillisecond: startMill,
            content: startLyric,
          });
          parsedLines.push({
            type: LineType.LYRIC,
            lineNumber: i,
            raw,
            startMillisecond: startMill,
            content: lyricMatch[2],
            syllables,
          } as LyricExtLine);
          break;
        } else {
          parsedLines.push({
            type: LineType.LYRIC,
            lineNumber: i,
            raw,
            startMillisecond: startMill,
            content: lyricMatch[2],
          } as LyricLine);
        }
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
