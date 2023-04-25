// eslint-disable-next-line no-shadow
export enum LineType {
  INVALID = 'invalid',
  METADATA = 'metadata',
  LYRIC = 'lyric',
  LYRIC_ENHANCED = 'lyric_enhanced',
}

export interface Line {
  lineNumber: number;
  raw: string;
  type: LineType;
}

export interface MetadataLine<MetadataKey extends string> extends Line {
  type: LineType.METADATA;
  key: MetadataKey;
  value: string;
}

export interface LyricLine extends Line {
  type: LineType.LYRIC;
  startMillisecond: number;
  content: string;
}

export interface InvalidLine extends Line {
  type: LineType.INVALID;
}

export interface Syllable {
  sylNumber: number;
  raw: string;
  startMillisecond: number;
  content: string;
}

export interface LyricExtLine extends Line {
  type: LineType.LYRIC_ENHANCED;
  startMillisecond: number;
  content: string;
  syllables: Syllable[];
}

export interface Options {
  /**
   * @default false
   * @description whether to parse syllables or words as separate objects.
   * @see {@link https://en.wikipedia.org/wiki/LRC_(file_format)#Enhanced_format|Enhanced LRC}
   * */
  enhanced?: boolean;
}
