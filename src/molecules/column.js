import React from 'react'

const Column = ({ children, styles }) => {
  return <div className={'column ' + (styles ? styles : '')}>{children}</div>
}
export default Column
