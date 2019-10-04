import React from 'react';
import styled from 'styled-components';
import { Hr } from './../atoms/hr';

const StyledFooter = styled.footer`
  height: 6rem;
  background: #1a1a1a;
  color: #ffffff;
`;

export function Footer({ children, ...rest }) {
  return (
    <StyledFooter {...rest}>
      <Hr /> Footer
    </StyledFooter>
  );
}
