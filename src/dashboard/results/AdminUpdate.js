import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getOneResult,
  updatedResults,
} from "../../redux/actions/resultsActions";

function AdminUpdate() {
  const results = useSelector((state) => state.resultsReducer.result);
 

  const dispatch = useDispatch();
  const navigate = useNavigate();

  let { id } = useParams();

  const [newResults, setNewResults] = useState({
    homeTeam: "",
    awayTeam: "",
    homeTeamGoals: "",
    awayTeamGoals: "",
  });

  const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = newResults;

  const handleInputChange = (e) => {
    setNewResults((v) => ({ ...v, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updatedResults(id, newResults));
    navigate("/admin/resultsUpdate");
  };

  useEffect(() => {
    if (results) {
      setNewResults({ ...results });
    }
  }, [results]);

  useEffect(() => {
    dispatch(getOneResult(id));
  }, [dispatch, id]);

  return (
    <div className="container-lg">
      <div className="row justify-content-center">
        <div className="text-center display-6 my-3">Results Update</div>
        <div className="col-lg-6  ">
          <form action="">
            <div className="mb-2">
              <label htmlFor="" className="form-label">
                Enter home team:
              </label>
              <input
                type="text"
                name="homeTeam"
                value={homeTeam}
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
                value={awayTeam}
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
                value={homeTeamGoals}
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
                value={awayTeamGoals}
                onChange={handleInputChange}
                className="form-control mb-2"
              />
            </div>
            <div className="d-flex justify-content-center">
              <button className="btn btn-primary my-2" onClick={handleSubmit}>
                Update Results
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminUpdate;
