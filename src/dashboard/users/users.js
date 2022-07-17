import React from "react";
import Table from "react-bootstrap/Table";

function Users() {
  return (
    <>
      <section id="user-admin">
        <div className="container-lg my-4">
          <div className="text-center lead">
            <b> Registered Users</b>
          </div>
          <div className="row justify-content-between">
            <div className="col-12 col-lg-9 my-4">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Moryn Smith</td>
                    <td>Moryn@gmail.com</td>
                    <td className="">
                      <i className="bi bi-trash-fill mx-2 "></i>
                    </td>
                  </tr>
                  <tr>
                    <td>John Doe</td>
                    <td>John@gmail.com</td>
                    <td className="">
                      <i className="bi bi-trash-fill mx-2"></i>
                    </td>
                  </tr>
                  <tr>
                    <td>Ada Lovelace</td>
                    <td>ada@gmail.com</td>
                    <td className="">
                      <i className="bi bi-trash-fill mx-2"></i>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Users;
