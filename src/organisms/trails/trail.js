import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { push } from 'react-router-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Trail extends Component {
  goToTrail = e => {
    e.preventDefault()
    let { trail, dispatch } = this.props
    dispatch(push(`/trails/${trail.trailId}`))
  }

  render() {
    const { trail } = this.props

    return (
      <div onClick={this.goToTrail} className="level is-mobile is-trail">
        <div className="level-left">
          <div className="level-item">
            {trail.trailStatus !== 'Open' && (
              <FontAwesomeIcon
                className="has-text-danger"
                icon={['far', 'traffic-light-stop']}
                size="2x"
              />
            )}
            {trail.trailStatus === 'Open' && (
              <FontAwesomeIcon
                className="has-text-success "
                icon={['far', 'traffic-light-go']}
                size="2x"
              />
            )}
          </div>
          <div className="level-item">
            <div>
              <p>{trail.trailName}</p>
              <p>
                <small>
                  <span>{trail.trailStatus} </span>
                  <span>
                    <time
                      className="time"
                      dateTime={moment(trail.updatedAt).format(
                        'YYYY-MM-DD h:mm'
                      )}
                    >
                      {moment(trail.updatedAt).format('LLLL')}
                    </time>
                  </span>
                </small>
              </p>
            </div>
          </div>
        </div>
        <div className="level-right">
          <div className="level-item">
            <FontAwesomeIcon icon={['far', 'angle-right']} size="3x" />
          </div>
        </div>
      </div>
    )
  }
}

export default connect()(Trail)
