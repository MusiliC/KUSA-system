import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "react-bootstrap/Table";
import "./results.css";
import { getResults } from "../../redux/actions/resultsActions";
import { getScorers } from "../../redux/actions/playerActions";

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
            <div className="text-center display-6">
              <b> Results </b>
            </div>
            <div className="col-lg-6 my-1">
              <Table  bordered hover>
                <h5 className="pb-2">
                  <i className="bi bi-calendar-event mx-3"></i> Date
                </h5>

                <tbody>
                  {results &&
                    results.map((teams) => (
                      <tr>
                        <td>
                          {` ${teams.homeTeam} ${teams.homeTeamGoals} vs ${teams.awayTeam} ${teams.awayTeamGoals}`}
                        </td>
                        <td>
                          <i className="bi bi-geo-alt-fill mx-2"></i> Chuka
                          University
                        </td>
                      </tr>
                    ))}
                  {/* <tr>
                    <td className="lead">
                      <b> Karatina 3 : 0 Kimathi </b>
                    </td>

                    <td>
                      <i className="bi bi-geo-alt-fill mx-2"></i> Chuka
                      University
                    </td>
                  </tr> */}
                </tbody>
              </Table>
            </div>
          </div>
          <div className="row justify-content-center my-3">
            <div className="col-lg-5">
              <div className="text-center my-3 display-6">
                <b> Top Scorer</b>
              </div>
              {
                <Table striped bordered hover>
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
                        <tr>
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
    </div>
  );
}
