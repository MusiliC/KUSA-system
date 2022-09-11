import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "react-bootstrap/Table";
import "./results.css";
import { getResults } from "../../redux/actions/resultsActions";
import { getScorers } from "../../redux/actions/playerActions";
import { Link } from "react-router-dom";

export default function Results() {
  const dispatch = useDispatch();

  //handling Results

  const results = useSelector((state) => state.resultsReducer.results);

  //handling top scorer

  const topScorer = useSelector((state) => state.playerReducer.players);

  useEffect(() => {
    dispatch(getResults());
    dispatch(getScorers());
  }, [dispatch]);

  return (
    <div className="bg" id="results-bg">
      <section>
        <div className="container-lg pt-3">
          <div className="row justify-content-around">
            {/* <div className="text-center display-6">
              <b> Results </b>
              
            </div> */}

            <div className="col-lg-10 my-4">
              <div className="fs-2 mx-2 ">Results</div>
              <div className="underline-results mx-2 mb-2"></div>
              <Table border-none hover>
                <tbody>
                  {results &&
                    results.map((teams) => (
                      <tr>
                        <td className="py-3 d-flex flex-wrap" id="result-data">
                          {/* {` ${teams?.homeTeam?.team} ${teams.homeTeamGoals} vs  ${teams.awayTeamGoals} ${teams.awayTeam?.team} `} */}
                          <div className="teamA">
                            
                            {`${teams?.homeTeam?.team} `}
                          </div>
                          <span className="score-data mx-2 me-4">
                            {` ${teams.homeTeamGoals} `} -
                            {` ${teams.awayTeamGoals}`}
                          </span>
                          <div className="teamA"> {` ${teams.awayTeam?.team} `}</div>
                        </td>
                        <td className="py-3" id="result-data">
                          <i className="bi bi-geo-alt-fill me-2 "></i> Chuka
                          University
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
                    {topScorer &&
                      topScorer.map((player) => (
                        <tr className="py-3" id="result-data">
                          <td>{player.scorer}</td>
                          <td>{player.scorerTeam}</td>
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
    </div>
  );
}
