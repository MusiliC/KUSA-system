import React from "react";
import "./sidebar.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import RegisterTeam from "../register-team/registerTeam";
// import CreateEvent from "../create event/createEvent";
import AdminEvents from "../admin events/adminEvents";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <>
      <div className="row">
        <div className="col-lg-3">
          <Navbar bg="light" expand="lg" id="admin-menu">
            <Container>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav ">
                <Nav className=" d-flex flex-column ">
                  <Navbar.Brand href="#home" className="my-3">
                    KUSA Admin
                  </Navbar.Brand>
                  <Nav.Link as={Link} to="/teams" className="my-2">
                    Register Team
                  </Nav.Link>
                  <Nav.Link href="#link" className="my-3">
                    Create Event
                  </Nav.Link>
                  <Nav.Link href="#link" className="my-3">
                    Admin Events
                  </Nav.Link>
                  <Nav.Link href="#link" className="my-3">
                    Update Results
                  </Nav.Link>
                  <Nav.Link href="#link" className="my-3">
                    Fixtures
                  </Nav.Link>
                  <Nav.Link href="#link" className="my-3">
                    Users
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
        <div className="col-lg-9">
          <div className="admin">
            {/* <RegisterTeam/> */}
            {/* <CreateEvent/> */}
            <AdminEvents />
          </div>
        </div>
      </div>
    </>
  );
}
