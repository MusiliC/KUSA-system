import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTeams } from "../../redux/actions/teamsAction";
import "./table.css"

function Table() {
  const teams = useSelector((state) => state.teamsReducer.allTeams);
  console.log(teams);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTeams());
  }, [dispatch]);

  return (
    <>
      <section id="tables-page">
        <div className="tb-bg"></div>
        <div className="container-lg">
          <div className=" fs-2 mt-5 " id="league">
            League Table
          </div>
          <div className="underline mb-4"></div>
          <div className="row justify-content-center">
            <div className="col-lg-12 mb-5">
              <table className="table ">
                <thead className="border border-none bg-light">
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
                  {teams &&
                    teams.map((team, i) => (
                      <tr id="result-data">
                        <td className="px-3">{(i = i + 1)}</td>
                        <td>{team.team}</td>
                        <td>{team.wins + team.draws + team.lost}</td>
                        <td>{team.wins}</td>
                        <td>{team.draws}</td>
                        <td>{team.lost}</td>
                        <td>
                          {team.wins * 3 + team.draws * 1 + team.lost * 0}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
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
