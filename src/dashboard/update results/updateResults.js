import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { postResults } from "../../redux/actions/resultsActions";
import { getTeams } from "../../redux/actions/teamsAction";
import Select from "react-select";

import { useForm } from "react-hook-form";
import FormInputErrorAlert from "../../components/commons/FormInputErrorAlert";
import { getRegions } from "../../redux/actions/regionalFixturesAction";

export default function UpdateResults() {
  const teams = useSelector((state) => state.teamsReducer.allTeams);
  const allRegions = useSelector(
    (state) => state.regionFixturesReducer.regions
  );

  // State
  const [postingResult, setPostingResult] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("");

  // react select data handling

  const [homeTeamGoalScorer, setHomeTeamGoalScorer] = useState("");
  const [awayTeamGoalScorer, setAwayTeamGoalScorer] = useState("");
  const [homeTeamYellowPlayers, setHomeTeamYellowPlayers] = useState("");
  const [awayTeamYellowPlayers, setAwayTeamYellowPlayers] = useState("");
  const [homeTeamRedPlayers, setHomeTeamRedPlayers] = useState("");
  const [awayTeamRedPlayers, setAwayTeamRedPlayers] = useState("");

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  //handling results

  const handlePostResultSubmit = async (data) => {
    const obj = {
      ...data,
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

    setPostingResult(true);
    await dispatch(postResults(obj));

    setPostingResult(false);
    reset();
  };

  //react select result change

//   const selectedRegionTeam = allRegions.find((t) => t._id === selectedRegion);

// console.log(selectedRegionTeam.teams);
  //homeTeam

  const selectedHomeTeam = watch("homeTeam");

  const selectedHomeTeamObj = useMemo(
    () => teams.find((t) => t._id === selectedHomeTeam),
    [teams, selectedHomeTeam]
  );
  const selectedHomeTeamPlayers = selectedHomeTeamObj
    ? selectedHomeTeamObj?.players.split(",")
    : [];

  //awayTeam

  const selectedAwayTeam = watch("awayTeam");

  const selectedAwayTeamObj = useMemo(
    () => teams.find((t) => t._id === selectedAwayTeam),
    [teams, selectedAwayTeam]
  );
  const selectedAwayTeamPlayers = selectedAwayTeamObj
    ? selectedAwayTeamObj?.players.split(",")
    : [];

    console.log(selectedRegion);

  useEffect(() => {
    dispatch(getTeams());
    dispatch(getRegions());
  }, [dispatch]);

  return (
    <div>
      <div className="container-lg">
        <div className="text-center display-6 my-3">Post Results</div>

        <div className=" w-50 mx-auto mb-2">
          <label htmlFor="" className="form-label">
            Select region:
          </label>
          <select
            name="selectedRegion"
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="form-select mt-2"
          >
            <option value="">Select region</option>

            {allRegions?.map((region) => (
              <option value={region?._id} key={region?._id}>
                {region?.name}
              </option>
            ))}
          </select>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-7">
            <form onSubmit={handleSubmit(handlePostResultSubmit)}>
              {/* date */}
              <div className="mb-5 mt-2">
                <label htmlFor="" className="form-label">
                  Select match date:
                </label>

                <input
                  type="date"
                  name="matchDate"
                  {...register("matchDate", {
                    required: {
                      value: true,
                      message: "Field is required",
                    },
                  })}
                  className="form-control"
                />

                {errors?.matchDate && (
                  <FormInputErrorAlert message={errors?.matchDate?.message} />
                )}
              </div>

              {/* teams results */}
              <div className="d-flex justify-content-around">
                {/* home team */}
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
                      <FormInputErrorAlert
                        message={errors?.homeTeam?.message}
                      />
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

                  {/* goal scorers */}

                  <div className="mb-2">
                    <label htmlFor="" className="form-label">
                      Goals scorers of home team:
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
                      Players with yellow card by home team:
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
                      <FormInputErrorAlert
                        message={errors?.awayTeam?.message}
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

                  {/* away team goal scorers */}

                  <div className="mb-2">
                    <label htmlFor="" className="form-label">
                      Goals scorers of away team:
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
                      Players with yellow cards away team:
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
                      Players with red cards away team:
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
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
