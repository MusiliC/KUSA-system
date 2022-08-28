import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";
import { getOneTeam, updateTeam } from "../../redux/actions/teamsAction";

function UpdateTeam() {
  const newTeam = useSelector((state) => state.teamsReducer.team);
  // console.log(newTeam);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  let { id } = useParams();
  // console.log(newTeam);

  const [institution, setInstitution] = useState({
    team: "",
    county: "",
  });

  const { team, county } = institution;

  const handleInputChange = (e) => {
    setInstitution((v) => ({ ...v, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    dispatch(updateTeam(id, institution));
    navigate("/admin/register");
  };

  useEffect(() => {
    if (newTeam) {
      setInstitution({ ...newTeam });
    }
  }, [newTeam]);

  useEffect(() => {
    dispatch(getOneTeam(id));
  }, [dispatch, id]);
  return (
    <div className="container-lg">
      <div className="row justify-content-center">
        <div className="text-center display-6 my-5">Update Team</div>
        <div className="col-lg-6 ">
          <form action="">
            <div className="mb-2">
              <label htmlFor="" className="form-label">
                Enter institution team:
              </label>
              <input
                type="text"
                name="team"
                className="form-control"
                value={team}
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
                value={county}
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

export default UpdateTeam;
