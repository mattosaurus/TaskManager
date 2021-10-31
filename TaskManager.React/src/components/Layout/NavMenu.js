import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import AuthenticationDropdown from '../Authentication/AuthenticationDropdown';
import { Link } from 'react-router-dom';
import { brandConfig } from "../../config/brandConfig";
import './NavMenu.css';

const NavMenu = () => {
  return (
    <header>
        <Navbar bg="light" expand="lg">
        <Container>
            <Navbar.Brand as={Link} to="/">{brandConfig.name}</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="d-sm-inline-flex flex-sm-row-reverse">
              <ul className="navbar-nav flex-grow">
                <Nav.Item>
                  <Nav.Link as={Link} to="/Workspace/">Workspace</Nav.Link>
                </Nav.Item>
                <li>
                  <AuthenticationDropdown/>
                </li>
              </ul>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    </header>
  );
}

export default NavMenu;