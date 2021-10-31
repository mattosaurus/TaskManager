import React from 'react';
import Container from 'react-bootstrap/Container';
import { brandConfig } from "../../config/brandConfig";
import './Footer.css';

const Footer = () => {
    return (
        <footer className="border-top footer text-muted">
            <Container fluid>
                &copy; {(new Date().getFullYear())} - {brandConfig.name}
            </Container>
        </footer>
    );
}

export default Footer;