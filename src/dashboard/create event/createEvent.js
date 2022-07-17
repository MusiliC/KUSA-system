import React from "react";
import Button from "react-bootstrap/Button";

export default function CreateEvent() {
  return (
    <div className="ms-2">
      <div className="container-lg">
        <div className="text-center mt-3">
          <div className="lead">Create KUSA Event</div>
        </div>
        <div className="row justify-content-around">
          <div className="col-10 col-lg-5 mt-3">
            <form action="">
              <div className="mb-3">
                <label htmlFor="host" className="form-label">
                  Choose the event type:
                </label>
                <select name="" id="" className="form-select">
                  <option value="1">KUSA Play offs Round 1</option>
                  <option value="2">KUSA Play offs Round 2</option>
                  <option value="3">KUSA Nationals</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="host" className="form-label">
                  Hosting University:
                </label>
                <input type="text" className="form-control" />
              </div>
              <div className="mb-3">
                <label htmlFor="date" className="form-label">
                  Date for the event:
                </label>
                <input type="date" className="form-control" />
              </div>
              <div className="mb-3">
                <label htmlFor="formFile" className="form-label">
                  Attach a picture:
                </label>
                <input type="file" className="form-control" />
              </div>
            </form>
            <div className="d-flex justify-content-center mb-3">
              <Button variant="primary">Create Event</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
