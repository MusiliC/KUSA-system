import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTeams } from "../../redux/actions/teamsAction";

import "./teams.css";
import { getEvents } from "../../redux/actions/eventsAction";

const imgUrl = "http://localhost:5000/static";

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
      <section>
        <div className="big-image">
          <div className="overlay">
            <div className="container-lg">
              {/* <h3
               
                className="text-center display-6 mt-4 fw-bold"
              >
                KUSA Events and registered teams..
              </h3> */}
              <div className="row justify-content-between align-items-start py-3 ">
                <div className="col-lg-5 " id="eventSide">
                  <h3 className="text-center display-6" id="overlayTitle">
                    KUSA Events
                  </h3>
                  <div className="mainContainer mt-5">
                    {events?.length === 0 && (
                      <div className="mt-2">
                        <div className="text-center display-6 " id="noRegister">
                          No registered KUSA events yet..
                        </div>
                      </div>
                    )}
                    {events.map((event) => (
                      <div className="eachCard">
                        <h4 className="my-2">
                          <b> Event:</b> {event.name}
                        </h4>
                        <h5 className="my-3">
                          <b> Host: </b>
                          {event.host}
                        </h5>
                        <h5 className="my-2">
                          <b> Date:</b> {event.date}
                        </h5>
                      </div>
                    ))}
                  </div>
                </div>

                {/* registered teams */}

                <div className="col-lg-6  ">
                  <h3 className="text-center display-6 " id="overlayTitle">
                    Registered Teams
                  </h3>

                  <Table
                    striped
                    bordered
                    hover
                    className="teamsTable fw-bold mt-5"
                  >
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>University Name</th>
                        <th>Location</th>
                      </tr>
                    </thead>
                    <tbody>
                      {registeredTeams?.length === 0 && (
                        <tr>
                          <td colSpan={20} className="text-center fw-bold">
                            No Teams registered yet
                          </td>
                        </tr>
                      )}
                      {registeredTeams &&
                        registeredTeams.map((team, i) => (
                          <tr key={team._id} className="align-middle">
                            <td>{(i = i + 1)}</td>
                            <td className="d-flex align-items-center ">
                              <div className="mx-3 ">
                                <img
                                  src={`${imgUrl}/${team.image}`}
                                  alt=""
                                  // width={40}
                                  className="logo"
                                  srcset=""
                                />
                              </div>
                              {team.team}
                            </td>
                            <td className="">{team.county}</td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="footer" className="bg-info">
        <footer className="footer mt-auto py-3 ">
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
                    <li>Results</li>{" "}
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
          </div>{" "}
        </footer>{" "}
      </section>
      {/* <section className="registered-teams">
        <div className="container-lg">
          <div className="row pt-4 justify-content-center">
            <div className="fs-2 px-4 pt-2 text-center fw-bold">
              Teams Registered..
            </div>
          </div>
        </div>
      </section> */}
    </div>

    // <div>

    //   <section id="teams-page">

    //     <div className="container-lg">
    //       <h4 className="text-center display-6 mt-2 fw-bold" id="eventsTitle">
    //         KUSA Events
    //       </h4>
    //       <div className="row justify-content-around py-4">
    //         <div className="col-lg-6">
    //           <div >
    //             <img
    //               src="/pictures/cup.jpg"
    //               className="img-fluid"
    //               alt=""
    //               id="imageTwo"
    //             />
    //           </div>
    //         </div>
    //         <div className="col-lg-5" id="eventSide">
    //           <div className="mainContainer">
    //             {events?.length === 0 && (
    //               <div className="mt-5">
    //                 <div className="text-center display-6 mt-5">
    //                   No registered KUSA event yet..
    //                 </div>
    //               </div>
    //             )}
    //             {events.map((event) => (
    //               <div className="eachCard">
    //                 <h4 className="my-2">
    //                   <b> Event:</b> {event.name}
    //                 </h4>
    //                 <h5 className="my-3">
    //                   <b> Host: </b>
    //                   {event.host}
    //                 </h5>
    //                 <h5 className="my-2">
    //                   <b> Date:</b> {event.date}
    //                 </h5>
    //               </div>
    //             ))}
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </section>
    //   <section className="registered-teams">
    //     <div className="container-lg">
    //       <div className="row pt-4 justify-content-center">
    //         <div className="fs-2 px-4 pt-2"> Teams Registered..</div>
    //         {/* <div className="lead text-center">The registered teams...</div> */}

    //         <div className="col-lg-12 my-5 mt-4 mx-1 px-4">
    //           <Table striped bordered hover>
    //             <thead>
    //               <tr>
    //                 <th>#</th>
    //                 <th>University Name</th>
    //                 <th>Location</th>
    //               </tr>
    //             </thead>
    //             <tbody>
    //               {registeredTeams?.length === 0 && (
    //                 <tr>
    //                   <td colSpan={20} className="text-center">
    //                     No Teams registered yet
    //                   </td>
    //                 </tr>
    //               )}
    //               {registeredTeams &&
    //                 registeredTeams.map((team, i) => (
    //                   <tr key={team._id}>
    //                     <td>{(i = i + 1)}</td>
    //                     <td>{team.team}</td>
    //                     <td>{team.county}</td>
    //                   </tr>
    //                 ))}
    //             </tbody>
    //           </Table>
    //         </div>
    //       </div>
    //     </div>
    //   </section>
    //   <section id="footer" className="bg-info">
    //     <footer className="footer mt-auto py-3 ">
    //       <div className="container">
    //         <div className="row text-dark justify-content-lg-start align-content-end">
    //           {/* <h5 className="ms-5">Links</h5> */}
    //           <div className="col-lg-2">
    //             <ul>
    //               <Link to={"/home"} id="footer-links">
    //                 <li>Home</li>
    //               </Link>
    //               <Link to="/teams" id="footer-links">
    //                 <li>Teams</li>
    //               </Link>
    //             </ul>
    //           </div>
    //           <div className="col-lg-2">
    //             <ul>
    //               <Link to="/fixtures" id="footer-links">
    //                 <li>Fixtures</li>
    //               </Link>
    //               <Link to="/results" id="footer-links">
    //                 <li>Results</li>
    //               </Link>
    //             </ul>
    //           </div>
    //           <div className="col-lg-2">
    //             <ul>
    //               <Link to="/about" id="footer-links">
    //                 <li>About Us</li>
    //               </Link>
    //             </ul>
    //           </div>
    //           <div className="col-lg-6">
    //             <div className="text-center">
    //               This site is protected by the Google Privacy Policy and Terms
    //               of Service apply.
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </footer>
    //   </section>
    // </div>
  );
}
