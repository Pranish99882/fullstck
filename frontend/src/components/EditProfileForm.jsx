// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const EditProfileForm = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
  
//   const [user, setUser] = useState({
//     id: '',
//     email: '',
//     password: '',
//     roleNames: '',
//     permissionNames: ''
//   });

//   useEffect(() => {
//     const fetchUser = async () => {
//       const { userId } = location.state || {};
//       if (userId) {
//         try {
//           const response = await axios.get(`http://localhost:3000/students/${userId}`);
//           setUser({
//             ...response.data,
//             roleNames: (response.data.roleNames || []).join(', '),
//             permissionNames: (response.data.permissionNames || []).join(', ')
//           });
//         } catch (error) {
//           console.error('Error fetching user data:', error);
//         }
//       } else {
//         console.error('User ID is missing in location state');
//       }
//     };

//     fetchUser();
//   }, [location.state]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUser({
//       ...user,
//       [name]: value
//     });
//   };

//   const handleSave = async () => {
//     if (!user.id) {
//       console.error('User ID is missing:', user);
//       return;
//     }

//     try {
//       const response = await axios.put(`http://localhost:3000/students/${user.id}`, {
//         email: user.email,
//         password: user.password,
//         roleNames: user.roleNames.split(',').map(role => role.trim()),
//         permissionNames: user.permissionNames.split(',').map(permission => permission.trim())
//       });
//       console.log('Profile updated successfully:', response.data);
//       navigate('/user_listing');
//     } catch (error) {
//       console.error('Error updating user:', error);
//     }
//   };

//   return (
//     <div className="container mx-auto mt-20 px-4">
//       <div className="form-container bg-white p-6 shadow-md rounded-lg">
//         <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
//         <div className="mb-4">
//           <label className="block text-gray-700">Email:</label>
//           <input
//             type="email"
//             name="email"
//             value={user.email}
//             onChange={handleInputChange}
//             className="w-full px-3 py-2 border rounded-md"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Password:</label>
//           <input
//             type="password"
//             name="password"
//             value={user.password}
//             onChange={handleInputChange}
//             className="w-full px-3 py-2 border rounded-md"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Role Names:</label>
//           <input
//             type="text"
//             name="roleNames"
//             value={user.roleNames}
//             onChange={handleInputChange}
//             className="w-full px-3 py-2 border rounded-md"
//             placeholder="Separate roles with commas"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Permission Names:</label>
//           <input
//             type="text"
//             name="permissionNames"
//             value={user.permissionNames}
//             onChange={handleInputChange}
//             className="w-full px-3 py-2 border rounded-md"
//             placeholder="Separate permissions with commas"
//           />
//         </div>
//         <div className="flex justify-end">
//           <button 
//             className="bg-blue-500 text-white py-1 px-4 rounded-md hover:bg-blue-600 transition duration-300 mr-2"
//             onClick={handleSave}
//           >
//             Save
//           </button>
//           <button 
//             className="bg-gray-500 text-white py-1 px-4 rounded-md hover:bg-gray-600 transition duration-300"
//             onClick={() => navigate('/user_listing')}
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditProfileForm;


// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const EditProfileForm = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
  
//   const [user, setUser] = useState({
//     id: '',
//     email: '',
//     password: '',
//     roleNames: '',
//     permissionNames: ''
//   });

//   useEffect(() => {
//     const fetchUser = async () => {
//       const { userId } = location.state || {};
//       if (userId) {
//         try {
//           const response = await axios.get(`http://localhost:3000/students/${userId}`);
//           setUser({
//             id: response.data.id,
//             email: response.data.email,
//             password: response.data.password,
//             roleNames: (response.data.roleNames || []).join(', '),
//             permissionNames: (response.data.permissionNames || []).join(', ')
//           });
//         } catch (error) {
//           console.error('Error fetching user data:', error);
//         }
//       } else {
//         console.error('User ID is missing in location state');
//       }
//     };

//     fetchUser();
//   }, [location.state]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUser({
//       ...user,
//       [name]: value
//     });
//   };

//   const handleSave = async () => {
//     console.log(user);
//     if (!user.id) {
//       console.error('User ID is missing:', user);
//       return;
//     }

