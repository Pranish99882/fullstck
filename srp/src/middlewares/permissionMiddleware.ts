// import { Request, Response, NextFunction } from 'express';

// export const permissionMiddleware = (requiredPermissions: string[]) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     if (!req.user) {
//       return res.status(403).json({ message: 'Forbidden' });
//     }

//     const userPermissions = req.user.roles.flatMap(role =>
//       role.permissions.map(perm => perm.name)
//     );

//     const hasPermission = requiredPermissions.every(permission =>
//       userPermissions.includes(permission)
//     );

//     if (!hasPermission) {
//       return res.status(403).json({ message: 'Forbidden' });
//     }

//     next();
//   };
// };
import { Request, Response, NextFunction } from 'express';

interface UserPermission {
  name: string;
}

interface UserRole {
  permissions: UserPermission[];
}

export const permissionMiddleware = (requiredPermissions: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log(req.user);
    if (!req.user) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const userRoles: UserRole[] = req.user.roles;
    const userPermissions: string[] = userRoles.flatMap(role =>
      role.permissions.map(perm => perm.name)
    );

    

    const hasPermission = requiredPermissions.every(permission =>
      userPermissions.includes(permission)
    );

    if (!hasPermission) {
      return res.status(403).json({ message: 'Forbidden not permitted' });
    }

    next();
  };
};

