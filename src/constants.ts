export interface LrcLine {
  lineNumber: number;
  raw: string;
}

export interface MetadataLine<
  M extends { [key: string]: string },
  K extends keyof M
> extends LrcLine {
  key: K;
  value: M[K];
}

export interface LyricLine extends LrcLine {
  startMillisecond: number;
  content: string;
}

export interface InvalidLine extends LrcLine {}
