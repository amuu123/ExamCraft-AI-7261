import { motion } from 'framer-motion';
import { FiUpload, FiClock, FiActivity } from 'react-icons/fi';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow rounded-lg p-6"
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Welcome to ExamCraft AI</h1>
        <p className="text-gray-600">
          Upload your educational materials and let AI generate customized exam questions.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard
          icon={<FiUpload className="h-6 w-6" />}
          title="Quick Upload"
          description="Upload new materials for AI analysis"
          link="/upload"
        />
        <DashboardCard
          icon={<FiClock className="h-6 w-6" />}
          title="Recent History"
          description="View your recently generated questions"
          link="/history"
        />
        <DashboardCard
          icon={<FiActivity className="h-6 w-6" />}
          title="Analytics"
          description="Track your content and question metrics"
          link="/analytics"
        />
      </div>
    </div>
  );
};

const DashboardCard = ({ icon, title, description, link }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="bg-white shadow rounded-lg p-6"
  >
    <div className="text-primary-600 mb-4">{icon}</div>
    <h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>
    <p className="text-gray-600 mb-4">{description}</p>
    <button className="text-primary-600 hover:text-primary-700 font-medium">
      Get Started →
    </button>
  </motion.div>
);

export default Dashboard;