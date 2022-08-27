export interface LrcLine {
  lineNumber: number;
  raw: string;
}

export interface MetadataLine<MetadataKey extends string> extends LrcLine {
  key: MetadataKey;
  value: string;
}

export interface LyricLine extends LrcLine {
  startMillisecond: number;
  content: string;
}

export interface LyricLineWithSecondLrc extends LrcLine {
  startMillisecond: number;
  content: string[];
}

export type ParseOptions = {
  /** whether to sort lyrics by start time */
  sortByStartTime?: boolean;
  /** whether to remove start spaces */
  trimStart?: boolean;
  /** whether to remove end spaces */
  trimEnd?: boolean;
  /** change lrc content from `string` to `string[]` */
  arrayLrcContent?: boolean;
};

export const DEFAULT_OPTIONS: ParseOptions = {
  sortByStartTime: false,
  trimStart: true,
  trimEnd: false,
  arrayLrcContent: false,
};
