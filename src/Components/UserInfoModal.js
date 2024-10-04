import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { Formik } from 'formik';
import Controller from './formFileds/Controller';
import { validationSchema } from '../validationSchema/Schema';

export const UserInfoModal = ({
    showModal,
    onHide,
    editMode,
    handleUpdateUser,
    handleAddUser,
    initialValues
}) => {

    const onSubmit = (values) => {
        if (editMode) {
            handleUpdateUser(values);
        } else {
            handleAddUser(values);
        }
        onHide();
    }

    return (
        <Modal show={showModal} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{editMode ? 'Edit User' : 'Add User'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {({ handleSubmit }) => (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formBasicName">
                                <Controller 
                                    label="Name"
                                    control="input" 
                                    name="name" 
                                    type="text" 
                                    placeholder="e.g. John" 
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Controller 
                                    label="Email" 
                                    control="input" 
                                    name="email" 
                                    type="email" 
                                    placeholder="e.g. test@yopmail.com" 
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicPhone">
                                <Controller 
                                    label="Phone Number" 
                                    control="input" 
                                    name="phone" 
                                    type="text" 
                                    placeholder="e.g. 55858-58585" 
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicCity">
                                <Controller 
                                    label="City" 
                                    control="input" 
                                    name="city" 
                                    type="text" 
                                    placeholder="e.g. Jaipur" 
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicZipcode">
                                <Controller 
                                    label="Zip Code" 
                                    control="input" 
                                    name="zipcode" 
                                    type="number" 
                                    placeholder="e.g. 331023" 
                                />
                            </Form.Group>
                            <div className='d-flex gap-2 mt-3 justify-content-end'>
                                <Button variant="secondary" onClick={onHide}>
                                    Close
                                </Button>
                                <Button variant="primary" type="submit">
                                    {editMode ? 'Update' : 'Add'}
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    );
};
