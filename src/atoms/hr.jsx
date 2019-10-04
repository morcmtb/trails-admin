import React from 'react';
import styled from 'styled-components';

const StyledHr = styled.hr`
  background: #75b671;
  height: 1rem;
  border: 0;

  ::before {
    content: '';
    background: #6b8ce9;
    position: absolute;
    width: 33.333333333333336%;
    height: 1rem;
    left: 0;
  }
  ::after {
    content: '';
    background: #f3c500;
    position: absolute;
    width: 33.333333333333336%;
    height: 1rem;
    right: 0;
  }
`;

export function Hr() {
  return <StyledHr />;
}
