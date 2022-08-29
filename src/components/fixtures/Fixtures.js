import { Link } from "react-router-dom";
import React from "react";
import "./fixtures.css";

export default function Fixtures() {
  const testData = ["Dekut", "karatina", "KU", "uon", "chuka", "Egerton"];

  const matchParticipants = (participants) => {
    const p = Array.from(participants);
    if (p % 2 === 1) {
      p.push(null);
    }
    const pairings = [];
    while (p.length !== 0) {
      let participantA = p.shift();
      let participantB = p.pop();
      if (participantA !== undefined && participantB !== undefined) {
        pairings.push([`${participantA} vs ${participantB}`]);
      }
    }
    return pairings;
  };

  const rotateArray = (array) => {
    const p = Array.from(array);
    const firstElement = p.shift();
    const lastElement = p.pop();
    return [firstElement, lastElement, ...p];
  };

  const generateTournament = (participants) => {
    const tournamentRounds = [];
    const rounds = Math.ceil(participants.length / 2);
    let p = Array.from(participants);
    for (let i = 0; i < rounds; i++) {
      tournamentRounds.push(matchParticipants(p));
      p = rotateArray(p);
    }
    return tournamentRounds;
  };

  const matchday1 = generateTournament(testData)[0];
  const matchday2 = generateTournament(testData)[1];
  const matchday3 = generateTournament(testData)[2];
  const matchday4 = generateTournament(testData)[3];
  // const handleClick = () => {
  //   console.log(matches);
  // };

  return (
    <div>
      <section id="fixture-page">
        <div className="bg" id="fixture-bg">
          <div className="container-lg">
            <div className="text-center display-6 py-3 " id="fix-heading">
              <b> KUSA Fixtures </b>
            </div>
            <div className="row justify-content-between">
              <div className="col-10 col-lg-5 ">
                <div className="card py-2 my-3">
                  <div className="row p-1 justify-content-around">
                    <div className="card-text mb-1 text-center">
                      {
                        <div>
                          {matchday1 ? (
                            <h6>Match day 1</h6>
                          ) : (
                            <h6>No matchday 1</h6>
                          )}
                        </div>
                      }
                      <h6>
                        <i className="bi bi-calendar-event mx-3"></i>Date
                      </h6>
                    </div>
                    <div className="col-md-5 ms-2">
                      {matchday1 &&
                        matchday1.map((fix) => (
                          <div className="card-text " key={fix}>
                            {" "}
                            <h6>
                              <b className="mx-2"> {fix}</b>
                            </h6>
                          </div>
                        ))}
                    </div>
                    <div className="col-md-6 align-items-center ">
                      <div className="card-text my-2">
                        <i className="bi bi-geo-alt-fill mx-2"></i>Chuka
                        University
                      </div>
                    </div>
                  </div>
                </div>

                {
                  //card 2
                  <div className="card py-2 my-2">
                    <div className="row p-1 justify-content-around">
                      <div className="card-text mb-1 text-center">
                        {
                          <div>
                            {matchday3 ? (
                              <h6>Match day 3</h6>
                            ) : (
                              <h6>No matchday 3</h6>
                            )}
                          </div>
                        }
                        <h6>
                          <i className="bi bi-calendar-event mx-3"></i>Date
                        </h6>
                      </div>
                      <div className="col-md-5 ms-2">
                        {matchday3 &&
                          matchday3.map((fix) => (
                            <div className="card-text " key={fix}>
                              {" "}
                              <h6>
                                <b className="mx-2"> {fix}</b>
                              </h6>
                            </div>
                          ))}
                      </div>
                      <div className="col-md-6 align-items-center ">
                        <div className="card-text my-2">
                          <i className="bi bi-geo-alt-fill mx-2"></i>Chuka
                          University
                        </div>
                      </div>
                    </div>
                  </div>
                }
              </div>
              <div className="col-10 col-lg-5 ">
                <div className="card py-2 my-3">
                  <div className="row p-1 justify-content-around">
                    <div className="card-text mb-1 text-center">
                      {matchday2 ? (
                        <h6>Match day 2</h6>
                      ) : (
                        <h6>No matchday 2</h6>
                      )}
                      <h6>
                        <i className="bi bi-calendar-event mx-3"></i>Date
                      </h6>
                    </div>
                    <div className="col-md-4 ms-2">
                      <div className="card-text ">
                        {matchday2 &&
                          matchday2.map((fix) => (
                            <div className="card-text " key={fix}>
                              {" "}
                              <h6>
                                <b className="mx-2"> {fix}</b>
                              </h6>
                            </div>
                          ))}
                      </div>
                    </div>
                    <div className="col-md-6 align-items-center ">
                      <div className="card-text my-2">
                        <i className="bi bi-geo-alt-fill mx-2"></i>Chuka
                        University
                      </div>
                    </div>
                  </div>
                </div>
                {
                  //card 4

                  <div className="card py-2">
                    <div className="row p-1 justify-content-around">
                      <div className="card-text mb-1 text-center">
                        {matchday4 ? (
                          <h6>Match day 4</h6>
                        ) : (
                          <h6>No matchday 4</h6>
                        )}
                        <h6>
                          <i className="bi bi-calendar-event mx-3"></i>Date
                        </h6>
                      </div>
                      <div className="col-md-4 ms-2">
                        <div className="card-text ">
                          {matchday4 &&
                            matchday4.map((fix) => (
                              <div className="card-text " key={fix}>
                                {" "}
                                <h6>
                                  <b className="mx-2"> {fix}</b>
                                </h6>
                              </div>
                            ))}
                        </div>
                      </div>
                      <div className="col-md-6 align-items-center ">
                        <div className="card-text my-2">
                          <i className="bi bi-geo-alt-fill mx-2"></i>Chuka
                          University
                        </div>
                      </div>
                    </div>
                  </div>
                }
              </div>
            </div>
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
