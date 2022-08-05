import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getEvents } from "../../redux/actions/eventsAction";

export default function CreateEvent() {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.eventsReducer);
  // console.log(events);

  const [event, setEvent] = useState({
    name: "KUSA Play offs Round 1 ",
    date: "",
    host: "",
  });

  const handleInputChange = (e) => {
    setEvent((v) => ({ ...v, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(event);
  };

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

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
                <select
                  name="name"
                  id=""
                  className="form-select"
                  value={event.name}
                  onChange={handleInputChange}
                >
                  <option value="KUSA Play offs Round 1">
                    KUSA Play offs Round 1
                  </option>
                  <option value="KUSA Play offs Round 2">
                    KUSA Play offs Round 2
                  </option>
                  <option value="KUSA Nationals">KUSA Nationals</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="host" className="form-label">
                  Hosting University:
                </label>
                <input
                  type="text"
                  name="host"
                  className="form-control"
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="date" className="form-label">
                  Date for the event:
                </label>
                <input
                  type="date"
                  name="date"
                  className="form-control"
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="formFile" className="form-label">
                  Attach a picture:
                </label>
                <input type="file" className="form-control" />
              </div>
            </form>
            <div className="d-flex justify-content-center mb-3">
              <Button variant="primary" onClick={handleSubmit}>
                Create Event
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
