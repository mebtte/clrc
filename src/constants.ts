// eslint-disable-next-line no-shadow
export enum LineType {
  INVALID = 'invalid',
  METADATA = 'metadata',
  LYRIC = 'lyric',
  ENHANCED_LYRIC = 'enhanced_lyric',
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

export interface EnhancedWord {
  index: number;
  raw: string;
  startMillisecond: number;
  content: string;
}

export interface EnhancedLyricLine extends Omit<LyricLine, 'type'> {
  type: LineType.ENHANCED_LYRIC;
  words: EnhancedWord[];
}
