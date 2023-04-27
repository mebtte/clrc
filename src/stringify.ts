import { Line } from './constants';

function stringify(lines: Line[]) {
  const usedLineNumber: { [key: number]: true } = {};
  return lines
    .filter((line) => {
      if (usedLineNumber[line.lineNumber]) {
        return false;
      }
      usedLineNumber[line.lineNumber] = true;
      return true;
    })
    .map((line) => line.raw)
    .join('\n');
}

export default stringify;
