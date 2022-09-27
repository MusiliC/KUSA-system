import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./fixtures.css";
import { useDispatch, useSelector } from "react-redux";
import { allFixtures } from "../../redux/actions/fixturesAction";
import { getEvents } from "../../redux/actions/eventsAction";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function Fixtures() {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.eventsReducer.events);
  const comingFixtures = useSelector((state) => state.fixtureReducer.fixtures);

  const [selectedEventDisplay, setSelectedEventDisplay] = useState("");
  const [selectedFixture, setSelectedFixture] = useState(null);

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  useEffect(() => {
    if (selectedEventDisplay) dispatch(allFixtures(selectedEventDisplay));
  }, [dispatch, selectedEventDisplay]);

  const handleFixtureClick = (id1, id2) => {
    const { id, ...rest } = comingFixtures[0].fixture.find((f) => f.id === id1);
    const date = Object.keys(rest)[0];
    const values = rest[date];

    const fixture = values.find((f) => f.id === id2);
    setSelectedFixture(fixture);
  };

  return (
    <div>
      <section id="fixture-page">
        <div className="bg" id="fixture-bg">
          <div className="container-lg">
            <div className="text-center display-6 py-4 " id="fix-heading">
              <b> KUSA Fixtures </b>
            </div>

            <div className="row justify-content-around mb-5">
              <div className="col-lg-10 ">
                <div className="form-group mt-2 my-5">
                  <label htmlFor="" className="fs-4">
                    Select event to get Fixtures
                  </label>
                  <select
                    value={selectedEventDisplay}
                    onChange={(e) => setSelectedEventDisplay(e.target.value)}
                    className="form-select mt-2"
                  >
                    <option value="">Select Event</option>

                    {events?.map((event) => (
                      <option value={event?._id} key={event?._id}>
                        {event?.name}
                      </option>
                    ))}
                  </select>
                </div>
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Home Team</th>
                      <th>Away Team</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comingFixtures?.length === 0 && (
                      <tr>
                        <td colSpan={20} className="text-center">
                          No Fixture Found For Given Event
                        </td>
                      </tr>
                    )}

                    {comingFixtures?.map((singleFixture, i1) => (
                      <React.Fragment>
                        {singleFixture?.fixture?.map((fixture, i2) => {
                          const date = Object.keys(fixture)[0];
                          const values = fixture[date];

                          return (
                            <React.Fragment>
                              {values?.map((value, i) => (
                                <tr
                                  onClick={() =>
                                    handleFixtureClick(fixture?.id, value?.id)
                                  }
                                >
                                  <td className="">
                                    {new Date(date).toLocaleDateString()}
                                  </td>
                                  <td>{value?.time}</td>
                                  <td>{value?.awayTeam?.team}</td>
                                  <td>{value?.homeTeam?.team}</td>
                                </tr>
                              ))}
                            </React.Fragment>
                          );
                        })}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="footer" className="bg-info">
        <footer className="footer mt-auto py-3 ">
          <div className="container">
            <div className="row text-dark justify-content-lg-start align-content-end">
              {/* <h5 className="ms-5">Links</h5> */}
              <div className="col-lg-2">
                <ul>
                  <Link to={"/home"} id="footer-links">
                    <li>Home</li>
                  </Link>
                  <Link to="/teams" id="footer-links">
                    <li>Teams</li>
                  </Link>
                </ul>
              </div>
              <div className="col-lg-2">
                <ul>
                  <Link to="/fixtures" id="footer-links">
                    <li>Fixtures</li>
                  </Link>
                  <Link to="/results" id="footer-links">
                    <li>Results</li>
                  </Link>
                </ul>
              </div>
              <div className="col-lg-2">
                <ul>
                  <Link to="/about" id="footer-links">
                    <li>About Us</li>
                  </Link>
                </ul>
              </div>
              <div className="col-lg-6">
                <div className="text-center">
                  This site is protected by the Google Privacy Policy and Terms
                  of Service apply.
                </div>
              </div>
            </div>
          </div>
        </footer>
      </section>

      {selectedFixture && (
        <Modal show={true} onHide={() => setSelectedFixture(null)}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setSelectedFixture(null)}
            >
              Close
            </Button>
            <Button variant="primary" onClick={() => setSelectedFixture(null)}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}
