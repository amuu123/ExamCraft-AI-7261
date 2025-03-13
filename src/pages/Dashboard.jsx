import { motion } from 'framer-motion';
import { FiUpload, FiClock, FiActivity, FiPlay } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow rounded-lg p-6"
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Welcome to ExamCraft AI
        </h1>
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

      {/* Sample Exam Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow rounded-lg p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Try a Sample Exam</h2>
          <Link
            to="/exam/sample"
            className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            <FiPlay className="mr-2" />
            Start Demo
          </Link>
        </div>
        <p className="text-gray-600">
          Experience our exam interface with a sample test before creating your own.
        </p>
      </motion.div>
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
    <Link to={link} className="text-primary-600 hover:text-primary-700 font-medium">
      Get Started →
    </Link>
  </motion.div>
);

export default Dashboard;