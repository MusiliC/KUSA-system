import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTeams } from "../../redux/actions/teamsAction";
import { postScorer } from "../../redux/actions/playerActions";
import { useForm } from "react-hook-form";
import Select from "react-select";

function Scorer() {
  const teams = useSelector((state) => state.teamsReducer.allTeams);

  // State
  const [postingResult, setPostingResult] = useState(false);

  const [scorer, setScorer] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    reset,

  } = useForm();

  const dispatch = useDispatch();

  //select Team

  const selectedTeam = watch("scorerTeam");

  const selectedTeamObj = useMemo(
    () => teams.find((t) => t._id === selectedTeam),
    [teams, selectedTeam]
  );
  const selectedTeamPlayers = selectedTeamObj
    ? selectedTeamObj?.players.split(",")
    : [];

  const handlePlayer = (data) => {
    const obj = {
      ...data,
      scorer: scorer ? scorer.map((val) => val.value) : ["none"],
    };

   
    setPostingResult(true);
    dispatch(postScorer(obj));
    setPostingResult(false);
    reset();
  };

  useEffect(() => {
    dispatch(getTeams());
  }, [dispatch]);

  return (
    <div>
      <div className="container-lg">
        <div className="text-center display-6 my-3">Post Top Scorer</div>
        <div className="row justify-content-around">
          <div className="col-lg-6">
            <form action="" onSubmit={handleSubmit(handlePlayer)}>
              <div className="mb-4">
                <div className="mb-4">
                  <label htmlFor="" className="form-label">
                    Select goal scorer's team:
                  </label>

                  <select
                    name="scorerTeam"
                    className="form-select"
                    id=""
                    {...register("scorerTeam", {
                      required: {
                        value: true,
                        message: "scorer team is required",
                      },
                    })}
                  >
                    <option value="">Select Scorer Team</option>
                    {teams.map((team) => (
                      <option key={team._id} value={team._id}>
                        {team.team}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="" className="form-label">
                  Enter goal scorer's name:
                </label>

                <Select
                  name="scorer"
                  value={scorer}
                  onChange={(value) => setScorer(value)}
                  options={selectedTeamPlayers.map((p) => ({
                    label: p,
                    value: p,
                  }))}
                  isMulti
                />
              </div>

              <div className="mb-2">
                <label htmlFor="" className="form-label">
                  Enter number of goals:
                </label>
                <input
                  type="number"
                  name="scorerGoals"
                  {...register("scorerGoals", {
                    required: {
                      value: true,
                      message: "Field is required",
                    },
                  })}
                  className="form-control"
                />
              </div>
              <div className="d-flex justify-content-center">
                <button
                  disabled={postingResult}
                  className="btn btn-lg btn-primary my-2"
                >
                  {postingResult ? "Loading..." : "Post Results"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Scorer;
