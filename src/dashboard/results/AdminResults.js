import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteScorer, getScorers } from "../../redux/actions/playerActions";
import { deleteResult, getResults } from "../../redux/actions/resultsActions";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import { getTeams } from "../../redux/actions/teamsAction";

export default function AdminResults() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //handling Results

  const results = useSelector((state) => state.resultsReducer.results);
 

  const handleResultDelete = (id) => {
    dispatch(deleteResult(id));
  };

  //handling top scorer

  const topScorer = useSelector((state) => state.playerReducer.players);
  console.log(topScorer);

  const handlePlayerDelete = (id) => {
    dispatch(deleteScorer(id));
  };

  useEffect(() => {
    dispatch(getResults());
    dispatch(getScorers());
    dispatch(getTeams());
  }, [dispatch]);

  return (
    <div className="container-lg">
      <div className="display-6 text-center">Results</div>
      <div className="row my-4 justify-content-around">
        <div className="col-lg-5">
          <div className="lead text-center my-3">
            <b>Results</b>
           
          </div>
          <ol className="list-group group list-group-numbered">
            {results &&
              results?.map((teams) => (
                <li className="list-group-item  text-center" key={teams._id}>
                  {` ${teams?.homeTeam?.team}  ${teams.homeTeamGoals} vs ${teams?.awayTeam?.team} ${teams.awayTeamGoals}`}
                  <div className="d-flex justify-content-around my-2">
                    <i
                      className="bi bi-pencil-square "
                      onClick={() => navigate(`result/${teams._id}`)}
                    ></i>
                    <i
                      className="bi bi-trash-fill "
                      onClick={() => handleResultDelete(teams._id)}
                    ></i>
                  </div>
                </li>
              ))}
          </ol>
        </div>
        <div className="col-lg-5">
          <div className="lead text-center my-3">
            <b> Top Scorers </b>
          </div>

          {
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Institution</th>
                  <th>Goals</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {topScorer &&
                  topScorer.map((player) => (
                    <tr key={player._id}>
                      <td>{player.scorer}</td>
                      <td>{player.scorerTeam.team}</td>
                      <td>{player.scorerGoals}</td>
                      <td>
                        <div className="d-flex justify-content-around align-items-center">
                          <i
                            className="bi bi-pencil-square"
                            onClick={() => navigate(`player/${player._id}`)}
                          ></i>
                          <i
                            className="bi bi-trash-fill"
                            onClick={() => handlePlayerDelete(player._id)}
                          ></i>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          }
        </div>
      </div>
    </div>
  );
}
