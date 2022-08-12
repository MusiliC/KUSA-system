import React,{useState} from 'react'

function AdminUpdate() {


  const [newResults, setNewResults] = useState({
    winningTeam: "",
    loosingTeam: "",
    winnerGoals: "",
    looserGoals: "",
  });

  
  const handleInputChange = (e) => {
    setNewResults((v) => ({ ...v, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
  };

  return (
    <div className="container-lg">
      <div className="row">
        <div className="col-lg-6">
          <form action="">
            <div className="mb-2">
              <label htmlFor="" className="form-label">
                Enter winning team:
              </label>
              <input
                type="text"
                name="winningTeam"
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="mb-2">
              <label htmlFor="" className="form-label">
                Enter loosing team:
              </label>
              <input
                type="text"
                name="loosingTeam"
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="mb-2">
              <label htmlFor="" className="form-label">
                Goals scored by winning team:
              </label>
              <input
                type="number"
                name="winnerGoals"
                onChange={handleInputChange}
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
                onChange={handleInputChange}
                className="form-control mb-2"
              />
            </div>
            <div className="d-flex justify-content-center">
              <button className="btn btn-primary my-2" onClick={handleSubmit}>
                Update Results
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminUpdate