import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";

import {
  deleteTeam,
  getTeams,
  registerTeam,
} from "../../redux/actions/teamsAction";

export default function RegisterTeam() {
  const dispatch = useDispatch();
  const registeredTeams = useSelector((state) => state.teamsReducer);
  // console.log(registeredTeams);

  const [institution, setInstitution] = useState({
    team: "",
    county: "",
    town: "",
  });

  const handleInputChange = (e) => {
    setInstitution((v) => ({ ...v, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerTeam(institution));
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
                <th>Location</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {registeredTeams &&
                registeredTeams.map((team) => (
                  <tr key={team._id}>
                    <td>{team.team}</td>
                    <td>
                      {team.county}, {team.town}
                    </td>
                    <td>
                      <div className="d-flex justify-content-around align-items-center">
                        <i className="bi bi-pencil-square"></i>
                        <i
                          className="bi bi-trash-fill"
                          onClick={() => handleDelete(team._id)}
                        ></i>
                      </div>
                    </td>
                  </tr>
                ))}
              {/* <tr>
                <td>Karatina Universiity</td>
                <td>Nyeri, karatina</td>
                <td>
                  <div className="d-flex justify-content-around align-items-center">
                    <i className="bi bi-pencil-square"></i>
                    <i className="bi bi-trash-fill"></i>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Kirinyaga Universiity</td>
                <td className="d-flex justify-content-around">
                  <i className="bi bi-pencil-square"></i>
                  <i className="bi bi-trash-fill"></i>
                </td>
              </tr>
              <tr>
                <td>Chuka Universiity</td>
                <td className="d-flex justify-content-around">
                  <i className="bi bi-pencil-square"></i>
                  <i className="bi bi-trash-fill"></i>
                </td>
              </tr> */}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}
