import timestampToMillisecond from './timestamp_to_millisecond';

describe('timestmap to millisecond', () => {
  test('normal centisecond', () => {
    expect(timestampToMillisecond('01:00.001')).toBe(60001);
  });

  test('centisecond with two digits', () => {
    expect(timestampToMillisecond('01:00.01')).toBe(60010);
  });

  test('lack centisecond', () => {
    expect(timestampToMillisecond('01:00')).toBe(60000);
  });

  test('the invalid should return 0', () => {
    expect(timestampToMillisecond('')).toBe(0);
  });
});
