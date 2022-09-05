import React, { useState } from 'react';
import styled from 'styled-components';
import demoLrc from './lrc';
import GlobalStyle from './global_style';
import JsonView from './json_view';
import Github from './github';

const Style = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

  display: flex;
`;
const Textarea = styled.textarea`
  flex: 1;
  min-width: 0;

  padding: 10px;

  white-space: pre;
  font-size: 14px;
  color: #333;
  line-height: 1.5;
  resize: none;
  border: 1px solid rgb(222, 222, 222);
`;

const App = () => {
  const [lrc, setLrc] = useState(demoLrc);
  const onLrcChange = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    setLrc(event.target.value);

  return (
    <>
      <GlobalStyle />
      <Style>
        <Textarea value={lrc} onChange={onLrcChange} autoFocus />
        <JsonView lrc={lrc} />
      </Style>
      <Github />
    </>
  );
};

export default App;
