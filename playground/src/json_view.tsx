import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import JsonView from 'react-json-view';
import { parse } from '../../src';

const Style = styled.div`
  overflow: auto;
  flex: 1;
  padding: 10px;
  background-color: rgb(222 222 222 / 0.2);
`;

const Wrapper = ({
  lrc,
  sortByStartTime,
  trimStart,
  trimEnd,
  combineSameTimeLrc
}: {
  lrc: string;
  sortByStartTime: boolean;
  trimStart: boolean;
  trimEnd: boolean;
  combineSameTimeLrc?: boolean;
}) => {
  const [lrcObject, setLrcObject] = useState(parse(lrc));

  useEffect(() => {
    const timer = window.setTimeout(
      () => setLrcObject(parse(lrc, { sortByStartTime, trimStart, trimEnd, combineSameTimeLrc })),
      300
    );
    return () => window.clearTimeout(timer);
  }, [lrc, sortByStartTime, trimStart, trimEnd, combineSameTimeLrc]);

  useEffect(() => {
    console.log(lrcObject);
  }, [lrcObject]);

  return (
    <Style>
      <JsonView src={lrcObject} />
    </Style>
  );
};

export default Wrapper;
