import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTeams } from "../../redux/actions/teamsAction";

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
        <div className="container-lg">
          <div className="text-center fs-2 my-4">Updated League Table</div>
          <div className="row justify-content-center">
            <div className="col-lg-8">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Team</th>
                            <th>Played</th>
                            <th>Won</th>
                            <th>Draw</th>
                            <th>Lost</th>
                            <th>Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            teams && teams.map((team, i) => (
                               <tr>
                                <td>{i = i+1}</td>
                                <td>{team.team}</td>
                                <td>{team.wins + team.draws + team.lost}</td>
                                <td>{team.wins}</td>
                                <td>{team.draws}</td>
                                <td>{team.lost}</td>
                                <td>{team.wins*3 + team.draws*1 + team.lost*0}</td>
                               </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Table;
