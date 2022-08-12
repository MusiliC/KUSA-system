import React, {useState} from 'react'
import Button from "react-bootstrap/Button";

function UpdateTeam() {

  const [institution, setInstitution] = useState({
    team: "",
    county: "",
    town: "",
  });

  const handleInputChange = (e) => {
    setInstitution((v) => ({ ...v, [e.target.name]: e.target.value }));
  };

const handleSubmit = () => {
    console.log(institution);
}

  return (
    <div className="container-lg">
      <div className="row">
        <div className="text-center display-6 my-3">Update Team</div>
        <div className="col-lg-6">
          <form action="">
            <div className="mb-2">
              <label htmlFor="" className="form-label">
                Enter institution team:
              </label>
              <input
                type="text"
                name="team"
                className="form-control"
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="" className="form-label">
                Enter county located:
              </label>
              <input
                type="text"
                name="county"
                className="form-control"
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="" className="form-label">
                Enter town located:
              </label>
              <input
                type="text"
                name="town"
                className="form-control"
                onChange={handleInputChange}
              />
            </div>
          </form>
          <div className="d-flex justify-content-center my-3">
            <Button variant="primary" onClick={handleSubmit}>
              Update Team
            </Button>
          </div>
        </div>
      </div>
      .
    </div>
  );
}

export default UpdateTeam