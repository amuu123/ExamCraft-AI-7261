import { motion } from 'framer-motion';
import { FiCheckCircle, FiXCircle, FiFlag } from 'react-icons/fi';

const ResultsScreen = ({ examData, answers, correctAnswers }) => {
  const calculateScore = () => {
    let correct = 0;
    Object.keys(answers).forEach(idx => {
      if (answers[idx] === correctAnswers[idx]) correct++;
    });
    return (correct / Object.keys(correctAnswers).length) * 100;
  };

  const score = calculateScore();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto p-6"
    >
      <div className="bg-white rounded-lg shadow-sm p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Exam Results</h1>
        
        {/* Score Overview */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-primary-50 rounded-lg p-6 text-center">
            <div className="text-4xl font-bold text-primary-600 mb-2">
              {score.toFixed(1)}%
            </div>
            <div className="text-sm text-gray-600">Overall Score</div>
          </div>
          <div className="bg-green-50 rounded-lg p-6 text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">
              {Object.keys(answers).length}
            </div>
            <div className="text-sm text-gray-600">Questions Answered</div>
          </div>
          <div className="bg-yellow-50 rounded-lg p-6 text-center">
            <div className="text-4xl font-bold text-yellow-600 mb-2">
              {examData.timeSpent ? Math.floor(examData.timeSpent / 60) : '--'}
            </div>
            <div className="text-sm text-gray-600">Minutes Taken</div>
          </div>
        </div>

        {/* Question Review */}
        <div className="space-y-6">
          {examData.questions.map((question, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-6 rounded-lg border ${
                answers[idx] === correctAnswers[idx]
                  ? 'border-green-200 bg-green-50'
                  : 'border-red-200 bg-red-50'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Question {idx + 1}
                </h3>
                {answers[idx] === correctAnswers[idx] ? (
                  <FiCheckCircle className="h-6 w-6 text-green-500" />
                ) : (
                  <FiXCircle className="h-6 w-6 text-red-500" />
                )}
              </div>
              
              <p className="text-gray-800 mb-4">{question.question}</p>
              
              {question.type === 'multiple-choice' && (
                <div className="space-y-2">
                  {question.options.map((option, optIdx) => (
                    <div
                      key={optIdx}
                      className={`p-3 rounded-lg ${
                        optIdx === correctAnswers[idx]
                          ? 'bg-green-100 text-green-700'
                          : optIdx === answers[idx]
                          ? 'bg-red-100 text-red-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}

              {question.explanation && (
                <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
                  <div className="font-medium text-gray-700 mb-2">Explanation:</div>
                  <p className="text-gray-600">{question.explanation}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 mt-8">
          <button
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50"
            onClick={() => window.print()}
          >
            Print Results
          </button>
          <button
            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            onClick={() => window.location.reload()}
          >
            Retake Exam
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ResultsScreen;