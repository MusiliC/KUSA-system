import React from "react";

export default function UpdateResults() {
  return (
    <div>
      <div className="container-lg">
        <div className="text-center display-6 my-3">Update Results</div>
        <div className="row justify-content-around">
          <div className="col-lg-4">
            <form action="">
              <div className="mb-2">
                <label htmlFor="" className="form-label">
                  Enter winning team:
                </label>
                <input type="text" name="winningTeam" className="form-control" />
              </div>
              <div className="mb-2">
                <label htmlFor="" className="form-label">
                  Enter loosing team:
                </label>
                <input type="text" name="loosingTeam" className="form-control" />
              </div>
              <div className="mb-2">
                <label htmlFor="" className="form-label">
                  Goals scored by winning team:
                </label>
                <input
                  type="number"
                  name="winnerGoals"
                  className="form-control"
                />
              </div>
              <div className="mb-2">
                <label htmlFor="" className="form-label">
                  Goals scored by loosing team:
                </label>
                <input
                  type="number"
                  name="looserGoals"
                  className="form-control mb-2"
                />
              </div>
              <div className="d-flex justify-content-center">
                <button className="btn btn-primary my-2">Update Results</button>
              </div>
            </form>
          </div>
          <div className="col-lg-4">
            <form action="">
              <div className="mb-2">
                <label htmlFor="" className="form-label">
                  Enter goal scorer's name:
                </label>
                <input type="text" name="scorer" className="form-control" />
              </div>
              <div className="mb-2">
                <label htmlFor="" className="form-label">
                  Enter goal scorer's team:
                </label>
                <input type="text" name="scorerTeam" className="form-control" />
              </div>
              <div className="mb-2">
                <label htmlFor="" className="form-label">
                  Enter number of goals:
                </label>
                <input
                  type="number"
                  name="scorerGoals"
                  className="form-control"
                />
              </div>
              <div className="d-flex justify-content-center">
                <button className="btn btn-primary my-2">Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
