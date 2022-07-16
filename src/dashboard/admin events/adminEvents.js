import React from 'react'

export default function AdminEvents() {
  return (
    <div>
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
                <div className="d-flex justify-content-around mt-3">
                  <i className="bi bi-pencil-square"></i>
                  <i className="bi bi-trash-fill"></i>
                </div>
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
                <div className="d-flex justify-content-around mt-3">
                  <i className="bi bi-pencil-square"></i>
                  <i className="bi bi-trash-fill"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
