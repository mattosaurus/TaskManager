import React from 'react';
import Container from 'react-bootstrap/Container';
import NavMenu from './NavMenu';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div>
      <NavMenu/>
      <Container>
        {children}
      </Container>
      <Footer />
    </div>
  );
}

export default Layout;