import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { requestTrails, updateTrail } from "../../actions/trails";

export const TrailsDetail = (props) => {
  const [trail, setTrail] = useState({});
  const [status, setStatus] = useState("Closed");
  const [description, setDescription] = useState("");

  const { trails, isLoading } = useSelector((state) => state.trails);
  const dispatch = useDispatch();
  const { match } = props;

  function handleSubmit() {
    dispatch(
      updateTrail({
        trailId: trail.trailId,
        description: description,
        trailStatus: status,
      })
    );
  }

  useEffect(() => {
    const trail = trails.filter((t) => t.trailId === match.params.id)[0];
    if (trail) {
      setTrail(trail);
      setStatus(trail.trailStatus);
    }
  }, [match, trails]);

  useEffect(() => {
    if (trails.length === 0) {
      dispatch(requestTrails());
    }
  }, [trails, dispatch]);

  useEffect(() => {}, [trail]);

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
                  <label className="label">Subject</label>
                  <div className="control is-expanded">
                    <div className="select is-fullwidth">
                      <select
                        className="select"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option value="Open">Open - Go Ride</option>
                        <option value="Wet">Wet - Do Not Ride</option>
                        <option value="Melting">Melting - Do Not Ride</option>
                        <option value="Closed">Closed - Do Not Ride</option>
                      </select>
                    </div>
                  </div>
                </div>
                <p>Description: {trail.description}</p>
                <div className="field">
                  <label className="label">Message</label>
                  <div className="control">
                    <textarea
                      id="trailDescription"
                      className="textarea"
                      type="text"
                      placeholder="Description of the trail conditions (optional)"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
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
                onClick={handleSubmit}
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
};
