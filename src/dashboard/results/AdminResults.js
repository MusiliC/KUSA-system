import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteScorer, getScorers } from "../../redux/actions/playerActions";
import { deleteResult, getResults } from "../../redux/actions/resultsActions";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";

export default function AdminResults() {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  //handling Results

  const results = useSelector((state) => state.resultsReducer);
  console.log(results);

  const handleResultDelete = (id) => {
    dispatch(deleteResult(id));
  };

  //handling top scorer

  const topScorer = useSelector((state) => state.playerReducer);

  const handlePlayerDelete = (id) => {
    dispatch(deleteScorer(id));
  };

  
  useEffect(() => {
    dispatch(getResults());
    dispatch(getScorers());
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
              results.map((teams) => (
                <li className="list-group-item">
                  {` ${teams.winningTeam} ${teams.winnerGoals} vs ${teams.loosingTeam} ${teams.looserGoals}`}

                  <i className="bi bi-pencil-square mx-3"></i>
                  <i
                    className="bi bi-trash-fill mx-2"
                    onClick={() => handleResultDelete(teams._id)}
                  ></i>
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
                    <tr>
                      <td>{player.scorer}</td>
                      <td>{player.scorerTeam}</td>
                      <td>{player.scorerGoals}</td>
                      <td>
                        <div className="d-flex justify-content-around align-items-center">
                          <i
                            className="bi bi-pencil-square"
                            onClick={() =>
                              navigate(`/admin/results}`)
                            }
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
