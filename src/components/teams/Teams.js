import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { getTeams } from "../../redux/actions/teamsAction";

export default function Teams() {
  const dispatch = useDispatch();
  const registeredTeams = useSelector((state) => state.teamsReducer);  

  useEffect(() => {
    dispatch(getTeams());
  }, [dispatch]);
  
  return (
    <div>
      <section id="teams-page">
        <div className="container-lg">
          <div className="row justify-content-around my-3">
            <h4 className="text-center display-6">KUSA Events</h4>
            <div className="col-9 col-lg-4 col-xl-3 my-2">
              <div className="card mt-2">
                <img
                  src="/pictures/tartan-track-g1c231e301_1920.jpg"
                  alt=""
                  className="card-img-top"
                />
                <div className="card-body">
                  <div className="card-title">
                    <h5>KUSA Play Offs Round 1</h5>
                  </div>
                  <div className="card-text">Date: 12/4/2022</div>
                  <div className="card-text">Host: Meru University</div>
                </div>
              </div>
            </div>
            <div className="col-9 col-lg-4 col-xl-3 my-2">
              <div className="card mt-2">
                <img
                  src="/pictures/chess-3325010_1920.jpg"
                  alt=""
                  className="card-img-top"
                />
                <div className="card-body">
                  <div className="card-title">
                    <h5>KUSA Play Offs Round 2</h5>
                  </div>
                  <div className="card-text">Date: 12/4/2022</div>
                  <div className="card-text">Host: Karatina University</div>
                </div>
              </div>
            </div>
            <div className="col-9 col-lg-4 col-xl-3 my-2">
              <div className="card mt-2">
                <img
                  src="/pictures/basketball-933173_1920.jpg"
                  alt=""
                  className="card-img-top"
                />
                <div className="card-body">
                  <div className="card-title">
                    <h5>KUSA Nationals</h5>
                  </div>
                  <div className="card-text">Date: 12/4/2022</div>
                  <div className="card-text">Host: Kenyatta University</div>
                </div>
              </div>
            </div>
          </div>
          <div className="row my-4 justify-content-center">
            <div className="display-6 text-center"> Teams</div>
            <div className="lead text-center">The registered teams..</div>
            <div className="col-lg-8 my-5 mx-1">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    
                    <th>University Name</th>
                    <th>Location</th>
                  </tr>
                </thead>
                <tbody>
                  {registeredTeams &&
                    registeredTeams.map((team) => (
                      <tr key={team._id}>
                        <td>{team.team}</td>
                        <td>
                          {team.county},  {team.town}
                        </td>
                      </tr>
                    ))}
                  {/* <tr>
                    <td>1</td>
                    <td>Karatina Universiity</td>
                    <td>Karatina, Nyeri</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Kirinyaga Universiity</td>
                    <td>Kutus, Kirinyaga</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Chuka Universiity</td>
                    <td>Chuka, Meru</td>
                  </tr> */}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
