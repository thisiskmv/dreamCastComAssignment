import React, { useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers, addUser, updateUser, deleteUser } from "../redux/slice/userSlice";
import { UserInfoModal } from './UserInfoModal';
import { UserTable } from './UserTable';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';

const UsersDetails = () => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users.users);
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', city: '', zipcode: '' });
    const [editingUserId, setEditingUserId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5;

    const totalPages = Math.ceil(users.length / usersPerPage);
    const currentUsers = users.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage);
    

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            if (!response.ok) throw new Error('Failed to fetch users');
            const data = await response.json();
            const transformedData = data.map(({ id, name, email, phone, address }) => ({
                id,
                name,
                email,
                phone,
                city: address.city,
                zipcode: address.zipcode,
            }));
            dispatch(setUsers(transformedData));
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteUser = (id) => {
        dispatch(deleteUser(id));
        const updatedUsers = users.filter(user => user.id !== id);
        const totalPagesAfterDelete = Math.ceil(updatedUsers.length / usersPerPage);
        
        if (currentPage > totalPagesAfterDelete && totalPagesAfterDelete > 0) {
            setCurrentPage(totalPagesAfterDelete);
        } else if (updatedUsers.length === 0) {
            setCurrentPage(1); 
        }
    };

    const handleAddUser = (values) => {
        const userIds = users.map(user => user.id).filter(id => typeof id === 'number');
        const newId = userIds.length > 0 ? Math.max(...userIds) + 1 : 1; 

        const newUser = {
            id: newId,
            ...values,
        };
        dispatch(addUser(newUser));
        setCurrentPage(1);
        resetForm();
    };

    const handleEditUser = (user) => {
        setEditMode(true);
        setEditingUserId(user.id);
        setFormData(user);
        setShowModal(true);
    };

    const handleUpdateUser = (values) => {
        dispatch(updateUser({ id: editingUserId, updatedData: values }));
        resetForm();
    };

    const resetForm = () => {
        setFormData({ name: '', email: '', phone: '', city: '', zipcode: '' });
        setShowModal(false);
        setEditMode(false);
        setEditingUserId(null);
    };

    useEffect(() => {
        fetchUsers();
    }, [dispatch]);

    return (
        <Container className="mt-5">
           <h2 className="text-center mb-4 stylish-heading">User List</h2>
            <div className="d-flex justify-content-end mb-3">
                <Button variant="primary" onClick={() => setShowModal(true)}>
                    Add User
                </Button>
            </div>

            <UserTable
                user={currentUsers}
                handleEditUser={handleEditUser}
                handleDeleteUser={handleDeleteUser}
                loading={loading}
                currentPage={currentPage}
                usersPerPage={usersPerPage} 
            />


            {users.length > 0 && (
                <ResponsivePagination
                    current={currentPage}
                    total={totalPages}
                    onPageChange={setCurrentPage}
                />
            )}

            <UserInfoModal
                showModal={showModal}
                onHide={resetForm}
                editMode={editMode}
                handleUpdateUser={handleUpdateUser}
                handleAddUser={handleAddUser}
                initialValues={formData}
            />
        </Container>
    );
};

export default UsersDetails;
