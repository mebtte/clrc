import React, { useDeferredValue, useEffect, useState } from 'react';
import styled from 'styled-components';
import Github from './github';
import GlobalStyle from './global_style';
import JsonView from './json_view';
import { lrc as lrcDemo, enhancedLrc as enhancedLrcDemo } from './data';
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

const App = () => {
  const [enhanced, setEnhanced] = useState(false);

  const [lrc, setLrc] = useState(enhanced ? enhancedLrcDemo : lrcDemo);
  const onLrcChange = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    setLrc(event.target.value);

  useEffect(() => {
    setLrc(enhanced ? enhancedLrcDemo : lrcDemo);
  }, [enhanced]);

  const deferedLrc = useDeferredValue(lrc);
  return (
    <>
      <GlobalStyle />
      <Style>
        <div className="editor">
          <Option enhanced={enhanced} onEnhancedChange={setEnhanced} />
          <Textarea value={lrc} onChange={onLrcChange} autoFocus />
        </div>
        <JsonView lrc={deferedLrc} enhanced={enhanced} />
      </Style>
      <Github />
    </>
  );
};

export default App;
