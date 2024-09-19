import { NavLink, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import {
  Badge,
  Navbar,
  Container,
  Nav, 
  NavDropdown,
  Spinner,
} from "react-bootstrap";
import HeaderRightBar from "./HeaderRightBar/HeaderRightBar";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { authLogout } from "@store/auth/authSlice";
import { useState } from "react";

const { headerContainer, headerLogo } = styles;

function Header() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [pendingLogout, setPendingLogout] = useState(false);
  const { user, accessToken } = useAppSelector((state) => state.auth);
  const handleLogout = () => {
    setPendingLogout(true);
    setTimeout(() => {
      dispatch(authLogout());
      navigate("/");
      setPendingLogout(false);
    }, 1000);
  };
  return (
    <header>
      <div className={headerContainer}>
        <h1 className={headerLogo}>
          <span>E</span> <Badge bg="info">Shop</Badge>
        </h1>

        <HeaderRightBar />
      </div>
      <Navbar
        style={{ backgroundColor: "red", margin: "0" }}
        expand="lg"
        className="bg-body-tertiary"
        bg="dark"
        data-bs-theme="dark"
      >
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="categories">
                Categories
              </Nav.Link>
              <Nav.Link as={NavLink} to="about-us">
                About
              </Nav.Link>
            </Nav>

            <Nav className="">
              {!accessToken && (
                <>
                  <Nav.Link as={NavLink} to="login">
                    Login
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="register">
                    Register
                  </Nav.Link>
                </>
              )}

              {accessToken && (
                <>
                {pendingLogout && <Nav.Link style={{color:'white'}}>
                <Spinner animation="border" size="sm" style={{color:'white'}} /> Logout
              </Nav.Link>}
                
                <NavDropdown
                  title={`Welcome: ${user?.firstName} ${user?.lastName}`}
                  id="dropdown-basic"
                >
                  <NavDropdown.Item as={NavLink} to="/profile">Profile</NavDropdown.Item>
                  <NavDropdown.Item>Orders</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
