import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getEvents } from "../../redux/actions/eventsAction";
import {
  allFixtures,
  generateFixtures,
} from "../../redux/actions/fixturesAction";


export default function GenerateFixtures() {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.eventsReducer.events);
  const comingFixtures = useSelector((state) => state.fixtureReducer.fixtures);

  const [selectedEventDisplay, setSelectedEventDisplay] = useState("");
  const [selectedEventGenerate, setSelectedEventGenerate] = useState("");

  const [generatingFixtures, setGeneratingFixtures] = useState(false);

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  const handleGenerate = async () => {
    setGeneratingFixtures(true);
    setSelectedEventDisplay("");
    await dispatch(generateFixtures(selectedEventGenerate));
    setGeneratingFixtures(false);
    setSelectedEventDisplay(selectedEventGenerate);
  };

  useEffect(() => {
    if (selectedEventDisplay) dispatch(allFixtures(selectedEventDisplay));
  }, [dispatch, selectedEventDisplay]);

  return (
    <div>
      <div className="container-lg">
        <div className="row justify-content-around">
          {/* <div className="col-lg-3">
            <div className="lead text-center my-4 text-bold">
              Registered teams
            </div>

            <ol className="list-group group list-group-numbered">
              {registeredTeams.map((teams) => (
                <li
                  className="list-group-item"
                  key={teams.name}
                >{`${teams.team}`}</li>
              ))}
            </ol>
          </div> */}

          <div className="card col-2 col-md-9 col-lg-6 mt-4">
            <div className="card-body">
              <div className="form-group">
                <label htmlFor="">Select Event To Generate Fixture</label>
                <select
                  value={selectedEventGenerate}
                  onChange={(e) => setSelectedEventGenerate(e.target.value)}
                  className="form-control mt-2"
                >
                  <option value="">Select Event</option>

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
            </div>
          </div>
          <div className="col-12">
            <div className="text-center lead py-4">Fixtures</div>

            <hr className="my-5" />
            <div className="form-group">
              <label htmlFor="">Select Event To Get Fixture</label>
              <select
                value={selectedEventDisplay}
                onChange={(e) => setSelectedEventDisplay(e.target.value)}
                className="form-control mt-2"
              >
                <option value="">Select Event</option>

                {events?.map((event) => (
                  <option value={event?._id} key={event?._id}>
                    {event?.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="my-">
              <table className="table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Away Team</th>
                    <th>Home Team</th>
                  </tr>
                </thead>
                <tbody>
                  {comingFixtures?.length === 0 && (
                    <tr>
                      <td colSpan={20} className="text-center">
                        No Fixture Found For Given Event
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
                              <tr>
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
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
