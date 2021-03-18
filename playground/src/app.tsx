import React, { useState } from 'react';
import styled from 'styled-components';

import demoLrc from './demo_lrc';
import GlobalStyle from './global_style';
import Textarea from './textarea';
import JsonView from './json_view';
import Github from './github';

const Style = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  > .left {
    flex: 1;
    display: flex;
    flex-direction: column;
    > .options {
      margin: 0 10px 30px 10px;
    }
  }
`;

const App = () => {
  const [lrc, setLrc] = useState(demoLrc);
  const onLrcChange = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    setLrc(event.target.value);

  const [sortByStartTime, setSortByStartTime] = useState(false);
  const onSortByStartTimeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => setSortByStartTime(event.target.checked);

  return (
    <>
      <GlobalStyle />
      <Style>
        <div className="left">
          <div className="options">
            <h3>Options</h3>
            <label>
              sortByStartTime
              <input
                type="checkbox"
                // @ts-ignore
                value={sortByStartTime}
                onChange={onSortByStartTimeChange}
              />
            </label>
          </div>
          <Textarea value={lrc} onChange={onLrcChange} autoFocus />
        </div>
        <JsonView lrc={lrc} sortByStartTime={sortByStartTime} />
      </Style>
      <Github />
    </>
  );
};

export default App;