//     try {
//       const response = await axios.put(`http://localhost:3000/students`, {
//         email: user.email,
//         password: user.password,
//         roleNames: user.roleNames.split(',').map(role => role.trim()),
//         permissionNames: user.permissionNames.split(',').map(permission => permission.trim())
//       });
//       console.log('Profile updated successfully:', response.data);
//       navigate('/user_listing');
//     } catch (error) {
//       console.error('Error updating user:', error);
//     }
//   };

//   return (
//     <div className="container mx-auto mt-20 px-4">
//       <div className="form-container bg-white p-6 shadow-md rounded-lg">
//         <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
//         <div className="mb-4">
//           <label className="block text-gray-700">Email:</label>
//           <input
//             type="email"
//             name="email"
//             value={user.email}
//             onChange={handleInputChange}
//             className="w-full px-3 py-2 border rounded-md"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Password:</label>
//           <input
//             type="password"
//             name="password"
//             value={user.password}
//             onChange={handleInputChange}
//             className="w-full px-3 py-2 border rounded-md"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Role Names:</label>
//           <input
//             type="text"
//             name="roleNames"
//             value={user.roleNames}
//             onChange={handleInputChange}
//             className="w-full px-3 py-2 border rounded-md"
//             placeholder="Separate roles with commas"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Permission Names:</label>
//           <input
//             type="text"
//             name="permissionNames"
//             value={user.permissionNames}
//             onChange={handleInputChange}
//             className="w-full px-3 py-2 border rounded-md"
//             placeholder="Separate permissions with commas"
//           />
//         </div>
//         <div className="flex justify-end">
//           <button 
//             className="bg-blue-500 text-white py-1 px-4 rounded-md hover:bg-blue-600 transition duration-300 mr-2"
//             onClick={handleSave}
//           >
//             Save
//           </button>
//           <button 
//             className="bg-gray-500 text-white py-1 px-4 rounded-md hover:bg-gray-600 transition duration-300"
//             onClick={() => navigate('/user_listing')}
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditProfileForm;

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditProfileForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    id: '',
    email: '',
    password: '',
    roleNames: '',
    permissionNames: ''
  });

  useEffect(() => {
    const fetchUser = async () => {
      const { userId } = location.state || {};
      if (userId) {
        try {
          const response = await axios.get(`http://localhost:3000/students/${userId}`);
          setUser({
            id: response.data.id,
            email: response.data.email,
            password: response.data.password,
            roleNames: (response.data.roleNames || []).join(', '),
            permissionNames: (response.data.permissionNames || []).join(', ')
          });
        } catch (error) {
          console.error('Error fetching user data:', error.response ? error.response.data : error.message);
        }
      } else {
        console.error('User ID is missing in location state');
      }
    };

    fetchUser();
  }, [location.state]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleSave = async () => {
    if (!user.id) {
      console.error('User ID is missing:', user);
      return;
    }

    try {
      const response = await axios.put(`http://localhost:3000/students/${user.id}`, {
        email: user.email,
        password: user.password,
        roleNames: user.roleNames.split(',').map(role => role.trim()),
        permissionNames: user.permissionNames.split(',').map(permission => permission.trim())
      });
      console.log('Profile updated successfully:', response.data);
      navigate('/user_listing');
    } catch (error) {
      console.error('Error updating user:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="container mx-auto mt-20 px-4">
      <div className="form-container bg-white p-6 shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Email:</label>
          <input
            type="email"
            name="email"
            autoComplete="new-email"
            value={user.email}
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
            value={user.password}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Role Names:</label>
          <input
            type="text"
            name="roleNames"
            value={user.roleNames}
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
            value={user.permissionNames}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Separate permissions with commas"
          />
        </div>
        <div className="flex justify-end">
          <button 
            className="bg-blue-500 text-white py-1 px-4 rounded-md hover:bg-blue-600 transition duration-300 mr-2"
            onClick={handleSave}
          >
            Save
          </button>
          <button 
            className="bg-gray-500 text-white py-1 px-4 rounded-md hover:bg-gray-600 transition duration-300"
            onClick={() => navigate('/user_listing')}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileForm;
