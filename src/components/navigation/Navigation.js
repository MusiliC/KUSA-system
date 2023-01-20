import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./navigation.css"
import { useDispatch } from 'react-redux';
import { signOut } from '../../redux/actions/authAction';



export default function Navigation() {

// const dispatch = useDispatch()
// const navigate = useNavigate()

//   const handleSignOut = (e) => {
//     e.preventDefault();
//     dispatch(signOut())
//     navigate("/login")
//   };


  return (
    <div className="text-center border border-gray-50 ">
      <Navbar bg="info" variant="light" expand="lg" className="py-3">
        <Container>
          <Navbar.Brand href="/" className="me-5">
            KUSA
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto mx-3 px-5 ">
              <Nav.Link as={Link} to="/" className="me-3">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/teams" className="me-3">
                Events & Teams
              </Nav.Link>
              <Nav.Link as={Link} to="/fixtures" className="me-3">
                Fixtures
              </Nav.Link>
              <Nav.Link as={Link} to="/results" className="me-3">
                Results
              </Nav.Link>

              <Nav.Link as={Link} to="/tables" className="me-3">
                League Tables
              </Nav.Link>
              <div className="d-flex justify-content-end ms-2 ">
                <Nav.Link as={Link} to="/login">
                  <Button variant="outline-dark" className="btn-sm ms-5">
                    <b> Sign in</b>
                  </Button>
                </Nav.Link>

                {/* <Nav.Link as={Link} to="/login">
                  <Button variant="outline-dark" className="btn-sm ms-5" onClick={handleSignOut}>
                    <b> Sign Out</b>
                  </Button>
                </Nav.Link> */}
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
