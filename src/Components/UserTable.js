import React from 'react';
import { Button, Card, Table, Spinner } from "react-bootstrap";

export const UserTable = ({ user, handleEditUser, handleDeleteUser, loading, currentPage, usersPerPage }) => {
    return (
        <Card className='mb-3'>
            <Card.Body>
                <Table striped bordered hover responsive variant="light">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>City</th>
                            <th>Zip Code</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="7" className="text-center">
                                    <Spinner animation="border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </Spinner>
                                    <p>Loading users...</p>
                                </td>
                            </tr>
                        ) : (
                            user && user.length > 0 ? (
                                user.map((user, index) => (
                                    <tr key={user.id}>
                                        {/* Display ID based on pagination */}
                                        <td>{user.id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.phone}</td>
                                        <td>{user.city}</td>
                                        <td>{user.zipcode}</td>
                                        <td>
                                            <Button variant="secondary" onClick={() => handleEditUser(user)} className="me-2">
                                                Edit
                                            </Button>
                                            <Button variant="danger" onClick={() => handleDeleteUser(user.id)}>
                                                Delete
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
    );
};
