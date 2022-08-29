import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postScorer } from "../../redux/actions/playerActions";
import { postResults } from "../../redux/actions/resultsActions";
import { getTeams, updateWin } from "../../redux/actions/teamsAction";
// import Table from "react-bootstrap/Table";

export default function UpdateResults() {
  const dispatch = useDispatch();

  const points = useSelector((state) => state.teamsReducer.allTeams);
 console.log(points);

  const [newResults, setNewResults] = useState({
    homeTeam: "",
    awayTeam: "",
    homeTeamGoals: "",
    awayTeamGoals: "",
  });

  const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = newResults;

  //handling Results

  const handleInputChange = (e) => {
    setNewResults((v) => ({ ...v, [e.target.name]: e.target.value }));
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postResults(newResults));
    // if (homeTeamGoals > awayTeamGoals && homeTeam ===teamA) {
    //   dispatch(updateWin(teamA._id, homeTeam));
    // }
  };

  //handling top scorer

  const [player, setPlayer] = useState({
    scorer: "",
    scorerTeam: "",
    scorerGoals: "",
  });

  const handleInput = (e) => {
    setPlayer((v) => ({ ...v, [e.target.name]: e.target.value }));
  };

  const handlePlayer = (e) => {
    e.preventDefault();
    dispatch(postScorer(player));
  };

  useEffect(() => {
    dispatch(getTeams());
  }, [dispatch]);

  return (
    <div>
      <div className="container-lg">
        <div className="text-center display-6 my-3">Post Results</div>
        <div className="row justify-content-around">
          <div className="col-lg-4">
            <form action="">
              <div className="mb-2">
                <label htmlFor="" className="form-label">
                  Enter home team:
                </label>
                <input
                  type="text"
                  name="homeTeam"
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="mb-2">
                <label htmlFor="" className="form-label">
                  Enter away team:
                </label>
                <input
                  type="text"
                  name="awayTeam"
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="mb-2">
                <label htmlFor="" className="form-label">
                  Goals scored by home team:
                </label>
                <input
                  type="number"
                  name="homeTeamGoals"
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="mb-2">
                <label htmlFor="" className="form-label">
                  Goals scored by away team:
                </label>
                <input
                  type="number"
                  name="awayTeamGoals"
                  onChange={handleInputChange}
                  className="form-control mb-2"
                />
              </div>
              <div className="d-flex justify-content-center">
                <button className="btn btn-primary my-2" onClick={handleSubmit}>
                  Post Results
                </button>
              </div>
            </form>
          </div>
          <div className="col-lg-4">
            <form action="">
              <div className="mb-2">
                <label htmlFor="" className="form-label">
                  Enter goal scorer's name:
                </label>
                <input
                  type="text"
                  name="scorer"
                  onChange={handleInput}
                  className="form-control"
                />
              </div>
              <div className="mb-2">
                <label htmlFor="" className="form-label">
                  Enter goal scorer's team:
                </label>
                <input
                  type="text"
                  name="scorerTeam"
                  onChange={handleInput}
                  className="form-control"
                />
              </div>
              <div className="mb-2">
                <label htmlFor="" className="form-label">
                  Enter number of goals:
                </label>
                <input
                  type="number"
                  name="scorerGoals"
                  onChange={handleInput}
                  className="form-control"
                />
              </div>
              <div className="d-flex justify-content-center">
                <button className="btn btn-primary my-2" onClick={handlePlayer}>
                  Post
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
