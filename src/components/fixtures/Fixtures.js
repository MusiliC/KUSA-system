import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import "./fixtures.css";
import { useDispatch, useSelector } from "react-redux";
import { allFixtures } from "../../redux/actions/fixturesAction";
import { getEvents } from "../../redux/actions/eventsAction";
import io from "socket.io-client";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { allRegionsFixtures } from "../../redux/actions/regionalFixturesAction";
import { Header } from "../commons/Header";

const socket = io("http://localhost:3002");

const imgUrl = "http://localhost:5000/static";

export default function Fixtures() {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.eventsReducer.events);
  const comingFixtures = useSelector((state) => state.fixtureReducer.fixtures);

  const regionalFixtures = useSelector(
    (state) => state.regionFixturesReducer.fixtures
  );

  const [selectedEventDisplay, setSelectedEventDisplay] = useState("");
  const [selectedFixture, setSelectedFixture] = useState(null);

  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(false);
  const [timePause, setTimePause] = useState(Boolean);

  const [liveData, setLiveData] = useState([]);

  useEffect(() => {
    let interval = null;

    if (timerOn) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timerOn]);

  useEffect(() => {
    dispatch(getEvents());

    dispatch(allRegionsFixtures());
  }, [dispatch]);

  useEffect(() => {
    if (selectedEventDisplay) dispatch(allFixtures(selectedEventDisplay));
  }, [dispatch, selectedEventDisplay]);

  useEffect(() => {
    socket.on(
      "updated_score",
      (data) => {
        setLiveData((list) => (list === data.obj ? [list] : [data.obj]));

        if (!timePause) {
          setTimerOn(true);
        } else {
          setTimerOn(false);
        }
      },
      [socket, liveData]
    );

    socket.on("game_pause", (data) => {
      setTimePause(data.gamePause);

      if (!data.gamePause) {
        setTimerOn(true);
      } else {
        setTimerOn(false);
      }
    });
  }, [socket]);

  const handleFixtureClick = async (id1, id2) => {
    const { id, ...rest } = comingFixtures[0].fixture.find((f) => f.id === id1);
    const date = Object.keys(rest)[0];
    const values = rest[date];

    const fixture = await values.find((f) => f.id === id2);

    await setSelectedFixture(fixture);
  };

  const handleFixtures = () => {
    const input = document.getElementById("tableFixtures");
    html2canvas(input, {
      logging: true,
      letterRendering: 1,
      useCORS: true,
    }).then((canvas) => {
      const imgWidth = 208;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const imgData = canvas.toDataURL("img/png");
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("Fixtures.pdf");
    });
  };

  return (
    <div>
      <section id="fixture-page">
        <Header>KUSA FIXTURES</Header>
        <div className="bg" id="fixture-bg">
          <div className="container-lg">
            <div className="row justify-content-around mb-5">
              <div className="col-lg-10 ">
                <div className="form-group mt-2 my-5 mb-2">
                  {/* <label htmlFor="" className="fs-4">
                    Select event to get Fixtures
                  </label>
                  <select
                    value={selectedEventDisplay}
                    onChange={(e) => setSelectedEventDisplay(e.target.value)}
                    className="form-select mt-2"
                  >
                    <option value="">Select event</option>

                    {events?.map((event) => (
                      <option value={event?._id} key={event?._id}>
                        {event?.name}
                      </option>
                    ))}
                  </select> */}
                </div>

                {/* LIVE SCORE */}

                {time === 0 && (
                  <div className="my-5 " id="liveScore">
                    <div className="text-center lead fw-bold mb-3 ">
                      <b> Live Score </b>
                    </div>
                    <div className="d-flex justify-content-center mb-1 fs-4">
                      <span className="mx-1">
                        {("0" + Math.floor((time / 60000) % 60)).slice(-2)} :
                      </span>
                      <span className="mx-1">
                        {("0" + Math.floor((time / 1000) % 60)).slice(-2)}
                      </span>
                      {/* <span className="mx-1">
                        {("0" + ((time / 10) % 100)).slice(-2)}
                      </span> */}
                    </div>

                    <div id="two">
                      <div id="homeTeamContent" className="fw-bold">
                        Home Team
                      </div>
                      <span id="bt"> vs</span>
                      <div id="awayTeamContent" className="fw-bold">
                        Away Team
                      </div>
                    </div>

                    <div className="text-center my-2 fs-4">
                      No game taking place right now..
                    </div>
                  </div>
                )}

                {time > 0 && (
                  <div className="my-5 " id="liveScore">
                    <div className="text-center lead fw-bold ">
                      <b> Live Score </b>
                    </div>

                    <div className="d-flex justify-content-center mb-1 fs-4">
                      <span className="mx-1">
                        {("0" + Math.floor((time / 60000) % 60)).slice(-2)} :
                      </span>
                      <span className="mx-1">
                        {("0" + Math.floor((time / 1000) % 60)).slice(-2)}
                      </span>
                      {/* <span className="mx-1">
                        {("0" + ((time / 10) % 100)).slice(-2)}
                      </span> */}
                    </div>

                    <div id="two">
                      <div id="homeTeamContent" className="fw-bold">
                        {liveData.map((liveData) => (
                          <p>{liveData.homeTeam}</p>
                        ))}
                      </div>
                      <span id="bt"> vs</span>
                      <div id="awayTeamContent" className="fw-bold">
                        {liveData.map((liveData) => (
                          <p>{liveData.awayTeam}</p>
                        ))}
                      </div>
                    </div>
                    <div id="two">
                      <div id="homeTeamContent">
                        {liveData.map((liveData) => (
                          <p>
                            {" "}
                            {liveData.homeTeamGoals === "" ? (
                              <p>0</p>
                            ) : (
                              <p>{liveData.homeTeamGoals}</p>
                            )}
                          </p>
                        ))}
                      </div>
                      <span id="bt">Goals</span>
                      <div id="awayTeamContent">
                        {liveData.map((liveData) => (
                          <p>
                            {" "}
                            {liveData.awayTeamGoals === "" ? (
                              <p>0</p>
                            ) : (
                              <p>{liveData.awayTeamGoals}</p>
                            )}
                          </p>
                        ))}
                      </div>
                    </div>
                    <div id="two">
                      <div id="homeTeamContent">
                        {liveData.map((liveData) => (
                          <p>
                            {liveData.homeTeamGoalScorer.map((player) => (
                              <li>{player} </li>
                            ))}
                          </p>
                        ))}
                      </div>
                      <span id="bt">Goals Scorers</span>
                      <div id="awayTeamContent">
                        {liveData.map((liveData) => (
                          <p>
                            {liveData.awayTeamGoalScorer.map((player) => (
                              <li>{player}</li>
                            ))}
                            <span className="me-1"></span>
                            {/* {liveData.awayTeamGoalsTime}' */}
                          </p>
                        ))}
                      </div>
                    </div>
                    <div id="two">
                      <div id="homeTeamContent">
                        {liveData.map((liveData) => (
                          <p>
                            {" "}
                            {liveData.homeTeamYellow === "" ? (
                              <p>0</p>
                            ) : (
                              <p>{liveData.homeTeamYellow}</p>
                            )}
                          </p>
                        ))}
                      </div>
                      <span id="bt">Total yellow cards</span>
                      <div id="awayTeamContent">
                        {liveData.map((liveData) => (
                          <p>
                            {" "}
                            {liveData.awayTeamYellow === "" ? (
                              <p>0</p>
                            ) : (
                              <p>{liveData.awayTeamYellow}</p>
                            )}
                          </p>
                        ))}
                      </div>
                    </div>
                    <div id="two">
                      <div id="homeTeamContent">
                        {liveData.map((liveData) => (
                          <p>
                            {liveData.homeTeamYellowPlayers.map((player) => (
                              <li>{player}</li>
                            ))}
                            <span className="me-1"></span>
                            {/* {liveData.homeTeamYellow}' */}
                          </p>
                        ))}
                      </div>
                      <span id="bt">Yellow Cards</span>
                      <div id="awayTeamContent">
                        {liveData.map((liveData) => (
                          <p>
                            {liveData.awayTeamYellowPlayers.map((player) => (
                              <li>{player}</li>
                            ))}
                            <span className="me-1"></span>
                            {/* {liveData.awayTeamYellow}' */}
                          </p>
                        ))}
                      </div>
                    </div>
                    <div id="two">
                      <div id="homeTeamContent">
                        {liveData.map((liveData) => (
                          <p> {liveData.homeTeamRed}</p>
                        ))}
                      </div>
                      <span id="bt">Total red cards</span>
                      <div id="awayTeamContent">
                        {liveData.map((liveData) => (
                          <p> {liveData.awayTeamRed}</p>
                        ))}
                      </div>
                    </div>
                    <div id="two">
                      <div id="homeTeamContent">
                        {liveData.map((liveData) => (
                          <p>
                            {liveData.homeTeamRedPlayers.map((player) => (
                              <li>{player}</li>
                            ))}
                            <span className="me-1"></span>
                            {/* {liveData.homeTeamRed}' */}
                          </p>
                        ))}
                      </div>
                      <span id="bt">Red Cards</span>
                      <div id="awayTeamContent">
                        {liveData.map((liveData) => (
                          <p>
                            {liveData.awayTeamRedPlayers.map((player) => (
                              <li>{player}</li>
                            ))}
                            <span className="me-1"></span>
                            {/* {liveData.awayTeamRed}' */}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* FIXTURES */}

                <div id="tableFixtures">
                  <div className="text-center lead py-4 " id="fix-heading">
                    <b> KUSA FIXTURES </b>
                  </div>

                  {/* <table className="table table-hover">
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
                            No Fixture Found For Given event
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
                  </table> */}

                  {regionalFixtures?.map((singleFixture, i1) => (
                    <React.Fragment>
                      <p className="display-6 text-center my-3">
                        {singleFixture.region.name}
                      </p>
                      <table className="table" id="regionFixtures">
                        <thead>
                          <tr>
                            <th className="text-primary">Date</th>
                            <th  className="text-primary">Time</th>
                            <th  className="text-primary">Home Team</th>
                            <th  className="text-primary">Away Team</th>
                          </tr>
                        </thead>
                        <tbody>
                          {singleFixture?.fixture?.map((fixture, i2) => {
                            const date = Object.keys(fixture)[0];
                            const values = fixture[date];

                            return (
                              <React.Fragment>
                                {values?.map((value, i) => (
                                  <tr key={value.time}>
                                    <th>
                                      {new Date(date).toLocaleDateString()}
                                    </th>
                                    <th>{value?.time}</th>
                                    <th>{value?.awayTeam?.team}</th>
                                    <th>{value?.homeTeam?.team}</th>
                                  </tr>
                                ))}
                              </React.Fragment>
                            );
                          })}
                        </tbody>
                      </table>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="container d-flex justify-content-center">
        <button
          onClick={() => handleFixtures()}
          className="btn btn-primary btn-lg mb-5"
        >
          Generate Report
        </button>
      </div>
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
            <Modal.Title>Team Report</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex flex-row justify-content-around">
              {/* first team */}
              <div>
                <div className="mb-4">Home Team</div>
                <div className="mb-2">Wins - 4</div>
                <div className="mb-2">Draws - 2</div>
                <div className="mb-2">Lost - 1</div>
                <div className="mb-2">
                  Win probability - {Math.floor((4 / 7) * 100)}%
                </div>
              </div>

              <div className="fw-bold">Vs</div>
              {/* away team */}

              <div>
                <div className="mb-4">Away Team</div>
                <div className="mb-2">Wins - 2</div>
                <div className="mb-2">Draws - 2</div>
                <div className="mb-2">Lost - 1</div>
                <div className="mb-2">
                  Win probability - {Math.floor((2 / 7) * 100)}%
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setSelectedFixture(null)}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}
