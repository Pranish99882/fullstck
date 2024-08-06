// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import { setUsers, addUser, removeUser } from '../store/slices/UserSlice';

// const UserListing = () => {
//   const dispatch = useDispatch();
//   const users = useSelector((state) => state.user.users);
//   const [showModal, setShowModal] = useState(false);
//   const [newUser, setNewUser] = useState({
//     email: '',
//     password: '',
//     roleNames: '',
//     permissionNames: ''
//   });

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/students');
//         dispatch(setUsers(response.data));
//       } catch (error) {
//         console.error('Error fetching users:', error);
//       }
//     };

//     fetchUsers();
//   }, [dispatch]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewUser({
//       ...newUser,
//       [name]: value
//     });
//   };

//   const handleCreateUser = async () => {
//     try {
//       const response = await axios.post('http://localhost:3000/students', {
//         email: newUser.email,
//         password: newUser.password,
//         roleNames: newUser.roleNames.split(',').map(role => role.trim()),
//         permissionNames: newUser.permissionNames.split(',').map(permission => permission.trim())
//       });
//       dispatch(addUser(response.data));
//       setShowModal(false);
//     } catch (error) {
//       console.error('Error creating user:', error);
//     }
//   };

//   const deleteUser = async (userId) => {
//     try {
//       await axios.delete(`http://localhost:3000/students/${userId}`);
//       dispatch(removeUser(userId));
//     } catch (error) {
//       console.error('Error deleting user:', error);
//     }
//   };

//   return (
//     <div className="container mx-auto mt-20 px-4">
//       <div className="list-container bg-white p-6 shadow-md rounded-lg">
//         <h2 className="text-2xl font-bold mb-4">User Listing</h2>
//         <button 
//           className="create-button bg-blue-500 text-white py-1 px-2 rounded-md hover:bg-blue-600 transition duration-300 mb-4"
//           onClick={() => setShowModal(true)}
//         >
//           Create
//         </button>
//         <table className="w-full">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="px-4 py-2">Email</th>
//               <th className="px-4 py-2">Password</th>
//               <th className="px-4 py-2">Role Names</th>
//               <th className="px-4 py-2">Permission Names</th>
//               <th className="px-4 py-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user) => (
//               <tr key={user.id} className="border-b border-gray-200">
//                 <td className="px-4 py-2">{user.email}</td>
//                 <td className="px-4 py-2">{user.password}</td>
//                 <td className="px-4 py-2">
//                   {(user.roleNames && Array.isArray(user.roleNames) ? user.roleNames : []).join(', ')}
//                 </td>
//                 <td className="px-4 py-2">
//                   {(user.permissionNames && Array.isArray(user.permissionNames) ? user.permissionNames : []).join(', ')}
//                 </td>
//                 <td className="px-4 py-2 flex space-x-2">
//                   <Link to={`/edit_profile`} state={{ userId: user.id }}>
//                     <button className="edit-button bg-green-500 text-white py-1 px-2 rounded-md hover:bg-green-600 transition duration-300">Edit</button>
//                   </Link>
//                   <button className="delete-button bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600 transition duration-300" onClick={() => deleteUser(user.id)}>Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {showModal && (
//         <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
//           <div className="bg-white p-6 rounded-lg shadow-md w-1/3">
//             <h2 className="text-xl font-bold mb-4">Create New User</h2>
//             <div className="mb-4">
//               <label className="block text-gray-700">Email:</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={newUser.email}
//                 onChange={handleInputChange}
//                 className="w-full px-3 py-2 border rounded-md"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700">Password:</label>
//               <input
//                 type="password"
//                 name="password"
//                 value={newUser.password}
//                 onChange={handleInputChange}
//                 className="w-full px-3 py-2 border rounded-md"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700">Role Names:</label>
//               <input
//                 type="text"
//                 name="roleNames"
//                 value={newUser.roleNames}
//                 onChange={handleInputChange}
//                 className="w-full px-3 py-2 border rounded-md"
//                 placeholder="Separate roles with commas"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700">Permission Names:</label>
//               <input
//                 type="text"
//                 name="permissionNames"
//                 value={newUser.permissionNames}
//                 onChange={handleInputChange}
//                 className="w-full px-3 py-2 border rounded-md"
//                 placeholder="Separate permissions with commas"
//               />
//             </div>
//             <div className="flex justify-end">
//               <button 
//                 className="bg-blue-500 text-white py-1 px-4 rounded-md hover:bg-blue-600 transition duration-300 mr-2"
//                 onClick={handleCreateUser}
//               >
//                 Create
//               </button>
//               <button 
//                 className="bg-gray-500 text-white py-1 px-4 rounded-md hover:bg-gray-600 transition duration-300"
//                 onClick={() => setShowModal(false)}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserListing;

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { setUsers, addUser, removeUser } from '../store/slices/UserSlice';

