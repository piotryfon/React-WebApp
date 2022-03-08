import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import React from 'react'; 

const ModalAdd = ({ isShowing, hide, submit }) => isShowing ? ReactDOM.createPortal(

  <React.Fragment>
    <Modal show={isShowing} onHide={hide} className="edit-modal">

      <Modal.Header closeButton>
        <Modal.Title>Dodaj pracownika</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col sm={6}>
            <Form onSubmit={submit}>

              <Form.Group controlId="Name">
                <Form.Label>User Name</Form.Label>
                <Form.Control type="text" name="Name" required
                  placeholder="User Name" minLength={3} maxLength={40} />
              </Form.Group>

              <Form.Group controlId="EmailAddress">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" minLength={8} maxLength={40} name="EmailAddress" required
                  placeholder="Email Address" />
              </Form.Group><br />

              <Form.Group>
                <Button variant="primary" type="submit">
                  Add User
                </Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={hide}>
          Close
        </Button>
      </Modal.Footer>

    </Modal>
  </React.Fragment>, document.body
) : null;

export default ModalAdd;