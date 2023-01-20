import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { geBestTeams, getTeams } from "../../redux/actions/teamsAction";
import "./table.css";
import {
  RegionsBestTeams,
  getRegions,
} from "../../redux/actions/regionalFixturesAction";
import { getEvents } from "../../redux/actions/eventsAction";
import { Header } from "../commons/Header";

const imgUrl = "http://localhost:5000/static";

function Table() {
  const teams = useSelector((state) => state.teamsReducer.allTeams);
  const events = useSelector((state) => state.eventsReducer.events);
  const topTeams = useSelector((state) => state.teamsReducer.topTeams);
  const RegionTeams = useSelector(
    (state) => state.regionFixturesReducer.regionTopTeams
  );

  let teamB = [];

  RegionTeams?.map((region) =>
    region.teams?.map((oneTeam) => teamB.push(oneTeam.team))
  );

  const allRegions = useSelector(
    (state) => state.regionFixturesReducer.regions
  );

  // let finalTeams = [];

  // topTeams.map((team) => finalTeams.push(team.team));

  const numTeams = topTeams.length;

  for (let i = 0; i < numTeams; i++) {
    teamB.push(`Team${i + 1}`);
  }

  let fixtures = [];
  for (let i = 0; i < numTeams / 2; i++) {
    let match = [teamB[i], teamB[numTeams - i - 1]];
    fixtures.push(match);
  }

  fixtures.forEach((match) => {
    // console.log(`${match[0]} vs ${match[1]}`);
  });

  const handleReport = () => {
    const input = document.getElementById("tables-page");
    html2canvas(input, {
      logging: true,
      letterRendering: 1,
      useCORS: true,
    }).then((canvas) => {
      const imgWidth = 208;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const imgData = canvas.toDataURL("img/png");
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("table.pdf");
    });
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTeams());
    dispatch(geBestTeams());
    dispatch(getRegions());
    dispatch(getEvents());
    dispatch(RegionsBestTeams());
  }, [dispatch]);

  return (
    <>
      <section id="tables-page">
        <Header>LEAGUE TABLES</Header>
        <div className="tb-bg"></div>

        <div className="container-lg">
          {/* <div className=" fs-2 mt-5 " id="league">
            League Table
          </div>

          <div className="underline mb-4"></div> */}

          <div className="row justify-content-center">
            <div className=" col-lg-12 mb-5">
              {allRegions?.map((regions, i1) => (
                <React.Fragment>
                  <div className="display-6 my-4">{regions?.name}</div>

                  <table className="table">
                    <thead className="border border-none bg-light table-bordered border-primary">
                      <tr id="t-head">
                        <th>Position</th>
                        <th>Team</th>
                        <th>Played</th>
                        <th>Won</th>
                        <th>Draw</th>
                        <th>Lost</th>
                        <th>Points</th>
                      </tr>
                    </thead>

                    <tbody>
                      {regions?.teams?.map((team, i) => (
                        <React.Fragment>
                          {teams?.length === 0 && (
                            <tr>
                              <td colSpan={20} className="text-center">
                                No teams to update table yet
                              </td>
                            </tr>
                          )}
                          <tr
                            id="result-data"
                            className="align-middle"
                            key={team._id}
                          >
                            <td className="px-3">{(i = i + 1)}</td>
                            <td className="flex  align-items-center">
                              <img
                                src={`${imgUrl}/${team?.image} `}
                                alt="logo"
                                className="logo me-2"
                              />
                              {team?.team}
                            </td>
                            <td>
                              <span>{team.wins + team.draws + team.lost}</span>
                            </td>
                            <td>{team.wins}</td>
                            <td>{team.draws}</td>
                            <td>{team.lost}</td>
                            <td>
                              {team.wins * 3 + team.draws * 1 + team.lost * 0}
                            </td>
                          </tr>
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </React.Fragment>
              ))}
              {/* <table className="table ">
                <thead className="border border-none bg-light table-bordered border-primary">
                  <tr id="t-head">
                    <th>Position</th>
                    <th>Team</th>
                    <th>Played</th>
                    <th>Won</th>
                    <th>Draw</th>
                    <th>Lost</th>
                    <th>Points</th>
                  </tr>
                </thead>
                <tbody className="border-top-0">
                  {teams?.length === 0 && (
                    <tr>
                      <td colSpan={20} className="text-center">
                        No teams to update table yet
                      </td>
                    </tr>
                  )}
                  {teams &&
                    teams.map((team, i) => (
                      <tr
                        id="result-data"
                        className="align-middle"
                        key={team._id}
                      >
                        <td className="px-3">{(i = i + 1)}</td>
                        <td className="flex  align-items-center">
                          <img
                            src={`${imgUrl}/${team?.image} `}
                            alt="logo"
                            className="logo me-2"
                          />
                          {team.team}
                        </td>
                        <td>
                          <span>{team.wins + team.draws + team.lost}</span>
                        </td>
                        <td>{team.wins}</td>
                        <td>{team.draws}</td>
                        <td>{team.lost}</td>
                        <td>
                          {team.wins * 3 + team.draws * 1 + team.lost * 0}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table> */}
              <div className=" ">
                <div className="text-center fs-2 mt-5 " id="league">
                  Nationals Fixtures
                </div>
                <div className="NationalsUnderline mb-5 mx-auto"></div>

                <div className="d-flex justify-content-around align-items-center">
                  <div className="my-3">
                    <Card>
                      <div className="m-3">
                        {events?.map((event) => (
                          <div className="fs-2">
                            <p>{event.name}</p>
                            <p>Date: {event.date}</p>
                            <p>Host: {event.host}</p>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>
                  <div>
                    <Card>
                      {fixtures?.map((match) => (
                        <Card.Text>
                          <div className="mx-4 my-2 fs-1">{`${match[0]} vs ${match[1]}`}</div>
                        </Card.Text>
                      ))}
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mb-4 justify-content-center">
            <div className="col-lg-4">
              <ul className="list-group">
                <li className="list-group-item">Win - 3 points</li>
                <li className="list-group-item">Draw - 1 point</li>
                <li className="list-group-item">Lost - 0 points</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <div className="container d-flex justify-content-center">
        <button
          onClick={() => handleReport()}
          className="btn btn-primary btn-lg mb-5"
        >
          Generate Report
        </button>
      </div>
      <section id="footer" className="bg-info">
        <footer className="footer mt-auto py-2">
          <div className="container">
            <div className="row text-dark justify-content-lg-start align-content-end">
              {/* <h5 className="ms-5">Links</h5> */}
              <div className="col-lg-2">
                <ul>
                  <Link to={"/home"} id="footer-links">
                    <li>Home</li>
                  </Link>
                  <Link to="/teams" id="footer-links">
                    <li>Teams</li>
                  </Link>
                </ul>
              </div>
              <div className="col-lg-2">
                <ul>
                  <Link to="/fixtures" id="footer-links">
                    <li>Fixtures</li>
                  </Link>
                  <Link to="/results" id="footer-links">
                    <li>Results</li>
                  </Link>
                </ul>
              </div>
              <div className="col-lg-2">
                <ul>
                  <Link to="/tables" id="footer-links">
                    <li>League table</li>
                  </Link>
                </ul>
              </div>
              <div className="col-lg-6">
                <div className="text-center">
                  This site is protected by the Google Privacy Policy and Terms
                  of Service apply.
                </div>
              </div>
            </div>
          </div>
        </footer>
      </section>
    </>
  );
}

export default Table;
