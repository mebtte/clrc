import { useMemo, useDeferredValue } from 'react';
import styled from 'styled-components';
import JsonView from 'react-json-view';
import { LineType, LyricLine, parse } from 'clrc';

const Style = styled.div`
  padding: 10px;

  flex: 1;
  min-width: 0;

  overflow: auto;
  background-color: rgb(222 222 222 / 0.2);
`;

const Wrapper = ({ lrc }: { lrc: string }) => {
  const deferedLrc = useDeferredValue(lrc);
  const parsed = useMemo(() => parse(deferedLrc), [deferedLrc]).sort((a,b)=>{
    const keyA = a.type === LineType.LYRIC || a.type === LineType.LYRIC_EXT  ? (a as LyricLine).startMillisecond : 0;
    const keyB = b.type === LineType.LYRIC || b.type === LineType.LYRIC_EXT ? (b as LyricLine).startMillisecond : 0;
    return keyA - keyB;
  });

  return (
    <Style>
      <JsonView src={parsed} />
    </Style>
  );
};

export default Wrapper;
