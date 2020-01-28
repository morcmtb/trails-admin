import React, { Component } from 'react'

class Notification extends Component {
  state = {
    isActive: true
  }
  render() {
    const { isActive } = this.state
    const { text, type, children } = this.props
    return (
      <section>
        <div
          className={
            'notification ' +
            (isActive ? ' ' : 'is-hidden ') +
            (type ? 'is-' + type : '')
          }
        >
          <button
            onClick={() => this.setState({ isActive: false })}
            className="delete"
          />
          <strong />
          {text} {children}
        </div>
      </section>
    )
  }
}

export default Notification
