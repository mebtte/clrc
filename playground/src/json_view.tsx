import { useMemo, useEffect } from 'react';
import styled from 'styled-components';
import JsonView from 'react-json-view';
import { parse, parseEnhanced, stringify } from 'clrc';

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

  useEffect(() => {
    console.group('stringify from parsed result');
    console.log(stringify(parsed));
    console.groupEnd();
  }, [parsed]);

  return (
    <Style>
      <JsonView src={parsed} />
    </Style>
  );
};

export default Wrapper;
