import React, { useState } from 'react';
import { Button, Card, Table, Spinner } from "react-bootstrap";
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { ConfirmationModal } from './ConfirmationModal';

export const UserTable = ({ user, handleEditUser, handleDeleteUser, loading, currentPage, usersPerPage }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);

    const handleDeleteClick = (userId) => {
        setSelectedUserId(userId);
        setShowModal(true);
    };

    const handleConfirmDelete = () => {
        handleDeleteUser(selectedUserId);
        setShowModal(false); 
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <Card className='mb-5 shadow-sm rounded'>
                <Card.Body className="p-0">
                    <Table hover responsive className="mb-0 user-table">
                        <thead className="table-header">
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>City</th>
                                <th>Zip Code</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-light">
                            {loading ? (
                                <tr>
                                    <td colSpan="7" className="text-center">
                                        <Spinner animation="border" role="status" className="text-primary">
                                            <span className="visually-hidden">Loading...</span>
                                        </Spinner>
                                        <p className="mt-2 fw-semibold">Loading users...</p>
                                    </td>
                                </tr>
                            ) : (
                                user && user.length > 0 ? (
                                    user.map((user, index) => (
                                        <tr key={user.email} className="align-middle">
                                            <td className="fw-bold py-3">{(currentPage - 1) * usersPerPage + index + 1}</td>
                                            <td className="py-3">{user.name}</td>
                                            <td className="py-3">{user.email}</td>
                                            <td className="py-3">{user.phone}</td>
                                            <td className="py-3">{user.city}</td>
                                            <td className="py-3">{user.zipcode}</td>
                                            <td className="d-flex py-3">
                                                <Button
                                                    variant="outline-primary"
                                                    onClick={() => handleEditUser(user)}
                                                    className="me-2 d-flex align-items-center btn-sm"
                                                >
                                                    <FaEdit />
                                                </Button>
                                                <Button
                                                    variant="outline-danger"
                                                    onClick={() => handleDeleteClick(user.id)}
                                                    className="d-flex align-items-center btn-sm"
                                                >
                                                    <FaTrashAlt />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="text-center">No users found.</td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
            <ConfirmationModal 
            show={showModal} 
            onHide={handleCloseModal} 
            handleConfirmDelete={handleConfirmDelete}
             />
        </>
    );
};

