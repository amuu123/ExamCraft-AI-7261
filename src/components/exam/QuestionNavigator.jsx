import { motion } from 'framer-motion';
import { FiFlag, FiCheck } from 'react-icons/fi';

const QuestionNavigator = ({ questions, currentIndex, answers, flagged, onSelect }) => {
  return (
    <div className="p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Question Navigator</h3>
      <div className="grid grid-cols-5 gap-2">
        {questions.map((_, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(idx)}
            className={`relative p-4 rounded-lg text-center ${
              idx === currentIndex
                ? 'bg-primary-500 text-white'
                : answers[idx]
                ? 'bg-primary-100 text-primary-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {idx + 1}
            {flagged.has(idx) && (
              <FiFlag className="absolute top-0 right-0 h-3 w-3 text-yellow-500" />
            )}
            {answers[idx] && (
              <FiCheck className="absolute bottom-0 right-0 h-3 w-3 text-green-500" />
            )}
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-2">
        <div className="flex items-center text-sm text-gray-600">
          <div className="w-4 h-4 bg-primary-100 rounded mr-2" />
          <span>Answered</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <div className="w-4 h-4 bg-gray-100 rounded mr-2" />
          <span>Unanswered</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <FiFlag className="w-4 h-4 text-yellow-500 mr-2" />
          <span>Flagged for Review</span>
        </div>
      </div>
    </div>
  );
};

export default QuestionNavigator;