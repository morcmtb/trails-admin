import React from 'react';
import styled from 'styled-components';
import { Container } from './../atoms/container';

const StyledSection = styled.section`
  min-height: calc(100vh - 12rem);
`;

export function Section({ children, ...rest }) {
  return (
    <StyledSection {...rest}>
      <Container>{children}</Container>
    </StyledSection>
  );
}