const UserListing = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({
    email: '',
    password: '',
    roleNames: '',
    permissionNames: ''
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/students',{
          withCredentials: true,  
        });
       
        dispatch(setUsers(response.data));
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({
      ...newUser,
      [name]: value
    });
  };

  const handleCreateUser = async () => {
   
  const token = localStorage.getItem('authToken');
  console.log('Token:', token);
    try {

      const response = await axios.post('http://localhost:3000/students', {
        email: newUser.email,
        password: newUser.password,
        roleNames: newUser.roleNames.split(',').map(role => role.trim()),
       
        permissionNames: newUser.permissionNames.split(',').map(permission => permission.trim()),
      },
      {
      withCredentials: true,
      
          headers: {
            'Authorization': `Bearer ${token}`
          },
         
        
      
      });
      dispatch(addUser(response.data));
      setShowModal(false);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:3000/students/${userId}`);
      dispatch(removeUser(userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="container mx-auto mt-20 px-4">
      <div className="list-container bg-white p-6 shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4">User Listing</h2>
        <button 
          className="create-button bg-blue-500 text-white py-1 px-2 rounded-md hover:bg-blue-600 transition duration-300 mb-4"
          onClick={() => setShowModal(true)}
        >
          Create
        </button>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2" >Email</th>
              <th className="px-4 py-2" >Password</th>
              <th className="px-4 py-2">Role Names</th>
              <th className="px-4 py-2">Permission Names</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-gray-200">
                <td className="px-4 py-2 "  >{user.id}</td>
                <td className="px-4 py-2 ">{user.email}</td>
                <td className="px-4 py-2">{user.password}</td>
                <td className="px-4 py-2">
                  {(user.roleNames || []).join(', ')}
                </td>
                <td className="px-4 py-2">
                  {(user.permissionNames || []).join(', ')}
                </td>
                <td className="px-4 py-2 flex space-x-2">
                  <Link to={`/edit_profile`} state={{ userId: user.id }}>
                    <button className="edit-button bg-green-500 text-white py-1 px-2 rounded-md hover:bg-green-600 transition duration-300">Edit</button>
                  </Link>
                  <button className="delete-button bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600 transition duration-300" onClick={() => deleteUser(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md w-1/3">
            <h2 className="text-xl font-bold mb-4">Create New User</h2>
            <div className="mb-4">
              <label className="block text-gray-700 ">Email:</label>
              <input
                type="email"
                name="email"
                autoComplete="new-email"
                value={newUser.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password:</label>
              <input
                type="password"
                name="password"
                autoComplete="new-password"
                value={newUser.password}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Role Names:</label>
              <input
                type="text"
                name="roleNames"
                value={newUser.roleNames}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Separate roles with commas"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Permission Names:</label>
              <input
                type="text"
                name="permissionNames"
                value={newUser.permissionNames}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Separate permissions with commas"
              />
            </div>
            <div className="flex justify-end">
              <button 
                className="bg-blue-500 text-white py-1 px-4 rounded-md hover:bg-blue-600 transition duration-300 mr-2"
                onClick={handleCreateUser}
              >
                Create
              </button>
              <button 
                className="bg-gray-500 text-white py-1 px-4 rounded-md hover:bg-gray-600 transition duration-300"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserListing;
