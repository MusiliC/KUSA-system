import React from "react";
import "./sidebar.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import RegisterTeam from "../register-team/registerTeam";
import CreateEvent from "../create event/createEvent";
import AdminEvents from "../admin events/adminEvents";
import { Link, Route, Routes,  } from "react-router-dom";
import UpdateResults from "../update results/updateResults";
import GenerateFixtures from "../generate fixtures/generateFixtures";
import Users from "../users/users";
import AdminResults from "../results/AdminResults";
import AdminUpdate from "../results/AdminUpdate";
import AdminScore from "../results/AdminScore";
import UpdateTeam from "../register-team/UpdateTeam";
// import AdminScore from "../results/AdminScore";

export default function Sidebar() {

 

  return (
    <>
      <div className="row">
        <div className="col-lg-3">
          <Navbar bg="light" expand="lg" id="rest-bg">
            <Container>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav ">
                <Nav className=" d-flex flex-column ">
                  <Navbar.Brand as={Link} to="#" className="my-3">
                    KUSA Admin
                  </Navbar.Brand>
                  <Nav.Link as={Link} to="/admin/register" className="my-2">
                    <i className="bi bi-people-fill me-2"></i>
                    Register Team
                  </Nav.Link>
                  <Nav.Link as={Link} to="/admin/create" className="my-3">
                    <i className="bi bi-calendar-date me-2"></i>
                    Create Event
                  </Nav.Link>
                  <Nav.Link as={Link} to="/admin/event" className="my-3">
                    <i className="bi bi-calendar-date me-2"></i>
                    Kusa Events
                  </Nav.Link>
                  <Nav.Link as={Link} to="/admin/results" className="my-3">
                    <i className="bi bi-pencil-square me-2"></i>
                    Update Results
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/admin/resultsUpdate"
                    className="my-3"
                  >
                    <i className="bi bi-pencil-square me-2"></i>
                    Results
                  </Nav.Link>
                  <Nav.Link as={Link} to="/admin/fixtures" className="my-3">
                    <i className="bi bi-hourglass-bottom me-2"></i>
                    Fixtures
                  </Nav.Link>
                  <Nav.Link as={Link} to="/admin/users" className="my-3">
                    <i className="bi bi-people-fill me-2"></i>
                    Users
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
        <div className="col-lg-9">
          <div className="admin">
            <Routes>
              <Route path="/resultsUpdate" element={<AdminResults />} />
              <Route path="/create" element={<CreateEvent />} />
              <Route path="/register" element={<RegisterTeam />} />
              <Route path="/register/team/:id" element={<UpdateTeam />} />
              <Route path="/users" element={<Users />} />
              <Route
                path="resultsUpdate/result/:id"
                element={<AdminUpdate />}
              />
              <Route path="/resultsUpdate/player/:id" element={<AdminScore />} />
              <Route path="/fixtures" element={<GenerateFixtures />} />
              <Route path="/results" element={<UpdateResults />} />
              <Route path="/event" element={<AdminEvents />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}
