// import { configureStore } from "@reduxjs/toolkit";
// import  userSlice  from "./slices/UserSlice";

// const store=configureStore({
//     reducer: {
//         users:userSlice.reducer
//     }, 
// });

// export default store;

import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/UserSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
