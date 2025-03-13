import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Upload from './pages/Upload';
import History from './pages/History';
import Profile from './pages/Profile';
import UserManagement from './pages/UserManagement';
import { AuthProvider, PERMISSIONS } from './contexts/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route
            path="upload"
            element={
              <ProtectedRoute requiredPermission={PERMISSIONS.CREATE_EXAM}>
                <Upload />
              </ProtectedRoute>
            }
          />
          <Route path="history" element={<History />} />
          <Route path="profile" element={<Profile />} />
          <Route
            path="users"
            element={
              <ProtectedRoute requiredPermission={PERMISSIONS.MANAGE_USERS}>
                <UserManagement />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;