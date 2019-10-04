import React from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
  max-width: 1280px;
  margin: 0px auto;
`;
export function Container({ children }) {
  return <StyledContainer>{children}</StyledContainer>;
}
