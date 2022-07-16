import React from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

export default function RegisterTeam() {
  return (

      <div className="container-lg">
        <div className="text-center">
          <p className="display-6">Register Team</p>
        </div>
        <div className="row justify-content-around ">
          <div className="col-lg-4 mt-3">
            <form action="" >
              <div className="mb-2">
                <label htmlFor="" className="form-label">
                  Enter institution team:
                </label>
                <input type="text" className="form-control" />
              </div>
              <div className="mb-2">
                <label htmlFor="" className="form-label">
                  Enter county located:
                </label>
                <input type="text" className="form-control" />
              </div>
              <div className="mb-2">
                <label htmlFor="" className="form-label">
                  Enter town located:
                </label>
                <input type="text" className="form-control" />
              </div>
            </form>
            <div className="d-flex justify-content-center mb-3">
              <Button variant="primary">Register Team</Button>
            </div>
          </div>
          <div className=" col-lg-5 ">
            <div className="lead text-center my-3">Registered Teams:</div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>University Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Karatina Universiity</td>
                  <td className="d-flex justify-content-around">
                    <i className="bi bi-pencil-square"></i>
                    <i className="bi bi-trash-fill"></i>
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
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </div>

  );
}
