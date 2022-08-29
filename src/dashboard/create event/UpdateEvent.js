import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getOneEvent, updatedEvent } from "../../redux/actions/eventsAction";

function UpdateEvent() {
  const newEvent = useSelector((state) => state.eventsReducer.event);
  console.log(newEvent);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  let { id } = useParams();

  const [event, setEvent] = useState({
    name: "KUSA Play offs Round 1 ",
    host: "",
    date: "",
  });

  const handleInputChange = (e) => {
    setEvent((v) => ({ ...v, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updatedEvent(id, event))
    navigate("/admin/event")
  };

  useEffect(() => {
    if (newEvent) {
      setEvent({ ...newEvent });
    }
  }, [newEvent]);

  useEffect(() => {
    dispatch(getOneEvent(id));
  }, [dispatch, id]);

  return (
    <div className="container-lg">
      <div className="text-center my-4">
        <div className="display-6">Update KUSA Event</div>
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
                value={event.host}
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
                value={event.date}
                className="form-control"
                onChange={handleInputChange}
              />
            </div>
          </form>
          <div className="d-flex justify-content-center mb-3">
            <Button variant="primary" onClick={handleSubmit}>
              Update Event
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateEvent;
