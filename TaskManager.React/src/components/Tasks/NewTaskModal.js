import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Formik, Field, ErrorMessage } from 'formik';
import NewTaskForm from './NewTaskForm';

const NewTaskModal = (props) => {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Modal heading
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <NewTaskForm
                handleAddTask={props.handleAddTask} />
        </Modal.Body>
        <Modal.Footer>
            <Button type="submit" form="newTaskForm">Save</Button>
            <Button onClick={props.onHide}>Cancel</Button>
        </Modal.Footer>
    </Modal>
      );
}

export default NewTaskModal;