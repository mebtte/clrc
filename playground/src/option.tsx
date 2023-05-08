import React from 'react';
import styled from 'styled-components';

const Style = styled.div`
  padding: 10px 10px 10px 20px;
`;

function Option({
  enhanced,
  onEnhancedChange,
}: {
  enhanced: boolean;
  onEnhancedChange: (e: boolean) => void;
}) {
  return (
    <Style>
      <label>
        enhanced:
        <input
          type="checkbox"
          checked={enhanced}
          onChange={() => onEnhancedChange(!enhanced)}
        />
      </label>
    </Style>
  );
}

export default Option;
