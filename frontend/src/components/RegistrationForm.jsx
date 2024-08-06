// // import React from 'react';

// // const RegistrationForm = () => {
// //   const validateForm = (e) => {
// //     e.preventDefault();
// //     // const username = e.target.username.value;
// //     // const email = e.target.email.value;
// //     // const password = e.target.password.value;
// //     // const confirmPassword = e.target['confirm-password'].value;
// //     const username = e.target.elements.username.value;
// //     const email = e.target.elements.email.value;
// //     const password = e.target.elements.password.value;
// //     const confirmPassword = e.target.elements['confirm-password'].value;

// //      if (username === '' && email === '' && password === '' && confirmPassword === '' ){
// //       alert('Please enter all fields');
// //       return false;
// //     }
// //     if (username === '')
// //     {
// //       alert('Username is required');
// //       return false;
// //     }

// //     if (email === '') {
// //       alert('Email is required');
// //       return false;
// //     }

// //     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// //     if (!emailPattern.test(email)) {
// //       alert('Please enter a valid email address');
// //       return false;
// //     }

// //     if (password === '') {
// //       alert('Password is required');
// //       return false;
// //     }

// //     if (confirmPassword === '') {
// //       alert('Confirm Password is required');
// //       return false;
// //     }

// //     if (password !== confirmPassword) {
// //       alert('Passwords do not match');
// //       return false;
// //     }

// //     alert('Form submitted successfully');
// //   };

// //   return (
// //     <div className="container mx-auto mt-20 px-4 flex justify-center">
// //       <div className="form-container bg-white p-8 shadow-md rounded-lg w-full md:w-1/3 mt-20 md:mt-0 z-10">
// //         <h2 className="text-2xl font-bold mb-4">User Registration</h2>
// //         <form id="registration-form" onSubmit={validateForm}>
// //           <div className="form-group mb-4">
// //             <label htmlFor="username" className="text-gray-700">Username</label>
// //             <input type="text" id="username" name="username" minLength="6"  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" data-testid="username" />
// //           </div>
// //           <div className="form-group mb-4">
// //             <label htmlFor="email" className="text-gray-700">Email</label>
// //             <input type="email" id="email" name="email" className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" data-testid="email" />
// //           </div>
// //           <div className="form-group mb-4">
// //             <label htmlFor="password" className="text-gray-700">Password</label>
// //             <input type="password" id="password" name="password"  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" data-testid="password" />
// //           </div>
// //           <div className="form-group mb-4">
// //             <label htmlFor="confirm-password" className="text-gray-700">Confirm Password</label>
// //             <input type="password" id="confirm-password" name="confirm-password"  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" data-testid="confirm-password" />
// //           </div>
// //           <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">Register</button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default RegistrationForm;

// import React, { useState } from 'react';

// const RegistrationForm = () => {
//   const [loading, setLoading] = useState(false);

//   const validateForm = async (e) => {
//     e.preventDefault();

//     const username = e.target.elements.username.value;
//     const email = e.target.elements.email.value;
//     const password = e.target.elements.password.value;
//     const confirmPassword = e.target.elements['confirm-password'].value;

//     if (username === '' || email === '' || password === '' || confirmPassword === '') {
//       alert('Please enter all fields');
//       return;
//     }

//     if (password !== confirmPassword) {
//       alert('Passwords do not match');
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await fetch('http://localhost:3000/api/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ username, email, password }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         alert('Registration successful');
//         // Optionally, redirect the user to another page
//       } else {
//         alert(data.message || 'Registration failed');
//       }
//     } catch (error) {
//       alert('Error: ' + error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mx-auto mt-20 px-4 flex justify-center">
//       <div className="form-container bg-white p-8 shadow-md rounded-lg w-full md:w-1/3 mt-20 md:mt-0 z-10">
//         <h2 className="text-2xl font-bold mb-4">User Registration</h2>
//         <form id="registration-form" onSubmit={validateForm} autoComplete='off'>
//           <div className="form-group mb-4">
//             <label htmlFor="username" className="text-gray-700">Username</label>
//             <input type="text" id="username" name="username" minLength="6" className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" data-testid="username" autoComplete='off'/>
//           </div>
//           <div className="form-group mb-4">
//             <label htmlFor="email" className="text-gray-700">Email</label>
//             <input type="email" id="email" name="email" className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" data-testid="email" autoComplete='off'/>
//           </div>
//           <div className="form-group mb-4">
//             <label htmlFor="password" className="text-gray-700">Password</label>
//             <input type="password" id="password" name="password" className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" data-testid="password" autoComplete='off'/>
//           </div>
//           <div className="form-group mb-4">
//             <label htmlFor="confirm-password" className="text-gray-700">Confirm Password</label>
//             <input type="password" id="confirm-password" name="confirm-password" className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" data-testid="confirm-password" autoComplete='off'/>
//           </div>
//           <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300" disabled={loading}>
//             {loading ? 'Registering...' : 'Register'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default RegistrationForm;
 
import React, { useState } from 'react';

const RegistrationForm = () => {
  const [loading, setLoading] = useState(false);

  const validateForm = async (e) => {
    e.preventDefault();

    const username = e.target.elements.username.value;
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    const confirmPassword = e.target.elements['confirm-password'].value;

    if (username === '' || email === '' || password === '' || confirmPassword === '') {
      alert('Please enter all fields');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Registration successful');
        // Optionally, redirect the user to another page
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (error) {
      alert('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto mt-20 px-4 flex justify-center">
      <div className="form-container bg-white p-8 shadow-md rounded-lg w-full md:w-1/3 mt-20 md:mt-0 z-10">
        <h2 className="text-2xl font-bold mb-4">User Registration</h2>
        <form id="registration-form" onSubmit={validateForm} autoComplete="off">
          <div className="form-group mb-4">
            <label htmlFor="username" className="text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              minLength="6"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              data-testid="username"
              autoComplete="off"
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="email" className="text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              data-testid="email"
              autoComplete="off"
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="password" className="text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              data-testid="password"
              autoComplete="new-password"
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="confirm-password" className="text-gray-700">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              data-testid="confirm-password"
              autoComplete="new-password"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
