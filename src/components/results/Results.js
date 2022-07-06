import React from "react";
import Table from "react-bootstrap/Table";
import "./results.css"

export default function Results() {
  return (
    <div className="bg" id="results-bg">
      <section>
     
        <div className="container-lg pt-5">
          <div className="row justify-content-center">
            <div className="text-center display-6 mb-4">
              <b> Results </b>
            </div>
            <div className="col-lg-8">
              <Table striped bordered hover>
                <h5 className="pb-2">
                  <i className="bi bi-calendar-event mx-3"></i> Date
                </h5>
                {/* <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
              </tr>
            </thead> */}
                <tbody>
                  <tr>
                    <td className="lead">
                      <b> Karatina 3 : 0 Kimathi </b>
                    </td>

                    <td>
                      <i className="bi bi-geo-alt-fill mx-2"></i> Chuka
                      University
                    </td>
                  </tr>
                  <tr>
                    <td className="lead">
                      <b> Kirinyaga 3 : 2 Tharaka </b>
                    </td>

                    <td>
                      <i className="bi bi-geo-alt-fill mx-2"></i> Chuka
                      University
                    </td>
                  </tr>
                  <tr>
                    <td className="lead">
                      <b> Embu 3 : 4 Meru </b>
                    </td>

                    <td>
                      <i className="bi bi-geo-alt-fill mx-2"></i> Chuka
                      University
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
