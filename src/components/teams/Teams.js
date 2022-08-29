import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTeams } from "../../redux/actions/teamsAction";

import "./teams.css";
import { getEvents } from "../../redux/actions/eventsAction";

export default function Teams() {
  const dispatch = useDispatch();
  const registeredTeams = useSelector((state) => state.teamsReducer.allTeams);

    
    const events = useSelector((state) => state.eventsReducer.events);   

  

    useEffect(() => {
      dispatch(getEvents());
    }, [dispatch]);

  useEffect(() => {
    dispatch(getTeams());
  }, [dispatch]);

  return (
    <div>
      <section id="teams-page">
        <div className="container-lg">
          <div className="row justify-content-around my-4">
            <h4 className="text-center display-6 " id="eventsTitle">
              KUSA Events
            </h4>
            {events.map((event) => (
              <div className="col-9 col-lg-4 col-xl-3 my-2" id="main-card">
                <div className="card mt-2" key={event._id}>
                  <img
                    src="/pictures/fixtures.jpg"
                    alt=""
                    className="card-img-top"
                  />
                  <div id="card-bg">
                    <div className="card-body">
                      <div className="card-title text-center">
                        <h2>{event.name}</h2>
                      </div>
                      <div className="card-text lead text-center" id="cardText">
                        Date: {event.date}
                      </div>
                      <div className="card-text lead text-center" id="cardText">
                        Host: {event.host}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>
      <section className="registered-teams">
        <div className="row mt-4 justify-content-center">
          <div className="display-6 text-center fw-bold mt-4"> Teams</div>
          <div className="lead text-center">The registered teams...</div>

          <div className="col-lg-6 my-5 mt-4 mx-1">
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
                      <td>{team.county}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        </div>
      </section>
      <section id="footer" className="bg-dark">
        <footer className="footer mt-auto py-3 ">
          <div className="container">
            <div className="row text-light justify-content-lg-start align-content-end">
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
                  <Link to="/about" id="footer-links">
                    <li>About Us</li>
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
    </div>
  );
}
