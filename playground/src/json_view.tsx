import { useMemo } from 'react';
import styled from 'styled-components';
import JsonView from 'react-json-view';
import { parse, parseEnhanced } from 'clrc';

const Style = styled.div`
  padding: 10px;

  flex: 1;
  min-width: 0;

  overflow: auto;
  background-color: rgb(222 222 222 / 0.2);
`;

const Wrapper = ({ lrc, enhanced }: { lrc: string; enhanced: boolean }) => {
  const parsed = useMemo(
    () => (enhanced ? parseEnhanced(lrc) : parse(lrc)),
    [lrc, enhanced]
  );

  return (
    <Style>
      <JsonView src={parsed} />
    </Style>
  );
};

export default Wrapper;
