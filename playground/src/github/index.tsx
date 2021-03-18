import React from 'react';
import styled from 'styled-components';

// @ts-ignore
import PngGithub from './github.png';

const Style = styled.a`
  position: fixed;
  top: 20px;
  right: 20px;
  > img {
    width: 48px;
  }
`;

const Github = () => (
  <Style href="https://github.com/mebtte/clrc">
    <img src={PngGithub} alt="github" />
  </Style>
);

export default Github;
