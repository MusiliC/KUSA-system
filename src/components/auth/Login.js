import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./auth.css";
import { signUser } from "../../redux/actions/authAction";

export default function Login() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.authReducer);

  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setUser((v) => ({ ...v, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signUser(user));
  };

  useEffect(() => {
    if (auth.user._id) {
      navigate("/");
    }
  }, [auth.user._id, navigate]);
  return (
    <div>
      <div className="container-lg ">
        <div className="row justify-content-center p-3 mt-5">
          <div className="col-lg-4 border border-dark rounded p-3 ">
            <div className="text-center">
              <i className="bi bi-person-circle" id="signin"></i>
            </div>
            <div className="text-center lead"> Sign in</div>
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
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                Log in
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
