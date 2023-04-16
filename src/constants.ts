// eslint-disable-next-line no-shadow
export enum LineType {
  INVALID = 'invalid',
  LYRIC = 'lyric',
  LYRIC_EXT = 'lyric_ext',
  METADATA = 'metadata',
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
  type: LineType.LYRIC_EXT;
  startMillisecond: number;
  content: Syllable[];
}
