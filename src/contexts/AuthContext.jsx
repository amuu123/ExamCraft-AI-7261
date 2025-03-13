import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const ROLES = {
  ADMIN: 'admin',
  TEACHER: 'teacher',
  STUDENT: 'student'
};

export const PERMISSIONS = {
  CREATE_EXAM: 'create_exam',
  EDIT_EXAM: 'edit_exam',
  DELETE_EXAM: 'delete_exam',
  VIEW_ANALYTICS: 'view_analytics',
  MANAGE_USERS: 'manage_users',
};

const ROLE_PERMISSIONS = {
  [ROLES.ADMIN]: [
    PERMISSIONS.CREATE_EXAM,
    PERMISSIONS.EDIT_EXAM,
    PERMISSIONS.DELETE_EXAM,
    PERMISSIONS.VIEW_ANALYTICS,
    PERMISSIONS.MANAGE_USERS,
  ],
  [ROLES.TEACHER]: [
    PERMISSIONS.CREATE_EXAM,
    PERMISSIONS.EDIT_EXAM,
    PERMISSIONS.DELETE_EXAM,
    PERMISSIONS.VIEW_ANALYTICS,
  ],
  [ROLES.STUDENT]: [],
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    // Mock login - replace with actual API call
    const mockUser = {
      id: '1',
      email,
      role: ROLES.TEACHER,
      name: 'John Doe'
    };
    setUser(mockUser);
  };

  const register = async (email, password, role = ROLES.STUDENT) => {
    // Mock registration - replace with actual API call
    const mockUser = {
      id: '1',
      email,
      role,
      name: 'John Doe'
    };
    setUser(mockUser);
  };

  const logout = async () => {
    setUser(null);
  };

  const hasPermission = (permission) => {
    if (!user || !user.role) return false;
    return ROLE_PERMISSIONS[user.role]?.includes(permission) || false;
  };

  const value = {
    user,
    login,
    register,
    logout,
    hasPermission,
    ROLES,
    PERMISSIONS,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};