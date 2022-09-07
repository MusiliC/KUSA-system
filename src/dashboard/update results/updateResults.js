import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postScorer } from "../../redux/actions/playerActions";
import { postResults } from "../../redux/actions/resultsActions";
import { getTeams } from "../../redux/actions/teamsAction";
// import Table from "react-bootstrap/Table";
import { useForm } from "react-hook-form";
import FormInputErrorAlert from "../../components/commons/FormInputErrorAlert";

export default function UpdateResults() {
  const teams = useSelector((state) => state.teamsReducer.allTeams);

  // State
  const [postingResult, setPostingResult] = useState(false);

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const handlePostResultSubmit = async (data) => {
    setPostingResult(true);
    await dispatch(postResults(data));
    setPostingResult(false);
    reset();
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
            <form onSubmit={handleSubmit(handlePostResultSubmit)}>
              <div className="mb-2">
                <label htmlFor="" className="form-label">
                  Select home team:
                </label>
                <select
                  name="homeTeam"
                  className="form-select"
                  id=""
                  {...register("homeTeam", {
                    required: {
                      value: true,
                      message: "Home team is required",
                    },
                  })}
                >
                  <option value="">Select Home Team</option>
                  {teams.map((team) => (
                    <option key={team._id} value={team._id}>
                      {team.team}
                    </option>
                  ))}
                </select>
                {errors?.homeTeam && (
                  <FormInputErrorAlert message={errors?.homeTeam?.message} />
                )}
              </div>
              <div className="my-3">
                <label htmlFor="" className="form-label">
                  Select away team:
                </label>
                <select
                  name="awayTeam"
                  className="form-select"
                  id=""
                  {...register("awayTeam", {
                    required: {
                      value: true,
                      message: "Away team is required",
                    },
                  })}
                  disabled={watch("homeTeam") === ""}
                >
                  <option value="">Select Away Team</option>
                  {teams
                    ?.filter((team) => team?._id !== watch("homeTeam"))
                    .map((team) => (
                      <option key={team._id} value={team._id}>
                        {team.team}
                      </option>
                    ))}
                </select>
                {errors?.awayTeam && (
                  <FormInputErrorAlert message={errors?.awayTeam?.message} />
                )}
              </div>
              <div className="my-3">
                <label htmlFor="" className="form-label">
                  Goals scored by home team:
                </label>
                <input
                  type="number"
                  name="homeTeamGoals"
                  {...register("homeTeamGoals", {
                    required: {
                      value: true,
                      message: "Field is required",
                    },
                  })}
                  className="form-control"
                />
                {errors?.homeTeamGoals && (
                  <FormInputErrorAlert
                    message={errors?.homeTeamGoals?.message}
                  />
                )}
              </div>
              <div className="mb-2">
                <label htmlFor="" className="form-label">
                  Goals scored by away team:
                </label>
                <input
                  type="number"
                  name="awayTeamGoals"
                  {...register("awayTeamGoals", {
                    required: {
                      value: true,
                      message: "Field is required",
                    },
                  })}
                  className="form-control mb-2"
                />
                {errors?.awayTeamGoals && (
                  <FormInputErrorAlert
                    message={errors?.awayTeamGoals?.message}
                  />
                )}
              </div>
              <div className="d-flex justify-content-center">
                <button
                  disabled={postingResult}
                  className="btn btn-primary my-2"
                >
                  {postingResult ? "Loading..." : "Post Results"}
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
