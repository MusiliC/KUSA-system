import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./auth.css";
import { signUser } from "../../redux/actions/authAction";

export default function Login() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.authReducer);
  console.log(auth);

  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setUser((v) => ({ ...v, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { success, auth } = await dispatch(signUser(user));
    if (success) {
      if (auth.isAdmin) {
        navigate("/admin");
      }else{
        navigate("/")
      }
    }
  };

  // useEffect(()  =>  {
  //   if (auth.user._id && auth.user.isAdmin) {
  //     navigate("/admin");
  //   }else   if (auth.user._id) {
  //     navigate("/")
  //   }
  // }, [auth.user._id, navigate ,auth.user.isAdmin]);
  return (
    <div>
      <div className="container-lg ">
        <div className="row justify-content-center p-3 mt-5">
          <div className="col-lg-4 border border-dark rounded p-3 ">
            <div className="text-center">
              <i className="bi bi-person-circle" id="signin"></i>
            </div>
            <div className="text-center lead fw-bold"> Sign in</div>
            <form action="">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={user.email}
                onChange={handleInputChange}
              />
              <label htmlFor="password" className="form-label">
                Password:
              </label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={user.password}
                onChange={handleInputChange}
              />
            </form>
            <div className="mt-2">
              <strong>
                <Link to="/register">Create Account?</Link>
              </strong>
            </div>
            <div className="text-center  my-3">
              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={handleSubmit}
              >
                Log in
              </button>
            </div>
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
}
