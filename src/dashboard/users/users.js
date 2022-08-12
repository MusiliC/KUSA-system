import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "react-bootstrap/Table";
import { deleteUser, getUsers } from "../../redux/actions/authAction";

function Users() {

 const dispatch = useDispatch();
 const users = useSelector((state) => state.authReducer.users);

 const handleDelete = (id) => {
  dispatch(deleteUser(id))
 }

    useEffect(() => {
      dispatch(getUsers());
    }, [dispatch]);

  return (
    <>
      <section id="user-admin">
        <div className="container-lg my-4">
          <div className="text-center lead">
            <b> Registered Users</b>
          </div>
          <div className="row justify-content-around">
            <div className="col-12 col-lg-9 my-4 ms-4">
              <Table striped bordered hover >
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {users &&
                    users.map((user) => (
                      <tr key={user._id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td className="">
                          <i className="bi bi-trash-fill mx-2 " onClick={() => handleDelete(user._id)}></i>
                        </td>
                      </tr>
                    ))}
                  {/* <tr>
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
                  </tr> */}
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
