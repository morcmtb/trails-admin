import React from 'react'
import { Route } from 'react-router-dom'
import styled from 'styled-components'

const AuthWrapper = styled.div`
  // background: -webkit-radial-gradient(#dedede, #191919)
  //   rgba(211, 211, 211, 0.94);
  // background: radial-gradient(#dedede, #191919) rgba(211, 211, 211, 0.94);
  // opacity: 0.9;
`

const Layout = ({ children }) => (
  <AuthWrapper className="hero is-fullheight">
    <div className="hero-body">{children}</div>
  </AuthWrapper>
)

const UnauthenticatedRoute = ({ component: C, props: cProps, ...rest }) => {
  return (
    <Layout>
      <Route {...rest} render={props => <C {...props} {...cProps} />} />
    </Layout>
  )
}

export default UnauthenticatedRoute
