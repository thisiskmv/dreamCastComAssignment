// userSlice.js

import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
    },
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload;
        },
        addUser: (state, action) => {
            // Prepend new user to the users array
            state.users.unshift(action.payload);
        },
        updateUser: (state, action) => {
            const { id, updatedData } = action.payload;
            const index = state.users.findIndex((user) => user.id === id);
            if (index !== -1) {
                state.users[index] = { ...state.users[index], ...updatedData };
            }
        },
        deleteUser: (state, action) => {
            state.users = state.users.filter((user) => user.id !== action.payload);
        },
    },
});

// Export actions
export const { setUsers, addUser, updateUser, deleteUser } = userSlice.actions;

// Export the reducer
export default userSlice.reducer;
