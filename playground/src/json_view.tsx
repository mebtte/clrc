import { useMemo, useDeferredValue } from 'react';
import styled from 'styled-components';
import JsonView from 'react-json-view';
import { parse } from 'clrc';

const Style = styled.div`
  padding: 10px;

  flex: 1;
  min-width: 0;

  overflow: auto;
  background-color: rgb(222 222 222 / 0.2);
`;

const Wrapper = ({ lrc }: { lrc: string }) => {
  const deferedLrc = useDeferredValue(lrc);
  const parsed = useMemo(() => parse(deferedLrc), [deferedLrc]);

  return (
    <Style>
      <JsonView src={parsed} />
    </Style>
  );
};

export default Wrapper;
