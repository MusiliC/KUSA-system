import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useMemo } from "react";
import { getTeams } from "../../redux/actions/teamsAction";
import { useForm } from "react-hook-form";
import Select from "react-select";
import FormInputErrorAlert from "../../components/commons/FormInputErrorAlert";

import io from "socket.io-client";
const socket = io("http://localhost:3002");

export default function LiveScore() {
  const teams = useSelector((state) => state.teamsReducer.allTeams);

  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(false);
  const [gamePause, setGamePause] = useState(false);

  //selected home event value

  const [homeSelected, setHomeSelected] = useState("");

  const homeTeamEvent = async (event) => {
    await setHomeSelected(event.target.value);
  };

  //select away event value

  const [awaySelected, setAwaySelected] = useState("");

  const awayTeamEvent = async (event) => {
    await setAwaySelected(event.target.value);
  };

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,

    formState: { errors },
  } = useForm();

  // const [live, setLive] = useState({
  //   homeTeam: "",
  //   awayTeam: "",
  //   goalHomeTeam: "",
  //   goalTimeHomeTeam: "",
  //   goalAwayTeam: "",
  //   goalTimeAwayTeam: "",
  //   yellowHomeTeam: "",
  //   yellowTimeHomeTeam: "",
  //   yellowAwayTeam: "",
  //   yellowTimeAwayTeam: "",
  //   redHomeTeam: "",
  //   redTimeHomeTeam: "",
  //   redAwayTeam: "",
  //   redTimeAwayTeam: "",
  // });

  useEffect(() => {
    let interval = null;

    if (timerOn ) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timerOn]);

  // const handleInputChange = (e) => {
  //   setLive((v) => ({ ...v, [e.target.name]: e.target.value }));
  // };

  //react data handling

  const [homeTeamGoalScorer, setHomeTeamGoalScorer] = useState("");
  const [awayTeamGoalScorer, setAwayTeamGoalScorer] = useState("");
  const [homeTeamYellowPlayers, setHomeTeamYellowPlayers] = useState("");
  const [awayTeamYellowPlayers, setAwayTeamYellowPlayers] = useState("");
  const [homeTeamRedPlayers, setHomeTeamRedPlayers] = useState("");
  const [awayTeamRedPlayers, setAwayTeamRedPlayers] = useState("");

  //form select

  //homeTeam

  const selectedHomeTeam = watch("homeTeam");

  const selectedHomeTeamObj = useMemo(
    () => teams.find((t) => t.team === selectedHomeTeam),
    [teams, selectedHomeTeam]
  );
  const selectedHomeTeamPlayers = selectedHomeTeamObj
    ? selectedHomeTeamObj?.players.split(",")
    : [];

  //awayTeam

  const selectedAwayTeam = watch("awayTeam");

  const selectedAwayTeamObj = useMemo(
    () => teams.find((t) => t.team === selectedAwayTeam),
    [teams, selectedAwayTeam]
  );
  const selectedAwayTeamPlayers = selectedAwayTeamObj
    ? selectedAwayTeamObj?.players.split(",")
    : [];

  const handleGameSubmit = (live) => {
    const obj = {
      ...live,
      homeTeamGoalScorer: homeTeamGoalScorer
        ? homeTeamGoalScorer.map((val) => val.value)
        : ["none"],
      awayTeamGoalScorer: awayTeamGoalScorer
        ? awayTeamGoalScorer.map((val) => val.value)
        : ["none"],
      homeTeamYellowPlayers: homeTeamYellowPlayers
        ? homeTeamYellowPlayers?.map((val) => val.value)
        : ["none"],
      homeTeamRedPlayers: homeTeamRedPlayers
        ? homeTeamRedPlayers?.map((val) => val.value)
        : ["none"],
      awayTeamYellowPlayers: awayTeamYellowPlayers
        ? awayTeamYellowPlayers?.map((val) => val.value)
        : ["none"],
      awayTeamRedPlayers: awayTeamRedPlayers
        ? awayTeamRedPlayers?.map((val) => val.value)
        : ["none"],
    };


    socket.emit("live_score", { obj });
    socket.emit("game_time", { gamePause });
  };

  const handleTime = () => {
    if (timerOn) {
      socket.emit("game_time", { gamePause });
    } else if (!timerOn && time > 0) {
      setGamePause(true);

      socket.emit("game_time", { gamePause: true });
    }
  };

  useEffect(() => {
    dispatch(getTeams());
  }, [dispatch]);



  return (
    <div className="container-lg">
      <div className="text-center">
        <p className="display-6 mt-3">Live Score</p>
      </div>

      <div className="d-flex justify-content-center mb-1 fs-4">
        <span className="mx-1">
          {("0" + Math.floor((time / 60000) % 60)).slice(-2)} :
        </span>
        <span className="mx-1">
          {("0" + Math.floor((time / 1000) % 60)).slice(-2)} :
        </span>
        <span className="mx-1">{("0" + ((time / 10) % 100)).slice(-2)}</span>
      </div>
      <div className="d-flex  justify-content-center mb-1">
        {!timerOn && time === 0 && (
          <button
            className="btn btn-primary mb-2 mx-2"
            onClick={() => setTimerOn(true)}
          >
            Start
          </button>
        )}

        {timerOn && (
          <button
            className="btn btn-primary mb-2 mx-2"
            onClick={() => {
              setTimerOn(false);
              setGamePause(true);
            }}
          >
            Stop
          </button>
        )}

        {!timerOn && time !== 0 && (
          <button
            className="btn btn-primary mb-2 mx-2"
            onClick={() => {
              setTimerOn(true);
              setGamePause(false);
            }}
          >
            Resume
          </button>
        )}

     
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-8 mt-1">
          <form
            onSubmit={handleSubmit(handleGameSubmit)}
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
                    <option key={team._id} value={team.team}>
                      {team.team}
                    </option>
                  ))}
                </select>
                {errors?.homeTeam && (
                  <FormInputErrorAlert message={errors?.homeTeam?.message} />
                )}
              </div>

              <div className="mb-2 mt-3">
                <label htmlFor="" className="form-label h5 my-2">
                  Select game event for Home Team
                </label>
                <select
                  className="form-select mt-2"
                  id="homeTeamEvent"
                  aria-label="Default select example"
                  value={homeSelected}
                  onChange={homeTeamEvent}
                >
                  <option defaultValue={"event"}> Home Game events</option>
                  <option value="homeGoalScored">Goal scoring event</option>
                  <option value="homeYellowCard">Yellow Card event</option>
                  <option value="homeRedCard">Red Card event</option>
                </select>
              </div>

              {homeSelected === "homeGoalScored" ? (
                <div>
                  <div className="mb-2">
                    <label htmlFor="" className="form-label">
                      Goal scored by home team:
                    </label>
                    <input
                      type="number"
                      name="homeTeamGoals"
                      {...register("homeTeamGoals", {
                        required: {
                          value: false,
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

                  {/* goal scored time */}

                  <div className="mb-2">
                    <label htmlFor="" className="form-label">
                      Time Goal scored by home team:
                    </label>
                    <input
                      type="number"
                      name="homeTeamGoalsTime"
                      {...register("homeTeamGoalsTime", {
                        required: {
                          value: false,
                          message: "Field is required",
                        },
                      })}
                      className="form-control"
                    />
                    {errors?.homeTeamGoals && (
                      <FormInputErrorAlert
                        message={errors?.homeTeamGoalsTime?.message}
                      />
                    )}
                  </div>

                  {/* goal scorers */}

                  <div className="mb-2">
                    <label htmlFor="" className="form-label">
                      Goals scorer of home team:
                    </label>

                    <Select
                      name="homeTeamGoalScorer"
                      value={homeTeamGoalScorer}
                      onChange={(value) => setHomeTeamGoalScorer(value)}
                      options={selectedHomeTeamPlayers.map((p) => ({
                        label: p,
                        value: p,
                      }))}
                      isMulti
                    />

                    {errors?.homeTeamGoals && (
                      <FormInputErrorAlert
                        message={errors?.homeTeamGoals?.message}
                      />
                    )}
                  </div>
                </div>
              ) : homeSelected === "homeYellowCard" ? (
                <div>
                  {/* yellow cards */}

                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Number of yellow cards by home team:
                    </label>
                    <input
                      type="number"
                      name="homeTeamYellow"
                      {...register("homeTeamYellow", {
                        required: {
                          value: false,
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
                      Player with yellow card by home team:
                    </label>

                    <Select
                      value={homeTeamYellowPlayers}
                      onChange={(value) => setHomeTeamYellowPlayers(value)}
                      options={selectedHomeTeamPlayers.map((p) => ({
                        label: p,
                        value: p,
                      }))}
                      isMulti
                    />
                    {errors?.homeTeamYellowPlayers && (
                      <FormInputErrorAlert
                        message={errors?.homeTeamYellowPlayers?.message}
                      />
                    )}
                  </div>
                </div>
              ) : homeSelected === "homeRedCard" ? (
                <div>
                  {/* red cards */}

                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Number of red cards by home team:
                    </label>
                    <input
                      type="number"
                      name="homeTeamRed"
                      {...register("homeTeamRed", {
                        required: {
                          value: false,
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
                      Players with red card by home team:
                    </label>

                    <Select
                      value={homeTeamRedPlayers}
                      onChange={(value) => setHomeTeamRedPlayers(value)}
                      options={selectedHomeTeamPlayers.map((p) => ({
                        label: p,
                        value: p,
                      }))}
                      isMulti
                    />
                    {errors?.homeTeamRedPlayers && (
                      <FormInputErrorAlert
                        message={errors?.homeTeamRedPlayers?.message}
                      />
                    )}
                  </div>
                </div>
              ) : (
                <div className="h5 text-muted mt-4">
                  <p>Select a game event above</p>
                </div>
              )}

              <button
                type="button"
                className="btn btn-primary my-2"
                onClick={handleTime}
              >
                Start game time
              </button>
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
                      <option key={team._id} value={team.team}>
                        {team.team}
                      </option>
                    ))}
                </select>
                {errors?.awayTeam && (
                  <FormInputErrorAlert message={errors?.awayTeam?.message} />
                )}
              </div>

              <div className="mb-2 mt-3">
                <label htmlFor="" className="form-label h5 my-2">
                  Select Game event by Away team:
                </label>
                <select
                  className="form-select mt-2"
                  aria-label="Default select example"
                  value={awaySelected}
                  onChange={awayTeamEvent}
                >
                  <option defaultValue={"event"}>Away Game Events </option>
                  <option value="awayGoalScored">Goal scoring event</option>
                  <option value="awayYellowCard">Yellow Card event</option>
                  <option value="awayRedCard">Red Card event</option>
                </select>
              </div>

              {awaySelected === "awayGoalScored" ? (
                <div>
                  <div className="mb-2">
                    <label htmlFor="" className="form-label">
                      Goals scored by away team:
                    </label>
                    <input
                      type="number"
                      name="awayTeamGoals"
                      {...register("awayTeamGoals", {
                        required: {
                          value: false,
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

                  {/* time goal scored */}

                  <div className="mb-2">
                    <label htmlFor="" className="form-label">
                      Time Goal scored by away team:
                    </label>
                    <input
                      type="number"
                      name="awayTeamGoalsTime"
                      {...register("awayTeamGoalsTime", {
                        required: {
                          value: false,
                          message: "Field is required",
                        },
                      })}
                      className="form-control mb-2"
                    />
                    {errors?.awayTeamGoals && (
                      <FormInputErrorAlert
                        message={errors?.awayTeamGoalsTime?.message}
                      />
                    )}
                  </div>

                  {/* away team goal scorers */}

                  <div className="mb-2">
                    <label htmlFor="" className="form-label">
                      Goal scorer of away team:
                    </label>

                    <Select
                      value={awayTeamGoalScorer}
                      onChange={(value) => setAwayTeamGoalScorer(value)}
                      options={selectedAwayTeamPlayers.map((p) => ({
                        label: p,
                        value: p,
                      }))}
                      isMulti
                    />
                    {errors?.awayTeamGoals && (
                      <FormInputErrorAlert
                        message={errors?.awayTeamGoals?.message}
                      />
                    )}
                  </div>
                </div>
              ) : awaySelected === "awayYellowCard" ? (
                <div>
                  {/* yellow cards */}

                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Number of yellow cards by away team:
                    </label>
                    <input
                      type="number"
                      name="awayTeamYellow"
                      {...register("awayTeamYellow", {
                        required: {
                          value: false,
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
                      Player with yellow cards away team:
                    </label>

                    <Select
                      value={awayTeamYellowPlayers}
                      onChange={(value) => setAwayTeamYellowPlayers(value)}
                      options={selectedAwayTeamPlayers.map((p) => ({
                        label: p,
                        value: p,
                      }))}
                      isMulti
                    />
                    {errors?.awayTeamYellowPlayers && (
                      <FormInputErrorAlert
                        message={errors?.awayTeamYellowPlayers?.message}
                      />
                    )}
                  </div>
                </div>
              ) : awaySelected === "awayRedCard" ? (
                <div>
                  {/* total red cards */}

                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Number of red cards by away team:
                    </label>
                    <input
                      type="number"
                      name="awayTeamRed"
                      {...register("awayTeamRed", {
                        required: {
                          value: false,
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
                      Players with red card for away team:
                    </label>

                    <Select
                      value={awayTeamRedPlayers}
                      onChange={(value) => setAwayTeamRedPlayers(value)}
                      options={selectedAwayTeamPlayers.map((p) => ({
                        label: p,
                        value: p,
                      }))}
                      isMulti
                    />
                    {errors?.awayTeamRedPlayers && (
                      <FormInputErrorAlert
                        message={errors?.awayTeamRedPlayers?.message}
                      />
                    )}
                  </div>
                </div>
              ) : (
                <div className="h5 text-muted mt-4">
                  <p>Select a game event above</p>
                </div>
              )}

              {/* Button */}

              <div className="d-flex justify-content-center"></div>
              <button className="btn btn-primary my-2 mx-2">
                Update Scores
              </button>
            </div>
          </form>
          <div className="d-flex justify-content-center"></div>
        </div>
      </div>
    </div>
  );
}
