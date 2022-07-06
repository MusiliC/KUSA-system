import React from "react";
import "./fixtures.css";

export default function Fixtures() {
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
                <div className="card py-2 my-2">
                  <div className="row p-1 justify-content-around">
                    <div className="card-text mb-1 text-center">
                      <h6>
                        <i className="bi bi-calendar-event mx-3"></i>Date
                      </h6>
                    </div>
                    <div className="col-md-4 ms-2">
                      <div className="card-text ">
                        <h6>
                          {" "}
                          Karatina <b className="mx-2"> Vs </b> Kimathi
                        </h6>
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
              </div>
              <div className="col-10 col-lg-5 ">
                <div className="card py-2">
                  <div className="row p-1 justify-content-around">
                    <div className="card-text mb-1 text-center">
                      <h6>
                        <i className="bi bi-calendar-event mx-3"></i>Date
                      </h6>
                    </div>
                    <div className="col-md-4 ms-2">
                      <div className="card-text ">
                        <h6>
                          Karatina <b className="mx-2"> Vs </b> Kimathi{" "}
                        </h6>
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
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
