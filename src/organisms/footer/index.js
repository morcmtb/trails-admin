import React, { Component } from 'react'
import moment from 'moment'

class Footer extends Component {
  render() {
    return (
      <footer>
        <div className="container">
          <div className="content has-text-centered">
            <p>
              <strong>Roam Development</strong> © {moment().format('YYYY')}
            </p>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer
