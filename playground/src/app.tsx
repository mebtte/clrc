import { expand } from 'clrc';
import React, { useState } from 'react';
import styled from 'styled-components';
import Github from './github';
import GlobalStyle from './global_style';
import JsonView from './json_view';
import demoLrc from './lrc';
import Option from './option';

const Style = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

  display: flex;

  > .editor {
    flex: 1;
    min-width: 0;

    display: flex;
    flex-direction: column;

    > .toolbar {
      display: flex;
      align-items: center;
      gap: 10px;
    }
  }
`;
const Textarea = styled.textarea`
  flex: 1;
  min-height: 0;

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
  max-height: 50px;
`;

const App = () => {
  const [enhanced, setEnhanced] = useState(false);

  const [lrc, setLrc] = useState(demoLrc);

  const onLrcChange = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    setLrc(event.target.value);

  const reset = () => setLrc(demoLrc);

  const handleExpand = () => {
    setLrc(expand(lrc));
  };

  return (
    <>
      <GlobalStyle />
      <Style>
        <div className="editor">
          <div className="toolbar">
            <Option enhanced={enhanced} onEnhancedChange={setEnhanced} />
            <Button onClick={reset}>Reset</Button>
            <Button onClick={handleExpand}>Regenerate</Button>
          </div>
          <Textarea value={lrc} onChange={onLrcChange} autoFocus />
        </div>
        <JsonView lrc={lrc} enhanced={enhanced} />
      </Style>
      <Github />
    </>
  );
};

export default App;
