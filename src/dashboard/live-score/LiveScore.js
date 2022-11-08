import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import io from "socket.io-client";
const socket = io("http://localhost:3002");

export default function LiveScore() {
  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(false);
  const [gamePause, setGamePause] = useState(false);

  const [live, setLive] = useState({
    homeTeam: "",
    awayTeam: "",
    goalHomeTeam: "",
    goalTimeHomeTeam: "",
    goalAwayTeam: "",
    goalTimeAwayTeam: "",
    yellowHomeTeam: "",
    yellowTimeHomeTeam: "",
    yellowAwayTeam: "",
    yellowTimeAwayTeam: "",
    redHomeTeam: "",
    redTimeHomeTeam: "",
    redAwayTeam: "",
    redTimeAwayTeam: "",
  });

  useEffect(() => {
    let interval = null;

    if (timerOn) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timerOn]);

  const handleInputChange = (e) => {
    setLive((v) => ({ ...v, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    socket.emit("live_score", { live });
    socket.emit("game_time", { gamePause });
  };

  const handleTime = () => {
    if (timerOn) {
      socket.emit("game_time", { gamePause });
    } else if (!timerOn && time > 0) {
      setGamePause(true);
      console.log(gamePause);
      socket.emit("game_time", { gamePause });
    }
  };

  return (
    <div className="container-lg">
      <div className="text-center">
        <p className="display-6 mt-3">Live Score</p>
      </div>

      <div className="d-flex justify-content-center mb-1 fs-4">
        <span className="mx-1">
          {("0" + Math.floor((time / 60000) % 60)).slice(-2)} :
        </span>
        <span className="mx-1">
          {("0" + Math.floor((time / 1000) % 60)).slice(-2)} :
        </span>
        <span className="mx-1">{("0" + ((time / 10) % 100)).slice(-2)}</span>
      </div>
      <div className="d-flex  justify-content-center mb-1">
        {!timerOn && time === 0 && (
          <button
            className="btn btn-primary mb-2 mx-2"
            onClick={() => setTimerOn(true)}
          >
            Start
          </button>
        )}

        {timerOn && (
          <button
            className="btn btn-primary mb-2 mx-2"
            onClick={() => setTimerOn(false) && setGamePause(false)}
          >
            Stop
          </button>
        )}

        {!timerOn && time !== 0 && (
          <button
            className="btn btn-primary mb-2 mx-2"
            onClick={() => setTimerOn(true) && setGamePause(true)}
          >
            Resume
          </button>
        )}

        {!timerOn && time > 0 && (
          <button
            className="btn btn-primary mb-2 mx-2"
            onClick={() => setTime(0)}
          >
            Reset
          </button>
        )}
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-8 mt-1">
          <form action="" className="d-flex justify-content-between">
            <div className="homeTeamScore">
              <div className="mb-2">
                <label htmlFor="" className="form-label">
                  Enter institution home team:
                </label>
                <input
                  type="text"
                  name="homeTeam"
                  className="form-control"
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-2">
                <label htmlFor="" className="form-label">
                  Goal by homeTeam:
                </label>
                <input
                  type="number"
                  name="goalHomeTeam"
                  className="form-control"
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-2">
                <label htmlFor="" className="form-label">
                  Time Goal scored by homeTeam:
                </label>
                <input
                  type="time"
                  name="goalTimeHomeTeam"
                  className="form-control"
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-2">
                <label htmlFor="" className="form-label">
                  Yellow Card by homeTeam:
                </label>
                <input
                  type="text"
                  name="yellowHomeTeam"
                  className="form-control"
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-2">
                <label htmlFor="" className="form-label">
                  Time Yellow card awarded to homeTeam:
                </label>
                <input
                  type="time"
                  name="yellowTimeHomeTeam"
                  className="form-control"
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-2">
                <label htmlFor="" className="form-label">
                  Red Card by homeTeam:
                </label>
                <input
                  type="text"
                  name="redHomeTeam"
                  className="form-control"
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-2">
                <label htmlFor="" className="form-label">
                  Time red card awarded to homeTeam:
                </label>
                <input
                  type="time"
                  name="redTimeHomeTeam"
                  className="form-control"
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* away team */}

            <div className="awayTeamScore">
              <div className="mb-2">
                <label htmlFor="" className="form-label">
                  Enter institution away team:
                </label>
                <input
                  type="text"
                  name="awayTeam"
                  className="form-control"
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-2">
                <label htmlFor="" className="form-label">
                  Goal by away Team:
                </label>
                <input
                  type="number"
                  name="goalAwayTeam"
                  className="form-control"
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-2">
                <label htmlFor="" className="form-label">
                  Time Goal scored by awayTeam:
                </label>
                <input
                  type="time"
                  name="goalTimeAwayTeam"
                  className="form-control"
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-2">
                <label htmlFor="" className="form-label">
                  Yellow Card by awayTeam:
                </label>
                <input
                  type="text"
                  name="yellowAwayTeam"
                  className="form-control"
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-2">
                <label htmlFor="" className="form-label">
                  Time Yellow card awarded to awayTeam:
                </label>
                <input
                  type="time"
                  name="yellowTimeAwayTeam"
                  className="form-control"
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-2">
                <label htmlFor="" className="form-label">
                  Red Card by awayTeam:
                </label>
                <input
                  type="text"
                  name="redAwayTeam"
                  className="form-control"
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-2">
                <label htmlFor="" className="form-label">
                  Time red card awarded to awayTeam:
                </label>
                <input
                  type="time"
                  name="redTimeAwayTeam"
                  className="form-control"
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </form>
          <div className="d-flex justify-content-center">
            <button
              className="btn btn-primary my-2 mx-2"
              onClick={handleSubmit}
            >
              Update Scores
            </button>

            <button className="btn btn-primary my-2" onClick={handleTime}>
              Start game time
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
