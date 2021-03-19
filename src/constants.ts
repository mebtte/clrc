export interface LrcLine {
  lineNumber: number;
  raw: string;
}

export interface MetadataLine extends LrcLine {
  key: string;
  value: string;
}

export interface LyricLine extends LrcLine {
  startMillisecond: number;
  content: string;
}
