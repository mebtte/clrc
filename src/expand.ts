import parse from './parse';
import toString from './toString';

export default function expand(lrc: string) {
  return toString(parse(lrc));
}
