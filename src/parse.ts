import {
  LineType,
  Line,
  MetadataLine,
  LyricLine,
  Syllable,
  LyricExtLine,
  Options,
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
const LYRIC_EXT_INNER = /((?:<\d+:\d+(?:\.\d+)?>)+)/g; // <LYRIC_TIME>

function tagToTime(str: string) {
  return toMillisecond(str.replaceAll(/[<>[\]]/g, '').match(LYRIC_TIME));
}

/**
 * parse lrc string
 * @author mebtte<hi@mebtte.com>
 */
function parse<MetadataKey extends string>(
  lrc: string,
  { enhanced = false }: Options = {}
) {
  const parsedLines: Line[] = [];

  const lines = lrc.split('\n');
  for (let index = 0, { length } = lines; index < length; index += 1) {
    const raw = lines[index];

    /** lyric */
    const lyricMatch = raw.match(LYRIC_LINE);
    if (raw.match(LYRIC_LINE)) {
      const timesPart = lyricMatch[1]; // [time][time]content --> [time][time]
      const times = timesPart.split(']['); // [time1][time2] --> [time1 | time2]

      let startLyric: string;
      let strippedExt: string;
      let offsets: number[];
      let extParts: RegExpMatchArray[];

      if (enhanced) {
        startLyric = lyricMatch[2].match(/^[^<]*/)[0];
        extParts = [...lyricMatch[2].matchAll(LYRIC_EXT_TIME)];

        strippedExt = lyricMatch[2].replace(LYRIC_EXT_INNER, '');

        const startOffset = tagToTime(times[0]);
        offsets = extParts.map(
          (extPart) => tagToTime(extPart[1]) - startOffset
        );
      }

      for (const time of times) {
        const tagStart = tagToTime(time);
        if (enhanced) {
          const syllables = [
            {
              sylNumber: 0,
              raw: startLyric,
              startMillisecond: tagStart,
              content: startLyric,
            },
          ];
          syllables.push(
            ...extParts.map(
              (extPart, ind: number) =>
                ({
                  sylNumber: ind + 1,
                  raw: extPart[0],
                  startMillisecond: tagStart + offsets[ind],
                  content: extPart[2],
                } as Syllable)
            )
          );
          parsedLines.push({
            type: LineType.LYRIC_ENHANCED,
            lineNumber: parsedLines.length,
            raw,
            content: strippedExt,
            startMillisecond: tagStart,
            syllables,
          } as LyricExtLine);
        } else {
          parsedLines.push({
            type: LineType.LYRIC,
            lineNumber: parsedLines.length,
            raw,
            content: lyricMatch[2],
            startMillisecond: tagStart,
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
        lineNumber: parsedLines.length,
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
      lineNumber: parsedLines.length,
      raw,
      type: LineType.INVALID,
    });
  }
  return parsedLines;
}

export default parse;
