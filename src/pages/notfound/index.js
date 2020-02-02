import React, { Component } from 'react'

class NotFound extends Component {
  render() {
    return (
      <section className="hero is-warning is-fullheight">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Not Found</h1>
            <h2 className="subtitle">
              This is not the page your looking for..
            </h2>
          </div>
        </div>
      </section>
    )
  }
}

export default NotFound
