import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOneScore, updateScorers } from "../../redux/actions/playerActions";

function AdminScore() {
  let { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const onePlayer = useSelector((state) => state.playerReducer.player);
  // console.log(onePlayer);
  

  const [player, setPlayer] = useState({
    scorer: "",
    scorerTeam: "",
    scorerGoals: "",
  });

  const { scorer, scorerTeam, scorerGoals } = player;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateScorers(id, player))
    navigate("/admin/resultsUpdate")
  };

  useEffect(() => {
    dispatch(getOneScore(id));
  }, [dispatch,id]);

  useEffect(() => {
    if (onePlayer) {
      setPlayer({ ...onePlayer });
    }
  }, [onePlayer]);

  const handleInput = (e) => {
    setPlayer((v) => ({ ...v, [e.target.name]: e.target.value }));
  };

  return (
    <div className="container-lg">
      <div className="display-6 text-center my-4">Update</div>
      <div className="row justify-content-center">
        <div className="col-lg-5">
          <form action="">
            <div className="mb-2">
              <label htmlFor="" className="form-label">
                Enter goal scorer's name:
              </label>
              <input
                type="text"
                name="scorer"
                value={scorer}
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
                value={scorerTeam}
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
                value={scorerGoals}
                onChange={handleInput}
                className="form-control"
              />
            </div>
            <div className="d-flex justify-content-center">
              <button className="btn btn-primary my-2" onClick={handleSubmit}>
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminScore;
