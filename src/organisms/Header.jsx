import React from 'react';
import styled from 'styled-components';
import logo from './../img/logo.png';

const StyledHeader = styled.header`
  display: flex;
  font-size: 2em;
  font-weight: 900;
  height: 5rem;
  background-color: #ffffff;
  border-bottom: solid 0.1rem #dedede;
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.11);
  margin: 0 0 1rem 0;
`;

const Container = styled.div`
  width: 1280px;
  margin: 0px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Left = styled.div`
  height: 4rem;
  img {
    height: 100%;
  }
`;
const Center = styled.div``;
const Right = styled.div``;

export function Header({ children, ...rest }) {
  return (
    <StyledHeader>
      <Container>
        <Left>
          <img src={logo} alt="MORC Logo" />
        </Left>
        <Center>Trail Conditions</Center>
        <Right></Right>
      </Container>
    </StyledHeader>
  );
}
