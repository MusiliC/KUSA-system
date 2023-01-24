import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "react-bootstrap/Table";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import "./results.css";
import { getResults } from "../../redux/actions/resultsActions";
import { getScorers } from "../../redux/actions/playerActions";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { Header } from "../commons/Header";

const imgUrl = "http://localhost:5000/static";

export default function Results() {
  const dispatch = useDispatch();

  const [selectedResult, setSelectedResult] = useState(null);

  //handling Results

  const results = useSelector((state) => state.resultsReducer.results);
  console.log(results);

  //handling top scorer

  const topScorer = useSelector((state) => state.playerReducer.players);

  useEffect(() => {
    dispatch(getResults());
    dispatch(getScorers());
  }, [dispatch]);

  const handleResult = async (id) => {
    const result = results.find((f) => f._id === id);

    await setSelectedResult(result);
  };

  const handleReport = () => {
    const input = document.getElementById("AllResults");
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
      pdf.save("Results.pdf");
    });
  };

  return (
    <div className="bg" id="results-bg">
      <section id="AllResults">
        <div className="">
          <Header>RESULTS</Header>
        </div>
        <div className="container-lg pt-3">
          <div className="row justify-content-around">
            <div className="col-lg-10 mb-4">
              {/* <div className="fs-2 mx-2 ">Results</div> */}

              <Table border-none hover>
                <tbody>
                  {results?.length === 0 && (
                    <tr>
                      <td colSpan={20} className="text-center">
                        No updated Results Found
                      </td>
                    </tr>
                  )}
                  {results &&
                    results.map((teams) => (
                      <tr
                        onClick={() => handleResult(teams._id)}
                        key={teams._id}
                      >
                        <td
                          className="py-3  d-flex flex-wrap justify-content-between align-items-center "
                          id="result-data"
                        >
                          <div className="date fs-5">
                            <p id="result-data">{` ${teams?.matchDate} `}</p>
                          </div>
                          <div className="teamA d-flex align-items-center">
                            {`${teams?.homeTeam?.team} `}
                            <img
                              src={`${imgUrl}/${teams?.homeTeam?.image} `}
                              alt="logo"
                              className="logo mx-2"
                            />
                          </div>
                          <div>
                            <span className="score-data mx-2 me-4">
                              {` ${teams.homeTeamGoals} `} -
                              {` ${teams.awayTeamGoals}`}
                            </span>
                          </div>
                          <div className="teamA d-flex align-items-center">
                            <img
                              src={`${imgUrl}/${teams?.awayTeam?.image} `}
                              alt="logo"
                              className="logo me-2"
                            />
                            {` ${teams.awayTeam?.team} `}
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </div>
          </div>
          <div className="row justify-content-center my-3">
            <div className="col-lg-10 mb-4">
              <div className="fs-2 mx-2 ">Scorers</div>
              <div className="underline-results mx-2 mb-3"></div>
              {
                <Table border-none hover>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Institution</th>
                      <th>Goals</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topScorer?.length === 0 && (
                      <tr>
                        <td colSpan={20} className="text-center fw-bold">
                          Goals tally of the scorers not updated..
                        </td>
                      </tr>
                    )}
                    {topScorer &&
                      topScorer.map((player) => (
                        <tr
                          className="py-3 fw-bold align-middle"
                          id="result-data"
                          key={player._id}
                        >
                          <td>{player.scorer}</td>
                          <td>
                            <img
                              src={`${imgUrl}/${player?.scorerTeam?.image} `}
                              alt=""
                              className="logo me-2"
                            />
                            {player.scorerTeam.team}
                          </td>
                          <td>{player.scorerGoals}</td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              }
            </div>
          </div>
        </div>
      </section>
      <div className="container d-flex justify-content-center">
        <button
          onClick={() => handleReport()}
          className="btn btn-primary btn-lg mb-5"
        >
          Generate Report
        </button>
      </div>
      <section id="footer" className="bg-info">
        <footer className="footer mt-auto py-3 ">
          <div className="container">
            <div className="row text-dark justify-content-lg-start align-content-end">
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
                  <Link to="/tables" id="footer-links">
                    <li>League table</li>
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

      {selectedResult?._id && (
        <Modal show={true} onHide={() => setSelectedResult(null)}>
          <Modal.Header closeButton>
            <Modal.Title>
              <div className="moduleTitle">Match Reports</div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body id="module-body">
            <div id="module-content">
              <div id="one">
                <div id="homeTeamContent" className="fw-bold">
                  {selectedResult.homeTeam.team}
                </div>
                <span id="bt"> vs</span>
                <div id="awayTeamContent" className="fw-bold">
                  {selectedResult.awayTeam.team}
                </div>
              </div>
              <div id="one">
                <div id="homeTeamContent">{selectedResult.homeTeamGoals}</div>
                <span id="bt">Goals</span>
                <div id="awayTeamContent">{selectedResult.awayTeamGoals}</div>
              </div>
              <div id="one">
                <div id="homeTeamContent">
                  {selectedResult.homeTeamGoalScorer}
                </div>
                <span id="bt">Goal Scorers</span>
                <div id="awayTeamContent">
                  {selectedResult.awayTeamGoalScorer}
                </div>
              </div>
              <div id="one">
                <div id="homeTeamContent">{selectedResult.homeTeamShots}</div>
                <span id="bt">Shots</span>
                <div id="awayTeamContent">{selectedResult.homeTeamGoals}</div>
              </div>
              <div id="one">
                <div id="homeTeamContent">{selectedResult.homeTeamFouls}</div>
                <span id="bt">Fouls</span>
                <div id="awayTeamContent">{selectedResult.awayTeamFouls}</div>
              </div>
              <div id="one">
                <div id="homeTeamContent">{selectedResult.homeTeamYellow} </div>

                <span id="bt">Yellow Cards</span>
                <div id="awayTeamContent">{selectedResult.awayTeamYellow}</div>
              </div>
              <div id="one">
                <div id="homeTeamContent">
                  <div>
                    {selectedResult.homeTeamYellowPlayers ? (
                      <div>{selectedResult.homeTeamYellowPlayers}</div>
                    ) : (
                      "None"
                    )}
                  </div>
                </div>

                <span id="bt">Yellow carded players</span>
                <div id="awayTeamContent">
                  <div>
                    {selectedResult.awayTeamYellowPlayers ? (
                      <div>{selectedResult.awayTeamYellowPlayers}</div>
                    ) : (
                      "None"
                    )}
                  </div>
                </div>
              </div>
              <div id="one">
                <div id="homeTeamContent">{selectedResult.homeTeamRed}</div>
                <span id="bt">Red Cards</span>
                <div id="awayTeamContent">{selectedResult.awayTeamRed}</div>
              </div>

              <div id="one">
                <div id="homeTeamContent">
                  <div>
                    {selectedResult.homeTeamRedPlayers ? (
                      <div>{selectedResult.homeTeamRedPlayers}</div>
                    ) : (
                      "None"
                    )}
                  </div>
                </div>

                <span id="bt">Red carded players</span>
                <div id="awayTeamContent">
                  <div>
                    {selectedResult.awayTeamRedPlayers ? (
                      <div>{selectedResult.awayTeamRedPlayers}</div>
                    ) : (
                      "None"
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => setSelectedResult(null)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}
