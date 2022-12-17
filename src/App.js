import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import AuthWrapper from "./components/AuthWrapper";
import Fixtures from "./components/fixtures/Fixtures";
import Home from "./components/home/Home";
import Navigation from "./components/navigation/Navigation";
import Results from "./components/results/Results";
import Table from "./components/table/Table";
import Teams from "./components/teams/Teams";
import Sidebar from "./dashboard/admin-menu/Sidebar";
import { getUsers } from "./redux/actions/authAction";

function App() {
  return (
    <>
      <div className="App">
        <Router>
          <Navigation />

          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/results" element={<Results />} />
            <Route path="/fixtures" element={<Fixtures />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/tables" element={<Table />} />
            <Route path="/admin/*" element={<Sidebar />} />
          </Routes>
        </Router>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
