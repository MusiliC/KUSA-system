import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


import {
  deleteTeam,
  getTeams,
  registerTeam,
} from "../../redux/actions/teamsAction";

export default function RegisterTeam() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const registeredTeams = useSelector((state) => state.teamsReducer.allTeams);

   

  const [institution, setInstitution] = useState({
    team: "",
    county: "",
    image: "",
    players: "",
  });

  const handleInputChange = (e) => {
    setInstitution((v) => ({ ...v, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("image", institution.image);
    formData.append("team", institution.team);
    formData.append("county", institution.county);
    formData.append("players", institution.players);

    dispatch(registerTeam(formData));

    await setInstitution({
      team: "",
      county: "",
      image: "",
      players: "",
    });
  };

  const handleDelete = (id) => {
    dispatch(deleteTeam(id));
  };

  useEffect(() => {
    dispatch(getTeams());
     
  }, [dispatch]);

  

  return (
    <div className="container-lg">
      <div className="text-center">
        <p className="display-6 mt-3">Register Team</p>
      </div>
      <div className="row justify-content-around ">
        <div className="col-lg-4 mt-5 ">
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
                Enter institution or team logo:
              </label>
              <input
                type="file"
                name="image"
                className="form-control"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setInstitution((v) => ({
                      ...v,
                      image: e.target.files[0],
                    }));
                  }
                }}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="" className="form-label">
                County located:
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
                Enter team squad players:
              </label>

              <textarea
                id="query"
                className="form-control"
                name="players"
                onChange={handleInputChange}
              ></textarea>
            </div>
          </form>
          <div className="d-flex justify-content-center my-3">
            <Button variant="primary" onClick={handleSubmit}>
              Register Team
            </Button>
          </div>
        </div>
        <div className=" col-lg-5 ">
          <div className="lead text-center my-3">Registered Teams:</div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>University Name</th>
                <th>Region</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {registeredTeams &&
                registeredTeams.map((team) => (
                  <tr key={team._id}>
                    <td>{team.team}</td>
                    <td>{team.county}</td>
                    <td>
                      <div className="d-flex justify-content-around align-items-center">
                        <i
                          className="bi bi-pencil-square"
                          onClick={() => navigate(`team/${team._id}`)}
                        ></i>
                        <i
                          className="bi bi-trash-fill"
                          onClick={() => handleDelete(team._id)}
                        ></i>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}
