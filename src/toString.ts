import { Line, LineType, LyricExtLine, LyricLine } from './constants';

function toMMSSmmm(millisecond: number) {
  let minutes: String | number = Math.floor(millisecond / 60000);
  let seconds: String | number = Math.floor((millisecond % 60000) / 1000);
  let ms: String | number = Math.round(millisecond % 1000);

  minutes = `0${minutes}`.slice(-2);
  seconds = `0${seconds}`.slice(-2);
  ms = `000${ms}`.slice(-3);
  return `${minutes}:${seconds}.${ms}`;
}

export default function toString(lrc: Line[]) {
  const strings = lrc.map((line) => {
    if (line.type === LineType.LYRIC_ENH) {
      const lineExt = line as LyricExtLine;
      const content = [];
      content.push(`[${toMMSSmmm(lineExt.startMillisecond)}]`);
      content.push(lineExt.syllables[0].content);
      lineExt.syllables.forEach((syl, i) => {
        if (i === 0) return;
        content.push(`<${toMMSSmmm(syl.startMillisecond)}>${syl.content}`);
      });
      return content.join('');
    }
    if (line.type === LineType.LYRIC) {
      const lineN = line as LyricLine;
      return `[${toMMSSmmm(lineN.startMillisecond)}]${lineN.content}`;
    }
    return line.raw;
  });
  return strings.join('\n');
}
