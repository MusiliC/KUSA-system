import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { sendEmail } from "../../redux/actions/emailAction";
import FormInputErrorAlert from "../commons/FormInputErrorAlert";

import "./home.css";

export default function Home() {
  // State
  const [sendingEmail, setSendingEmail] = useState(false);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleEmail = async (data) => {
    setSendingEmail(true);
    await dispatch(sendEmail(data));
    setSendingEmail(false);
    reset();
  };

  return (
    <>
      <section id="home" className="">
        <div className="py-5" id="home-bg">
          <div className="container-lg py-3 ">
            <div className="row justify-content-between align-items-center ">
              <div className="col-lg-4 ">
                <div className="display-3 " id="title">
                  <img
                    src="/pictures/kusaLogo.png"
                    alt=""
                    className="img-fluid"
                    id="kusaLogo"
                  />
                </div>
                <div className="lead ms-4" id="title"></div>
                <div className="display-5 ms-4 mt-4 mb-5" id="subtitle">
                  <span className="kusaa">K</span>enya
                  <span className="kusaa ms-2">U</span>niversities <br />
                  <span className="kusaa ">S</span>port's
                  <span className="kusaa ms-2">A</span>ssociation
                </div>

                <div className="fs-5 ms-4" id="">
                  The body responsible for organizing and managing university
                  sports, It's mandated to run university sports in Kenya.
                </div>
              </div>
              <div className="col-lg-7 py-4">
                <img
                  src="/pictures/ballFive.jpg"
                  className="img-fluid mx-auto"
                  alt=""
                  id="ballFive"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="rest-bg">
        <section id="about">
          <div className="container-lg">
            <div className="text-center">
              <h3 className="mb-1 display-6">
                <b> Get started....</b>
              </h3>
            </div>
          </div>
        </section>
        <div className="container-lg">
          <section id="eventful" className=" pt-3">
            <div className="container-lg">
              <div className="row align-items-center justify-content-around">
                <div className="col-11 col-lg-4 col-xl-3">
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
                        Teams that are going to participate and registered for
                        the coming scheduled KUSA games
                      </div>
                      <Link to="/teams" className="btn btn-primary my-2">
                        Teams
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-11 col-lg-4 col-xl-3">
                  <div className="card mt-1">
                    <img
                      src="/pictures/ball-four.jpg"
                      alt=""
                      className="card-img-top"
                    />
                    <div className="card-body">
                      <div className="card-title">
                        <h5>Upcoming Events</h5>
                      </div>
                      <div className="card-text">
                        Events will begin at playoffs in various regions and
                        later to national levels, either tournaments or leagues.
                      </div>
                      <Link to="/teams" className="btn btn-primary my-2">
                        Events
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-11 col-lg-4 col-xl-3">
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
                      <Link to="/fixtures" className="btn btn-primary my-2">
                        Fixtures
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <section id="contact" className="pb-2">
          <div className="container-lg p-4 pb-1">
            <div className="text-center">
              <p className="display-6">
                <b> Get in Touch..</b>{" "}
              </p>
              <p className="lead">You can contact us ..</p>
            </div>
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <form action="" onSubmit={handleSubmit(handleEmail)}>
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
                      id="who"
                      name="who"
                      placeholder="email@gmail.com"
                      {...register("who", {
                        required: {
                          value: true,
                          message: "Your email is required..",
                        },
                      })}
                    />
                    {errors?.who && (
                      <FormInputErrorAlert message={errors?.who?.message} />
                    )}
                  </div>
                  <div className="form-floating mb-2 mt-3">
                    <textarea
                      id="query"
                      className="form-control"
                      name="query"
                      {...register("query", {
                        required: {
                          value: true,
                          message: "Input query..",
                        },
                      })}
                    ></textarea>
                    {errors?.query && (
                      <FormInputErrorAlert message={errors?.query?.message} />
                    )}
                    <label htmlFor="query">Your query... </label>
                  </div>
                  <div className="mb-4 text-center">
                    <button
                      disabled={sendingEmail}
                      className="btn btn-primary my-2"
                    >
                      {sendingEmail ? "Loading..." : "Send Message"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </section>

      <section id="footer" className="bg-info">
        <footer className="footer  py-3 ">
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
