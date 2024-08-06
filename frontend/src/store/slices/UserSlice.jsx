// store/slices/UserSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: []
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    removeUser: (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
    updateUser: (state, action) => {
      const index = state.users.findIndex(user => user.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    }
  }
});

export const { setUsers, addUser, removeUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
