import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { requestTrails, updateTrail } from "../../actions/trails";

class TrailsDetail extends Component {
  state = {
    trailStatus: "",
    trailDescription: "",
  };
  componentDidMount() {
    if (this.props.trails.length === 0) {
      this.props.requestTrails();
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { trails, match } = this.props,
      trail = trails.filter((t) => t.trailId === match.params.id)[0];

    this.props.updateTrail({
      trailId: trail.trailId,
      description: this.state.trailDescription,
      trailStatus: this.state.trailStatus,
    });
  };

  handleUpdateTrail = (status) => {
    this.setState({
      trailStatus: status,
    });
  };

  handleChange = (e) => {
    this.setState({
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };
  render() {
    const { trails, match, isLoading } = this.props,
      trail = trails.filter((t) => t.trailId === match.params.id)[0];

    return (
      <div className="container ">
        <div className="level level-trail-back">
          <div className="level-left">
            <Link to="/trails">
              <FontAwesomeIcon icon={["far", "angle-left"]} /> trails
            </Link>
          </div>
        </div>
        {trail && (
          <Fragment>
            <div className="level trail-header">
              <div className="level-left">
                <div className="trail-header">
                  <h3 className="title">{trail.trailName}</h3>
                  <time
                    className="subtitle"
                    dateTime={moment(trail.updatedAt).format("YYYY-MM-DD h:mm")}
                  >
                    {moment(trail.updatedAt).format("LLLL")}
                  </time>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-content">
                <div className="content">
                  <div className="field">
                    <label className="label">Status</label>
                    <div className="control is-expanded">
                      <div className="select is-fullwidth">
                        <select
                          className="select"
                          defaultValue={trail.trailStatus}
                          onChange={(e) =>
                            this.handleUpdateTrail(e.currentTarget.value)
                          }
                        >
                          <option value="Open">Open - Go Ride</option>
                          <option value="Wet">Wet - Do Not Ride</option>
                          <option value="Melting">Melting - Do Not Ride</option>
                          <option value="Closed">Closed - Do Not Ride</option>
                          {/* <option value="Packed">Packed</option>
                                                      <option value="Icy">Icy</option>
                                                      <option value="Fat Tires">Fat Tires</option>
                                                      <option value="Need Packing">Need Packing</option>
                                                      <option value="Tacky">Tacky</option>
                                                      <option value="Dry">Dry</option>
                                                      <option value="Damp">Damp</option> */}
                        </select>
                      </div>
                    </div>
                  </div>
                  <p>Description: {trail.description}</p>
                  <div className="field">
                    <label className="label">Description</label>
                    <div className="control">
                      <textarea
                        id="trailDescription"
                        className="textarea"
                        type="text"
                        placeholder="Description of the trail conditions (optional)"
                        value={this.state.trailDescription}
                        onChange={(e) => {
                          this.handleChange(e);
                        }}
                      />
                    </div>
                  </div>
                  <address>
                    {trail.street}
                    <br />
                    {trail.city} {trail.state}, {trail.zipcode} <br />
                  </address>
                  <address>
                    <p>
                      Lat: {trail.latitude} Long: {trail.longitude}
                    </p>
                  </address>
                </div>

                <button
                  onClick={this.handleSubmit}
                  className={`button is-info ${isLoading ? "is-loading" : ""}`}
                >
                  update
                </button>
              </div>
            </div>
          </Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    trails: state.trails.trails,
    isLoading: state.trails.isLoading,
  };
};
const mapDispatchToProps = {
  requestTrails,
  updateTrail: (trail) => updateTrail(trail),
};

export default connect(mapStateToProps, mapDispatchToProps)(TrailsDetail);
