import { Outlet, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome, FiUpload, FiClock, FiUser, FiUsers, FiLogOut } from 'react-icons/fi';
import { useAuth, PERMISSIONS } from '../contexts/AuthContext';

const Layout = () => {
  const { logout, hasPermission } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex items-center">
                <span className="text-xl font-bold text-primary-600">ExamCraft AI</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <NavLink to="/" icon={<FiHome />} text="Dashboard" />
              {hasPermission(PERMISSIONS.CREATE_EXAM) && (
                <NavLink to="/upload" icon={<FiUpload />} text="Upload" />
              )}
              <NavLink to="/history" icon={<FiClock />} text="History" />
              {hasPermission(PERMISSIONS.MANAGE_USERS) && (
                <NavLink to="/users" icon={<FiUsers />} text="Users" />
              )}
              <NavLink to="/profile" icon={<FiUser />} text="Profile" />
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-600 hover:text-primary-600"
              >
                <FiLogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
};

const NavLink = ({ to, icon, text }) => (
  <Link to={to} className="flex items-center text-gray-600 hover:text-primary-600 px-3 py-2">
    <motion.div whileHover={{ scale: 1.1 }} className="flex items-center space-x-2">
      {icon}
      <span>{text}</span>
    </motion.div>
  </Link>
);

export default Layout;