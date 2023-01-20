import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getEvents } from "../../redux/actions/eventsAction";
import {
  allFixtures,
  deleteFixtures,
  generateFixtures,
} from "../../redux/actions/fixturesAction";
import {
  allRegionsFixtures,
  generateRegionalFixtures,
  getRegions,
} from "../../redux/actions/regionalFixturesAction";

export default function GenerateFixtures() {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.eventsReducer.events);
  const allRegions = useSelector(
    (state) => state.regionFixturesReducer.regions
  );

  const comingFixtures = useSelector((state) => state.fixtureReducer.fixtures);
  const regionalFixtures = useSelector(
    (state) => state.regionFixturesReducer.fixtures
  );


  const [selectedEventDisplay, setSelectedEventDisplay] = useState("");
  const [selectedEventGenerate, setSelectedEventGenerate] = useState("");

  const [selectedRegionGenerate, setSelectedRegionGenerate] = useState("");
  const [selectedRegionDisplay, setSelectedRegionDisplay] = useState("");

  const [generatingFixtures, setGeneratingFixtures] = useState(false);

  useEffect(() => {
    dispatch(getEvents());
    dispatch(getRegions());
    dispatch(allRegionsFixtures());
  }, [dispatch]);

  const handleGenerate = async () => {
    setGeneratingFixtures(true);
    setSelectedEventDisplay("");
    await dispatch(generateFixtures(selectedEventGenerate));
    setGeneratingFixtures(false);
    setSelectedEventDisplay(selectedEventGenerate);
  };

  const handleRegionGenerate = async () => {
    setGeneratingFixtures(true);
    setSelectedRegionDisplay("");
    await dispatch(generateRegionalFixtures(selectedRegionGenerate));
    setGeneratingFixtures(false);
    setSelectedRegionDisplay(selectedRegionGenerate);
  };

  const handleDelete = (id) => {
    dispatch(deleteFixtures(id));
  };

  useEffect(() => {
    if (selectedEventDisplay) dispatch(allFixtures(selectedEventDisplay));
    if (selectedRegionDisplay)
      dispatch(allRegionsFixtures(selectedRegionDisplay));
  }, [dispatch, selectedEventDisplay, selectedRegionDisplay]);

  return (
    <div>
      <div className="container-lg">
        <div className="row justify-content-around">
          <div className="card col-lg-7 mt-4">
            {/* <div className="card-body">
              <div className="form-group">
                <label htmlFor="">Select event To Generate Fixture</label>
                <select
                  value={selectedEventGenerate}
                  onChange={(e) => setSelectedEventGenerate(e.target.value)}
                  className="form-control mt-2"
                >
                  <option value="">Select event</option>

                  {events?.map((event) => (
                    <option value={event?._id} key={event?._id}>
                      {event?.name}
                    </option>
                  ))}
                </select>
                <button
                  className="btn btn-primary mt-2"
                  onClick={handleGenerate}
                >
                  {generatingFixtures ? "Loading..." : "Generate Fixtures"}
                </button>
              </div>
            </div> */}
          </div>

          {/* regional fixtures */}

          <div className="card col-lg-7 mt-4">
            <div className="card-body">
              <div className="form-group">
                <label htmlFor="" className="fw-bold">
                  Select region To Generate Fixture
                </label>
                <select
                  value={selectedRegionGenerate}
                  onChange={(e) => setSelectedRegionGenerate(e.target.value)}
                  className="form-control mt-2"
                >
                  <option value="">Select region</option>

                  {allRegions?.map((region) => (
                    <option value={region?._id} key={region?._id}>
                      {region?.name}
                    </option>
                  ))}
                </select>
                <button
                  className="btn btn-primary mt-2"
                  onClick={handleRegionGenerate}
                >
                  {generatingFixtures
                    ? "Loading..."
                    : "Generate Region Fixtures"}
                </button>
              </div>
            </div>
          </div>

          {/* fixtures */}
          <div className="col-12">
            <div className="text-center lead py-2 fw-bold">Fixtures</div>

            <hr className="my-5 mt-4" />
            {/* <div className="form-group">
              <label htmlFor="">Select event To Get Fixtures</label>
              <select
                value={selectedEventDisplay}
                onChange={(e) => setSelectedEventDisplay(e.target.value)}
                className="form-select mt-2"
              >
                <option value="">Select event</option>

                {events?.map((event) => (
                  <option value={event?._id} key={event?._id}>
                    {event?.name}
                  </option>
                ))}
              </select>
            </div> */}

            {/* region fixtures */}

            {/* <div className="form-group my-3">
              <label htmlFor="" className="fw-bold">
                Select region To Get Fixtures
              </label>
              <select
                value={selectedRegionDisplay}
                onChange={(e) => setSelectedRegionDisplay(e.target.value)}
                className="form-select mt-2"
              >
                <option value="">Select Region</option>

                {allRegions?.map((region) => (
                  <option value={region?._id} key={region?._id}>
                    {region?.name}
                  </option>
                ))}
              </select>
            </div> */}

            <div className="my-2">
              {/* <table className="table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Home Team</th>
                    <th>Away Team</th>
                  </tr>
                </thead>
                <tbody>
                  {comingFixtures?.length === 0 && (
                    <tr>
                      <td colSpan={20} className="text-center">
                        No Fixture Found For Given event
                      </td>
                    </tr>
                  )}

                  {comingFixtures?.map((singleFixture, i1) => (
                    <React.Fragment>
                      {singleFixture?.fixture?.map((fixture, i2) => {
                        const date = Object.keys(fixture)[0];
                        const values = fixture[date];

                        return (
                          <React.Fragment>
                            {values?.map((value, i) => (
                              <tr key={value.time}>
                                <th>{new Date(date).toLocaleDateString()}</th>
                                <th>{value?.time}</th>
                                <th>{value?.awayTeam?.team}</th>
                                <th>{value?.homeTeam?.team}</th>
                              </tr>
                            ))}
                          </React.Fragment>
                        );
                      })}
                    </React.Fragment>
                  ))}
                </tbody>
              </table> */}

              {/* regional fixtures */}

              {regionalFixtures?.map((singleFixture, i1) => (
                <React.Fragment>
                  <p className="display-6 text-center my-3">
                    {singleFixture.region?.name}
                  </p>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Home Team</th>
                        <th>Away Team</th>
                      </tr>
                    </thead>
                    <tbody>
                      {singleFixture?.fixture?.map((fixture, i2) => {
                        const date = Object.keys(fixture)[0];
                        const values = fixture[date];

                        return (
                          <React.Fragment>
                            {values?.map((value, i) => (
                              <tr key={value.time}>
                                <th>{new Date(date).toLocaleDateString()}</th>
                                <th>{value?.time}</th>
                                <th>{value?.awayTeam?.team}</th>
                                <th>{value?.homeTeam?.team}</th>
                              </tr>
                            ))}
                          </React.Fragment>
                        );
                      })}
                    </tbody>
                  </table>
                </React.Fragment>
              ))}

              <div className="text-center">
                {/* <button type="button" className="btn btn-primary btn-lg my-3" onClick={() => handleDelete(value._id)}>
                  Delete Fixtures
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
