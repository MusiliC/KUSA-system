import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOneResult, updatedResults } from "../../redux/actions/resultsActions";

function AdminUpdate() {
  const results = useSelector((state) => state.resultsReducer.result);

  const dispatch = useDispatch();
  const navigate = useNavigate()

  let { id } = useParams();

  const [newResults, setNewResults] = useState({
    winningTeam: "",
    loosingTeam: "",
    winnerGoals: "",
    looserGoals: "",
  });

  const { winningTeam, loosingTeam, winnerGoals, looserGoals } = newResults;

  const handleInputChange = (e) => {
    setNewResults((v) => ({ ...v, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updatedResults(id, newResults))
    navigate("/admin/resultsUpdate")
  };

  useEffect(() => {
    if (results) {
      setNewResults({ ...results });

    }
  }, [results]);

  useEffect(() => {
    dispatch(getOneResult(id));
  }, [id]);

  return (
    <div className="container-lg">
      <div className="row">
        <div className="text-center display-6 my-3">Results Update</div>
        <div className="col-lg-6">
          <form action="">
            <div className="mb-2">
              <label htmlFor="" className="form-label">
                Enter winning team:
              </label>
              <input
                type="text"
                name="winningTeam"
                value={winningTeam}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="mb-2">
              <label htmlFor="" className="form-label">
                Enter loosing team:
              </label>
              <input
                type="text"
                name="loosingTeam"
                value={loosingTeam}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="mb-2">
              <label htmlFor="" className="form-label">
                Goals scored by winning team:
              </label>
              <input
                type="number"
                name="winnerGoals"
                value={winnerGoals}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="mb-2">
              <label htmlFor="" className="form-label">
                Goals scored by loosing team:
              </label>
              <input
                type="number"
                name="looserGoals"
                value={looserGoals}
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
