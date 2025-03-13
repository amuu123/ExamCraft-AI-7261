import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiClock, FiFlag, FiMenu } from 'react-icons/fi';
import QuestionNavigator from './QuestionNavigator';
import Timer from './Timer';
import ProgressBar from './ProgressBar';

const ExamInterface = ({ questions, onComplete, timeLimit }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [flagged, setFlagged] = useState(new Set());
  const [showNavigator, setShowNavigator] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Save progress to localStorage
    const saveProgress = () => {
      localStorage.setItem('examProgress', JSON.stringify({
        answers,
        flagged: Array.from(flagged),
        currentIndex
      }));
    };

    window.addEventListener('beforeunload', saveProgress);
    return () => window.removeEventListener('beforeunload', saveProgress);
  }, [answers, flagged, currentIndex]);

  const handleAnswer = (answer) => {
    setAnswers(prev => ({
      ...prev,
      [currentIndex]: answer
    }));
  };

  const handleFlag = () => {
    setFlagged(prev => {
      const next = new Set(prev);
      if (next.has(currentIndex)) {
        next.delete(currentIndex);
      } else {
        next.add(currentIndex);
      }
      return next;
    });
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    onComplete({
      answers,
      flagged: Array.from(flagged),
      timeSpent: timeLimit || null
    });
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`flex-1 p-6 ${showNavigator ? 'mr-80' : ''}`}
      >
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => setShowNavigator(!showNavigator)}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              <FiMenu className="h-6 w-6" />
            </button>
            <div className="flex items-center space-x-4">
              {timeLimit && (
                <Timer initialTime={timeLimit} onTimeUp={handleSubmit} />
              )}
              <button
                onClick={handleFlag}
                className={`p-2 rounded-lg flex items-center ${
                  flagged.has(currentIndex)
                    ? 'bg-yellow-100 text-yellow-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <FiFlag className="h-5 w-5 mr-2" />
                {flagged.has(currentIndex) ? 'Flagged' : 'Flag for Review'}
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <ProgressBar
            total={questions.length}
            completed={Object.keys(answers).length}
            flagged={flagged.size}
          />

          {/* Question */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-lg shadow-sm p-6 mt-6"
            >
              <div className="text-sm text-gray-500 mb-4">
                Question {currentIndex + 1} of {questions.length}
              </div>
              <h2 className="text-xl font-medium text-gray-900 mb-6">
                {questions[currentIndex].question}
              </h2>
              <div className="space-y-4">
                {questions[currentIndex].options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    className={`w-full p-4 text-left rounded-lg border transition-colors ${
                      answers[currentIndex] === idx
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-200'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-50"
            >
              Previous
            </button>
            {currentIndex === questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
              >
                Submit Exam
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Question Navigator */}
      <AnimatePresence>
        {showNavigator && (
          <motion.div
            initial={{ x: 300 }}
            animate={{ x: 0 }}
            exit={{ x: 300 }}
            className="fixed right-0 top-0 bottom-0 w-80 bg-white border-l border-gray-200 overflow-y-auto"
          >
            <QuestionNavigator
              questions={questions}
              currentIndex={currentIndex}
              answers={answers}
              flagged={flagged}
              onSelect={setCurrentIndex}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExamInterface;