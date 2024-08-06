// // import { Request, Response } from 'express';
// // import { AppDataSource } from '../db/data_source';
// // import { Student } from '../entities/Student';
// // import { Role } from '../entities/Role';
// // import { Permission } from '../entities/Permission';

// // export const studentController = {
// //   create: async (req: Request, res: Response) => {
// //     try {
// //       // Ensure request body is defined
// //       if (!req.body) {
// //         return res.status(400).json({ message: 'Request body is missing' });
// //       }

// //       // Destructure required fields from request body
// //       const { email, password, roleNames, permissionNames } = req.body;

// //       // Check if essential fields are provided
// //       if (!email || !password) {
// //         return res.status(400).json({ message: 'Email and password are required' });
// //       }

// //       const studentRepository = AppDataSource.getRepository(Student);
// //       const roleRepository = AppDataSource.getRepository(Role);
// //       const permissionRepository = AppDataSource.getRepository(Permission);

// //       // Fetch or create roles
// //       const roles = [];
// //       if (roleNames) {
// //         for (const roleName of roleNames) {
// //           let role = await roleRepository.findOne({
// //             where: { name: roleName },
// //             relations: ['permissions'],
// //           });
// //           if (!role) {
// //             role = roleRepository.create({ name: roleName, permissions: [] });
// //             await roleRepository.save(role);
// //           }

// //           // Fetch or create permissions for the role
// //           if (permissionNames) {
// //             for (const permName of permissionNames) {
// //               let permission = await permissionRepository.findOne({ where: { name: permName } });
// //               if (!permission) {
// //                 permission = permissionRepository.create({ name: permName });
// //                 await permissionRepository.save(permission);
// //               }

// //               // Add permission to the role if not already present
// //               if (role.permissions) {  // Check if role.permissions is defined
// //                 if (!role.permissions.some(p => p.id === permission.id)) {
// //                   role.permissions.push(permission);
// //                 }
// //                 await roleRepository.save(role);
// //               }
// //             }
// //           }

// //           roles.push(role);
// //         }
// //       }

// //       // Create and save the student
// //       const student = studentRepository.create({
// //         email,
// //         password, // Ideally, password should be hashed before saving
// //         roles,
// //       });

// //       await studentRepository.save(student);
// //       res.status(201).json(student);
// //     } catch (error) {
// //       console.error('Error creating student:', error);
// //       res.status(500).json({ message: 'Internal server error' });
// //     }
// //   },

// //   // Other controller methods...



// //   getAll: async (req: Request, res: Response) => {
// //     const studentRepository = AppDataSource.getRepository(Student);
// //     const students = await studentRepository.find();
// //     res.json(students);
// //   },

// //   getOne: async (req: Request, res: Response) => {
// //     const studentRepository = AppDataSource.getRepository(Student);
// //     const student = await studentRepository.findOne({ where: { id: parseInt(req.params.id) } });
// //     if (!student) {
// //       return res.status(404).json({ message: 'Student not found' });
// //     }
// //     res.json(student);
// //   },

// //   update: async (req: Request, res: Response) => {
// //     const studentRepository = AppDataSource.getRepository(Student);
// //     let student = await studentRepository.findOne({ where: { id: parseInt(req.params.id) } });
// //     if (!student) {
// //       return res.status(404).json({ message: 'Student not found' });
// //     }
// //     student = studentRepository.merge(student, req.body);
// //     await studentRepository.save(student);
// //     res.json(student);
// //   },

// //   delete: async (req: Request, res: Response) => {
// //     const studentRepository = AppDataSource.getRepository(Student);
// //     const student = await studentRepository.findOne({ where: { id: parseInt(req.params.id) } });
// //     if (!student) {
// //       return res.status(404).json({ message: 'Student not found' });
// //     }
// //     await studentRepository.remove(student);
// //     res.json({ message: 'Student deleted' });
// //   },
// // };


// import { Request, Response } from 'express';
// import { AppDataSource } from '../db/data_source';
// import { Student } from '../entities/Student';
// import { Role } from '../entities/Role';
// import { Permission } from '../entities/Permission';

// export const studentController = {
  

// create :async (req: Request, res: Response) => {
//   try {
//     // Ensure request body is defined
//     if (!req.body) {
//       return res.status(400).json({ message: 'Request body is missing' });
//     }

//     // Destructure required fields from request body
//     const { email, password, roleNames, permissionNames } = req.body;

//     // Check if essential fields are provided
//     if (!email || !password) {
//       return res.status(400).json({ message: 'Email and password are required' });
//     }

//     const studentRepository = AppDataSource.getRepository(Student);
//     const roleRepository = AppDataSource.getRepository(Role);
//     const permissionRepository = AppDataSource.getRepository(Permission);

//     // Fetch or create roles
//     const roles = [];
//     if (roleNames) {
//       for (const roleName of roleNames) {
//         let role = await roleRepository.findOne({
//           where: { name: roleName },
//           relations: ['permissions'],
//         });
//         if (!role) {
//           role = roleRepository.create({ name: roleName, permissions: [] });
//           await roleRepository.save(role);
//         }

//         // Fetch or create permissions for the role
//         if (permissionNames) {
//           for (const permName of permissionNames) {
//             let permission = await permissionRepository.findOne({ where: { name: permName } });
//             if (!permission) {
//               permission = permissionRepository.create({ name: permName });
//               await permissionRepository.save(permission);
//             }

//             // Add permission to the role if not already present
//             if (!role.permissions.some(p => p.id === permission.id)) {
//               role.permissions.push(permission);
//             }
//           }
//           await roleRepository.save(role);
//         }

//         roles.push(role);
//       }
//     }

//     // Create and save the student
//     const student = studentRepository.create({
//       email,
//       password, // Ideally, password should be hashed before saving
//       roles,
//     });

//     await studentRepository.save(student);
//     res.status(201).json(student);
//   } catch (error) {
//     console.error('Error creating student:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// },


  
//   getAll: async (req: Request, res: Response) => {
//     try {
//       // Get the student repository
//       const studentRepository = AppDataSource.getRepository(Student);
  
//       // Fetch students with related roles and permissions
//       const students = await studentRepository.find({
//         relations: ['roles', 'roles.permissions']
//       });
  
//       // Transform the students data
//       const transformedStudents = students.map(student => ({
//         id: student.id, // Include student ID
//         email: student.email,
//         password: student.password,
//         roleNames: student.roles.map(role => role.name),
//         permissionNames: student.roles.flatMap(role => role.permissions.map(permission => permission.name))
//       }));
  
//       // Send the transformed data as response
//       res.json(transformedStudents);
//     } catch (error) {
//       console.error('Error fetching students:', error);
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   },
  
  
  
//    getOne : async (req: Request, res: Response) => {
//     try {
//       const studentRepository = AppDataSource.getRepository(Student);
  
//       // Fetch student with related roles and permissions
//       const student = await studentRepository.findOne({
//         where: { id: parseInt(req.params.id) },
//         relations: ['roles', 'roles.permissions'] // Include related roles and permissions
//       });
  
//       if (!student) {
//         return res.status(404).json({ message: 'Student not found' });
//       }
  
//       // Transform the student data
//       const transformedStudent = {
//         id: student.id,
//         email: student.email,
//         password: student.password,
//         roleNames: student.roles.map(role => role.name), // Map role entities to role names
//         permissionNames: student.roles.flatMap(role => role.permissions.map(permission => permission.name)) // Flatten permissions from roles
//       };
  
//       res.json(transformedStudent);
//     } catch (error) {
//       console.error('Error fetching student:', error);
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   },
  


//   update : async (req: Request, res: Response) => {
//     try {
//       const studentRepository = AppDataSource.getRepository(Student);
//       const roleRepository = AppDataSource.getRepository(Role); // Adjust if necessary
//       const permissionRepository = AppDataSource.getRepository(Permission); // Adjust if necessary
  
//       let student = await studentRepository.findOne({
//         where: { id: parseInt(req.params.id) },
//         relations: ['roles', 'roles.permissions']
//       });
  
//       if (!student) {
//         return res.status(404).json({ message: 'Student not found' });
//       }
  
//       // Extract and process fields
//       const { email, password, roleNames, permissionNames } = req.body;
  
//       if (email) student.email = email;
//       if (password) student.password = password;
  
//       if (roleNames) {
//         const roles = await Promise.all(
//           roleNames.split(',').map(async (roleName: string) => {
//             const role = await roleRepository.findOne({ where: { name: roleName.trim() } });
//             if (role) return role;
//             return roleRepository.save({ name: roleName.trim() });
//           })
//         );
  
//         student.roles = roles;
//       }
  
//       if (permissionNames) {
//         const permissions = await Promise.all(
//           permissionNames.split(',').map(async (permissionName: string) => {
//             const permission = await permissionRepository.findOne({ where: { name: permissionName.trim() } });
//             if (permission) return permission;
//             return permissionRepository.save({ name: permissionName.trim() });
//           })
//         );
  
//         student.roles = student.roles.map(role => ({
//           ...role,
//           permissions: [...role.permissions, ...permissions]
//         }));
//       }
  
//       await studentRepository.save(student);
  
//       res.json(student);
//     } catch (error) {
//       console.error('Error updating student:', error);
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   },
  

//   delete: async (req: Request, res: Response) => {
//     try {
//       const studentRepository = AppDataSource.getRepository(Student);
//       const student = await studentRepository.findOne({ where: { id: parseInt(req.params.id) } });
//       if (!student) {
//         return res.status(404).json({ message: 'Student not found' });
//       }
//       await studentRepository.remove(student);
//       res.json({ message: 'Student deleted' });
//     } catch (error) {
//       console.error('Error deleting student:', error);
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   },
// };
import { Request, Response } from 'express';
import { AppDataSource } from '../db/data_source';
import { Student } from '../entities/Student';
import { Role } from '../entities/Role';
import { Permission } from '../entities/Permission';

export const studentController = {

  create: async (req: Request, res: Response) => {
    try {
      // Ensure request body is defined
      if (!req.body) {
        return res.status(400).json({ message: 'Request body is missing' });
      }

      // Destructure required fields from request body
      const { email, password, roleNames, permissionNames } = req.body;

      // Check if essential fields are provided
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }

      const studentRepository = AppDataSource.getRepository(Student);
      const roleRepository = AppDataSource.getRepository(Role);
      const permissionRepository = AppDataSource.getRepository(Permission);

      // Fetch or create roles
      const roles = [];
      if (roleNames) {
        for (const roleName of roleNames) {
          let role = await roleRepository.findOne({
            where: { name: roleName },
            relations: ['permissions'],
          });
          if (!role) {
            role = roleRepository.create({ name: roleName, permissions: [] });
            await roleRepository.save(role);
          }

          // Fetch or create permissions for the role
          if (permissionNames) {
            for (const permName of permissionNames) {
              let permission = await permissionRepository.findOne({ where: { name: permName } });
              if (!permission) {
                permission = permissionRepository.create({ name: permName });
                await permissionRepository.save(permission);
              }

              // Add permission to the role if not already present
              if (!role.permissions.some(p => p.id === permission.id)) {
                role.permissions.push(permission);
              }
            }
            await roleRepository.save(role);
          }

          roles.push(role);
        }
      }

      // Create and save the student
      const student = studentRepository.create({
        email,
        password, // Ideally, password should be hashed before saving
        roles,
      });

      await studentRepository.save(student);
      res.status(201).json(student);
    } catch (error) {
      console.error('Error creating student:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  getAll: async (req: Request, res: Response) => {
    try {
      // Get the student repository
      const studentRepository = AppDataSource.getRepository(Student);

      // Fetch students with related roles and permissions
      const students = await studentRepository.find({
        relations: ['roles', 'roles.permissions']
      });

      // Transform the students data
      const transformedStudents = students.map(student => ({
        id: student.id, // Include student ID
        email: student.email,
        password: student.password,
        roleNames: student.roles.map(role => role.name),
        permissionNames: student.roles.flatMap(role => role.permissions.map(permission => permission.name))
      }));

      // Send the transformed data as response
      res.json(transformedStudents);
    } catch (error) {
      console.error('Error fetching students:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  getOne: async (req: Request, res: Response) => {
    try {
      const studentRepository = AppDataSource.getRepository(Student);

      // Fetch student with related roles and permissions
      const student = await studentRepository.findOne({
        where: { id: parseInt(req.params.id) },
        relations: ['roles', 'roles.permissions'] // Include related roles and permissions
      });

      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }

      // Transform the student data
      const transformedStudent = {
        id: student.id,
        email: student.email,
        password: student.password,
        roleNames: student.roles.map(role => role.name), // Map role entities to role names
        permissionNames: student.roles.flatMap(role => role.permissions.map(permission => permission.name)) // Flatten permissions from roles
      };

      res.json(transformedStudent);
    } catch (error) {
      console.error('Error fetching student:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  
  

  
  update : async (req: Request, res: Response) => {
    try {
      const studentRepository = AppDataSource.getRepository(Student);
      const roleRepository = AppDataSource.getRepository(Role);
      const permissionRepository = AppDataSource.getRepository(Permission);
  
      const studentId = parseInt(req.params.id);
      if (isNaN(studentId)) {
        return res.status(400).json({ message: 'Invalid student ID' });
      }
  
      let student = await studentRepository.findOne({
        where: { id: studentId },
        relations: ['roles', 'roles.permissions']
      });
  
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }
  
      const { email, password, roleNames, permissionNames } = req.body;
  
      if (email) student.email = email;
      if (password) student.password = password;
  
      if (roleNames) {
        const roles = await Promise.all(
          roleNames.map(async (roleName: string) => {
            let role = await roleRepository.findOne({ where: { name: roleName.trim() }, relations: ['permissions'] });
            if (!role) {
              role = roleRepository.create({ name: roleName.trim() });
              await roleRepository.save(role);
            }
            return role;
          })
        );
  
        student.roles = roles;
      }
  
      if (permissionNames) {
        const permissions = await Promise.all(
          permissionNames.map(async (permissionName: string) => {
            let permission = await permissionRepository.findOne({ where: { name: permissionName.trim() } });
            if (!permission) {
              permission = permissionRepository.create({ name: permissionName.trim() });
              await permissionRepository.save(permission);
            }
            return permission;
          })
        );
  
        // Ensure each role's permissions are initialized and update them
        student.roles.forEach(role => {
          role.permissions = role.permissions || [];
          role.permissions = [...new Set([...role.permissions, ...permissions])];
        });
      }
  
      await studentRepository.save(student);
      res.json(student);
    } catch (error) {
      console.error('Error updating student:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },  

  delete: async (req: Request, res: Response) => {
    try {
      const studentRepository = AppDataSource.getRepository(Student);
      const studentId = parseInt(req.params.id);
  
      const student = await studentRepository.findOne({
        where: { id: studentId },
        relations: ['roles'], // Ensure relationships are loaded
      });
  
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }
  
      // Remove the student, which should cascade delete roles if set up properly
      await studentRepository.remove(student);
  
      res.json({ message: 'Student deleted' });
    } catch (error) {
      console.error('Error deleting student:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
};