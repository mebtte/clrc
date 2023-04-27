const TIMESTAMP = /^(\d{2,}):(\d{2})(?:\.(\d{2,3}))?$/; // 00:00.000 | 00:00.00 | 00:00

export function timestampToMillsecond(timestamp: string) {
  const timeMatch = timestamp.match(TIMESTAMP);
  const minute = timeMatch[1];
  const second = timeMatch[2];
  const centisecond = timeMatch[3] || '00'; // compatible with [00:00]
  const centisecondNumber =
    centisecond.length === 3 ? +centisecond : +centisecond * 10; // // compatible with [00:00.000]
  return +minute * 60 * 1000 + +second * 1000 + centisecondNumber;
}
