import React from 'react'

const Container = ({ children, styles }) => {
  return <div className={'container ' + (styles ? styles : '')}>{children}</div>
}
export default Container
