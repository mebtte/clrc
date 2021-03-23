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

export type Options = {
  /** whether to sort lyrics by start time */
  sortByStartTime?: boolean;
  /** whether to remove start spaces */
  trimStart?: boolean;
  /** whether to remove end spaces */
  trimEnd?: boolean;
};

export const DEFAULT_OPTIONS: Options = {
  sortByStartTime: false,
  trimStart: true,
  trimEnd: false,
};
