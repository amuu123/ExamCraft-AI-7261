import { useState } from 'react';
import { motion } from 'framer-motion';
import ExamInterface from '../components/exam/ExamInterface';
import ResultsScreen from '../components/exam/ResultsScreen';
import { useParams } from 'react-router-dom';
import { sampleExam } from '../data/sampleExam';

const ExamPage = ({ examData = null }) => {
  const [examState, setExamState] = useState('active'); // 'active' or 'completed'
  const [examResults, setExamResults] = useState(null);
  const { id } = useParams();

  // Use provided examData or sampleExam for demo
  const currentExam = examData || (id === 'sample' ? sampleExam : null);

  const handleExamComplete = (results) => {
    setExamResults(results);
    setExamState('completed');
  };

  if (!currentExam) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Exam Not Found</h2>
          <p className="text-gray-600">The requested exam could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {examState === 'active' ? (
        <ExamInterface 
          questions={currentExam.questions}
          onComplete={handleExamComplete}
          timeLimit={currentExam.timeLimit}
        />
      ) : (
        <ResultsScreen
          examData={currentExam}
          answers={examResults.answers}
          correctAnswers={currentExam.questions.map(q => q.correctAnswer)}
        />
      )}
    </div>
  );
};

export default ExamPage;