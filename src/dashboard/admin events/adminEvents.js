import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteEvent, getEvents } from "../../redux/actions/eventsAction";

export default function AdminEvents() {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.eventsReducer.events);
  const navigate = useNavigate();

  const handleDelete = (id) => {
    dispatch(deleteEvent(id));
  };

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  return (
    <div>
      <div className="container-lg">
        <div className="row justify-content-around  my-3 ">
          <h4 className="text-center display-6">KUSA Events</h4>

          {events &&
            events.map((event) => (
              <div className="col-9 col-lg-4 col-xl-3 my-2  " key={event._id}>
                <div className="card mt-2">
                  <img
                    src="/pictures/tartan-track-g1c231e301_1920.jpg"
                    alt=""
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <div className="card-title">
                      <h5>{event.name}</h5>
                    </div>
                    <div className="card-text">Host: {event.host}</div>
                    <div className="card-text">Date: {event.date}</div>
                    <div className="d-flex justify-content-around mt-3">
                      <i
                        className="bi bi-pencil-square"
                        onClick={() => navigate(`eventUpdate/${event._id}`)}
                      ></i>
                      <i
                        className="bi bi-trash-fill"
                        onClick={() => handleDelete(event._id)}
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
