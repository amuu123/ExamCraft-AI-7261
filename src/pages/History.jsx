import { motion } from 'framer-motion';
import { FiDownload, FiShare2, FiStar, FiTrash2 } from 'react-icons/fi';

const History = () => {
  // Mock data - replace with actual data from your backend
  const questionSets = [
    {
      id: 1,
      title: 'Biology Chapter 5 Questions',
      date: '2024-03-15',
      questionCount: 25,
      favorite: true,
    },
    {
      id: 2,
      title: 'Chemistry Final Exam',
      date: '2024-03-14',
      questionCount: 50,
      favorite: false,
    },
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow rounded-lg p-6"
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Question History</h1>
        
        <div className="space-y-4">
          {questionSets.map((set) => (
            <motion.div
              key={set.id}
              whileHover={{ scale: 1.01 }}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{set.title}</h3>
                  <p className="text-sm text-gray-500">
                    Generated on {set.date} • {set.questionCount} questions
                  </p>
                </div>
                <div className="flex space-x-2">
                  <ActionButton
                    icon={<FiDownload />}
                    onClick={() => {}}
                    tooltip="Download"
                  />
                  <ActionButton
                    icon={<FiShare2 />}
                    onClick={() => {}}
                    tooltip="Share"
                  />
                  <ActionButton
                    icon={<FiStar />}
                    onClick={() => {}}
                    tooltip="Favorite"
                    active={set.favorite}
                  />
                  <ActionButton
                    icon={<FiTrash2 />}
                    onClick={() => {}}
                    tooltip="Delete"
                    danger
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

const ActionButton = ({ icon, onClick, tooltip, active, danger }) => (
  <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    className={`p-2 rounded-full hover:bg-gray-100 ${
      active ? 'text-yellow-500' : danger ? 'text-red-500' : 'text-gray-500'
    }`}
    onClick={onClick}
    title={tooltip}
  >
    {icon}
  </motion.button>
);

export default History;