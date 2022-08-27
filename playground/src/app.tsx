import React, { useState } from 'react';
import styled from 'styled-components';

import { DEFAULT_OPTIONS } from '../../src/constants';
import demoLrc from './lrc';
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
      > label {
        display: block;
      }
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

  const [trimStart, setTrimStart] = useState(DEFAULT_OPTIONS.trimStart);
  const onTrimStartChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setTrimStart(event.target.checked);

  const [trimEnd, setTrimEnd] = useState(DEFAULT_OPTIONS.trimEnd);
  const onTrimEndChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setTrimEnd(event.target.checked);

  const [arrayLrcContent, setarrayLrcContent] = useState(DEFAULT_OPTIONS.trimEnd);
  const onArrayLrcContent = (event: React.ChangeEvent<HTMLInputElement>) =>
    setarrayLrcContent(event.target.checked);

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
                checked={sortByStartTime}
                onChange={onSortByStartTimeChange}
              />
            </label>
            <label>
              trimStart
              <input
                type="checkbox"
                checked={trimStart}
                onChange={onTrimStartChange}
              />
            </label>
            <label>
              trimEnd
              <input
                type="checkbox"
                checked={trimEnd}
                onChange={onTrimEndChange}
              />
            </label>
            <label>
              arrayLrcContent
              <input
                type="checkbox"
                checked={arrayLrcContent}
                onChange={onArrayLrcContent}
              />
            </label>
          </div>
          <Textarea value={lrc} onChange={onLrcChange} autoFocus />
        </div>
        <JsonView
          lrc={lrc}
          sortByStartTime={sortByStartTime}
          trimStart={trimStart}
          trimEnd={trimEnd}
          arrayLrcContent={arrayLrcContent}
        />
      </Style>
      <Github />
    </>
  );
};

export default App;
