import React, { useState } from "react";
// import { Link } from 'react-router-dom';
import { Navbar, Container, Nav, Modal, Tab } from 'react-bootstrap';
import SignupForm from '../SignupForm/index';
import LoginForm from '../LoginForm/index';

import Auth from '../../utils/auth';

function Navigation (props) {
  const [showModal, setShowModal] = useState(false);
  // const tabs = [ 'Collection', 'Browse', 'Random','About'];

  const {
    pages = [],
    setCurrentPage,
    currentPage,
  } = props;
  return (
    <>
      <Navbar className="navbar" sticky="top" id="navbar" bg="" expand="md">
        <Container className="brand-con">
          <Navbar.Brand className ="brand" href="/"><em>tripMix</em></Navbar.Brand>
        </Container>
        <Container className="nav-links-con">  
          <Nav className="nav-links">
            <ul className="nav-item" >
            {pages.map(Page => (
              <li
                className={`mx-5 ${
                  currentPage.name === Page.name && 'navActive'
                  }`}
                key={Page.name}
                >
                <span
                  onClick={() => setCurrentPage(Page)}
                >
                  {(Page.name)}
                </span>
              </li>
              
              ))}
            </ul>
          </Nav>
          <Nav className='ml-auto login'>
              {Auth.loggedIn() ? (
                <>
                  <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
                </>
              ) : (
                <Nav.Link onClick={() => setShowModal(true)}>Login/Sign Up</Nav.Link>
              )}
          </Nav>
        </Container>
      </Navbar>
      <Modal
        {...props}
        size='lg'
        color='#262626'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='signup-modal'
        centered>
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey='login'>
          <Modal.Header className="modal-header" closeButton>
            <Modal.Title className="modal-title" id='signup-modal'>
              <Nav variant='pills'>
                <Nav.Item>
                  <Nav.Link eventKey='login'>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-body">
            <Tab.Content>
              <Tab.Pane eventKey='login'>
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
                <SignupForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>  
      
    
  );
}


export default Navigation;