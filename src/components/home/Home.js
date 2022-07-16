import React from "react";
import { Link } from "react-router-dom";


import "./home.css";

export default function Home() {
  return (
    <>
      <section id="home">
      
        <div className="bg" id="home-bg">
          <div className="container-lg py-5 ">
            <div className="row justify-content-between">
              <div className="col-lg-4">
                <div className="display-3 text-center" id="title">
                  KUSA
                </div>
                <div className="lead text-center" id="title">
                  Games...
                </div>
                <div className="display-5 text-center my-5" id="subtitle">
                  Kenya <br /> Universities Sports <br /> Association
                </div>
              </div>
              <div className="col-lg-7">
                <img src="" className="img-fluid" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="rest-bg">
        <section id="about">
          <div className="container-lg">
            <div className="text-center">
              {/* <img
              src="/pictures/Screenshot_20220703-190052_3.png"
              alt=""
              className="img-fluid"
            /> */}
              <h3 className="mb-1 display-6">
                <b> Get started....</b>
              </h3>
            </div>
          </div>
        </section>
        {/* <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="text-center">
                <p>
                  <b>KUSA</b> - is the body that governs university sports
                  across the country. It organizes the venues to host sports,
                  schedules the dates the sporting activities will take place
                  and then to the best performing teams proceeds to participate
                  in the national levels.
                </p>
              </div>
            </div>
          </div> */}
        <section id="eventful" className=" pt-5">
          <div className="container-lg">
            <div className="row align-items-center justify-content-around">
              <div className="col-10 col-lg-4 col-xl-3">
                <div className="card mt-2">
                  <img
                    src="/pictures/teams.jpg"
                    alt=""
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <div className="card-title">
                      <h5>Teams</h5>
                    </div>
                    <div className="card-text">
                      Teams that are going to participate and registered for the
                      coming scheduled KUSA games
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-10 col-lg-4 col-xl-3">
                <div className="card mt-1">
                  <img
                    src="/pictures/cups-4278774_1920.jpg"
                    alt=""
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <div className="card-title">
                      <h5>Upcoming Events</h5>
                    </div>
                    <div className="card-text">
                      Events will begin at playoffs in various regions and later
                      to national levels, either tournaments or leagues.
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-10 col-lg-4 col-xl-3">
                <div className="card mt-2">
                  <img
                    src="/pictures/fixtures.jpg"
                    alt=""
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <div className="card-title">
                      <h5>Fixtures</h5>
                    </div>
                    <div className="card-text">
                      Fixtures of the participating institutions and when they
                      will be played, alongside the venue of participation.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="pb-5">
          <div className="container-lg p-4">
            <div className="text-center">
              <p className="display-6">
                <b> Get in Touch..</b>{" "}
              </p>
              <p className="lead">You can contact us ..</p>
            </div>
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <form action="">
                  <label htmlFor="email" className="form-label">
                    Email Address:
                  </label>
                  <div className="mb-4 input-group">
                    <span className="input-group-text">
                      <i className="bi bi-person-fill"></i>
                    </span>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="email@gmail.com"
                    />
                  </div>
                  <div className="form-floating mb-2 mt-3">
                    <textarea id="query" className="form-control"></textarea>

                    <label htmlFor="query">Your query... </label>
                  </div>
                  <div className="mb-4 text-center">
                    <button className="btn btn-secondary">submit</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
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
    </>
  );
}
