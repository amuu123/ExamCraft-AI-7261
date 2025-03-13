import { useState } from 'react';
import { motion } from 'framer-motion';
import ExamInterface from '../components/exam/ExamInterface';
import ResultsScreen from '../components/exam/ResultsScreen';

const ExamPage = () => {
  const [examState, setExamState] = useState('active'); // 'active' or 'completed'
  const [examResults, setExamResults] = useState(null);

  // Mock exam data - replace with actual data from your backend
  const examData = {
    title: 'Sample Exam',
    questions: [
      {
        type: 'multiple-choice',
        question: 'What is the capital of France?',
        options: ['London', 'Berlin', 'Paris', 'Madrid'],
        correctAnswer: 2,
        explanation: 'Paris is the capital and largest city of France.'
      },
      // Add more questions...
    ]
  };

  const handleExamComplete = (results) => {
    setExamResults(results);
    setExamState('completed');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {examState === 'active' ? (
        <ExamInterface
          questions={examData.questions}
          onComplete={handleExamComplete}
        />
      ) : (
        <ResultsScreen
          examData={examData}
          answers={examResults.answers}
          correctAnswers={examData.questions.map(q => q.correctAnswer)}
        />
      )}
    </div>
  );
};

export default ExamPage;</QustAction>

<QuestAction type="file" filePath="src/App.jsx">
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Upload from './pages/Upload';
import History from './pages/History';
import Profile from './pages/Profile';
import ExamPage from './pages/ExamPage';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="upload" element={<Upload />} />
          <Route path="history" element={<History />} />
          <Route path="profile" element={<Profile />} />
          <Route path="exam/:id" element={<ExamPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;