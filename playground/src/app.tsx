import React, { useState } from 'react';
import styled from 'styled-components';
import Github from './github';
import GlobalStyle from './global_style';
import JsonView from './json_view';
import demoLrc from './lrc';
import { parse, toString } from 'clrc';

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

const Button = styled.button`
  padding: 5px 10px;
  border: 1px solid #333;
  border-radius: 5px;
  background-color: #fff;
  cursor: pointer;
  font-size: 20px;
  max-height: 50px;
`;

const Box = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
`;

const App = () => {
  const [lrc, setLrc] = useState(demoLrc);
  const onLrcChange = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    setLrc(event.target.value);

  const reset = () => setLrc(demoLrc);

  const regenerate = () => {
    setLrc(toString(parse(lrc)));
  };

  return (
    <>
      <GlobalStyle />
      <Style>
        <Box>
          <Textarea value={lrc} onChange={onLrcChange} autoFocus />
          <Button onClick={reset}>
            Reset
          </Button>
          <Button onClick={regenerate}>
            Regenerate
          </Button>
        </Box>
        <JsonView lrc={lrc} />
      </Style>
      <Github />
    </>
  );
};

export default App;
