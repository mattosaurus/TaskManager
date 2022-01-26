import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
 
 const NewTaskForm = (props) => {
    // Note that we have to initialize ALL of fields with values. These
    // could come from props, but since we don’t want to prefill this form,
    // we just use an empty string. If we don’t do this, React will yell
    // at us.
    let currentDate = new Date();
    currentDate.setHours(0,0,0,0);

    const formik = useFormik({
        initialValues: {
            id: uuidv4(),
            name: '',
            description: '',
            status: 'ToDo',
            date: currentDate.toISOString().substring(0, 10)
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required('Required'),
                description: Yup.string()
                .required('Required'),
                date: Yup.date()
                .min(currentDate)
                .required('Required')
          }),
          onSubmit: values => {
            props.handleAddTask(values);
          },
    });
   return (
        <Form  onSubmit={formik.handleSubmit} id="newTaskForm">
            <Form.Group as={Row} className="mb-3" controlId="formId">
                <Form.Label column sm={2}>
                    ID
                </Form.Label>
                <Col sm={10}>
                    <Form.Control type="text" id="id" name="id" value={formik.values.id} onChange={formik.handleChange} disabled />
                    {formik.touched.name && formik.errors.id ? (
                        <div>{formik.errors.id}</div>
                    ) : null}
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formName">
                <Form.Label column sm={2}>
                    Task Name
                </Form.Label>
                <Col sm={10}>
                    <Form.Control type="text" id="name" name="name" value={formik.values.name} onChange={formik.handleChange} isInvalid={formik.touched.name && formik.errors.name}/>
                    {formik.touched.name && formik.errors.name ? (
                        <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
                    ) : null}
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formDescription">
                <Form.Label column sm={2}>
                    Description
                </Form.Label>
                <Col sm={10}>
                    <Form.Control type="textbox" id="description" name="description" value={formik.values.description} onChange={formik.handleChange} isInvalid={formik.touched.description && formik.errors.description} />
                    {formik.touched.description && formik.errors.description ? (
                        <Form.Control.Feedback type="invalid">{formik.errors.description}</Form.Control.Feedback>
                    ) : null}
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formStatus">
                <Form.Label as="legend" column sm={2}>
                    Status
                </Form.Label>
                <Col sm={10}>
                    <Form.Select id="status" name="status" value={formik.values.status} onChange={formik.handleChange} isInvalid={formik.touched.status && formik.errors.status} >
                        <option value="ToDo">To Do</option>
                        <option value="InProgress">In Progress</option>
                        <option value="Complete">Complete</option>
                        <option value="Cancelled">Cancelled</option>
                    </Form.Select>
                    {formik.touched.status && formik.errors.status ? (
                        <Form.Control.Feedback type="invalid">{formik.errors.status}</Form.Control.Feedback>
                    ) : null}
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formDate">
                <Form.Label column sm={2}>
                    Date
                </Form.Label>
                <Col sm={10}>
                    <Form.Control type="date" id="date" name="date" value={formik.values.date} onChange={formik.handleChange} isInvalid={formik.touched.date && formik.errors.date} />
                    {formik.touched.date && formik.errors.date ? (
                        <Form.Control.Feedback type="invalid">{formik.errors.date}</Form.Control.Feedback>
                    ) : null}
                </Col>
            </Form.Group>
        </Form>
   );
 };

 export default NewTaskForm;