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
        <div className="row justify-content-center">
          <div className="col-lg-7">
            <form
              onSubmit={handleSubmit(handlePostResultSubmit)}
              className="d-flex justify-content-around"
            >
              <div className="mb-2 me-4 w-50" id="homeTeamForm">
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

                <div className="mb-2">
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

                {/* shots */}

                <div className="mb-3">
                  <label htmlFor="" className="form-label">
                    Total shots by home team:
                  </label>
                  <input
                    type="number"
                    name="homeTeamShots"
                    {...register("homeTeamShots", {
                      required: {
                        value: true,
                        message: "Field is required",
                      },
                    })}
                    className="form-control"
                  />
                  {errors?.homeTeamShots && (
                    <FormInputErrorAlert
                      message={errors?.homeTeamShots?.message}
                    />
                  )}
                </div>

                {/* fouls */}

                <div className="mb-3">
                  <label htmlFor="" className="form-label">
                    Total fouls by home team:
                  </label>
                  <input
                    type="number"
                    name="homeTeamFouls"
                    {...register("homeTeamFouls", {
                      required: {
                        value: true,
                        message: "Field is required",
                      },
                    })}
                    className="form-control"
                  />
                  {errors?.homeTeamFouls && (
                    <FormInputErrorAlert
                      message={errors?.homeTeamFouls?.message}
                    />
                  )}
                </div>

                {/* yellow cards */}

                <div className="mb-3">
                  <label htmlFor="" className="form-label">
                    Total yellow cards by home team:
                  </label>
                  <input
                    type="number"
                    name="homeTeamYellow"
                    {...register("homeTeamYellow", {
                      required: {
                        value: true,
                        message: "Field is required",
                      },
                    })}
                    className="form-control"
                  />
                  {errors?.homeTeamYellow && (
                    <FormInputErrorAlert
                      message={errors?.homeTeamYellow?.message}
                    />
                  )}
                </div>

                {/* player with yellow cards */}

                <div className="mb-3">
                  <label htmlFor="" className="form-label">
                    Players with yellow card:
                  </label>
                  <input
                    type="text"
                    name="homeTeamYellowPlayers"
                    {...register("homeTeamYellowPlayers", {})}
                    className="form-control"
                  />
                  {errors?.homeTeamYellowPlayers && (
                    <FormInputErrorAlert
                      message={errors?.homeTeamYellowPlayers?.message}
                    />
                  )}
                </div>

                {/* red cards */}

                <div className="mb-3">
                  <label htmlFor="" className="form-label">
                    Total red cards by home team:
                  </label>
                  <input
                    type="number"
                    name="homeTeamRed"
                    {...register("homeTeamRed", {
                      required: {
                        value: true,
                        message: "Field is required",
                      },
                    })}
                    className="form-control"
                  />
                  {errors?.homeTeamRed && (
                    <FormInputErrorAlert
                      message={errors?.homeTeamRed?.message}
                    />
                  )}
                </div>

                {/*players with red cards */}

                <div className="mb-3">
                  <label htmlFor="" className="form-label">
                    Players with red card:
                  </label>
                  <input
                    type="text"
                    name="homeTeamRedPlayers"
                    {...register("homeTeamRedPlayers", {})}
                    className="form-control"
                  />
                  {errors?.homeTeamRedPlayers && (
                    <FormInputErrorAlert
                      message={errors?.homeTeamRedPlayers?.message}
                    />
                  )}
                </div>
              </div>

              {/* away team form */}

              <div className="mb-2 w-50" id="awayTeamForm">
                <div className="mb-2">
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

                {/* shots */}

                <div className="mb-3">
                  <label htmlFor="" className="form-label">
                    Total shots by away team:
                  </label>
                  <input
                    type="number"
                    name="awayTeamShots"
                    {...register("awayTeamShots", {
                      required: {
                        value: true,
                        message: "Field is required",
                      },
                    })}
                    className="form-control"
                  />
                  {errors?.awayTeamShots && (
                    <FormInputErrorAlert
                      message={errors?.awayTeamShots?.message}
                    />
                  )}
                </div>

                {/* fouls */}

                <div className="mb-3">
                  <label htmlFor="" className="form-label">
                    Total fouls by away team:
                  </label>
                  <input
                    type="number"
                    name="awayTeamFouls"
                    {...register("awayTeamFouls", {
                      required: {
                        value: true,
                        message: "Field is required",
                      },
                    })}
                    className="form-control"
                  />
                  {errors?.awayTeamFouls && (
                    <FormInputErrorAlert
                      message={errors?.awayTeamFouls?.message}
                    />
                  )}
                </div>

                {/* yellow cards */}

                <div className="mb-3">
                  <label htmlFor="" className="form-label">
                    Total yellow cards by away team:
                  </label>
                  <input
                    type="number"
                    name="awayTeamYellow"
                    {...register("awayTeamYellow", {
                      required: {
                        value: true,
                        message: "Field is required",
                      },
                    })}
                    className="form-control"
                  />
                  {errors?.awayTeamYellow && (
                    <FormInputErrorAlert
                      message={errors?.awayTeamYellow?.message}
                    />
                  )}
                </div>

                {/* players with yellow cards */}
                <div className="mb-3">
                  <label htmlFor="" className="form-label">
                    Players with yellow cards:
                  </label>
                  <input
                    type="text"
                    name=" awayTeamYellowPlayers"
                    {...register("awayTeamYellowPlayers", {})}
                    className="form-control"
                  />
                  {errors?.awayTeamYellowPlayers && (
                    <FormInputErrorAlert
                      message={errors?.awayTeamYellowPlayers?.message}
                    />
                  )}
                </div>

                {/* total red cards */}

                <div className="mb-3">
                  <label htmlFor="" className="form-label">
                    Total red cards by away team:
                  </label>
                  <input
                    type="number"
                    name="awayTeamRed"
                    {...register("awayTeamRed", {
                      required: {
                        value: true,
                        message: "Field is required",
                      },
                    })}
                    className="form-control"
                  />
                  {errors?.awayTeamRed && (
                    <FormInputErrorAlert
                      message={errors?.awayTeamRed?.message}
                    />
                  )}
                </div>

                {/*players with red cards */}

                <div className="mb-3">
                  <label htmlFor="" className="form-label">
                    Players with red cards:
                  </label>
                  <input
                    type="text"
                    name="awayTeamRedPlayers"
                    {...register("awayTeamRedPlayers", {})}
                    className="form-control"
                  />
                  {errors?.awayTeamRedPlayers && (
                    <FormInputErrorAlert
                      message={errors?.awayTeamRedPlayers?.message}
                    />
                  )}
                </div>

                {/* Button */}

                <div className="d-flex justify-content-center">
                  <button
                    disabled={postingResult}
                    className="btn btn-primary my-2"
                  >
                    {postingResult ? "Loading..." : "Post Results"}
                  </button>
                </div>
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
