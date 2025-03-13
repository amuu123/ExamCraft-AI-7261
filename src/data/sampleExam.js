export const sampleExam = {
  id: 'sample',
  title: 'Sample Science Quiz',
  description: 'Try out our exam interface with this sample science quiz.',
  timeLimit: 600, // 10 minutes
  questions: [
    {
      id: 1,
      type: 'multiple-choice',
      question: 'What is the closest planet to the Sun?',
      options: ['Venus', 'Mercury', 'Mars', 'Earth'],
      correctAnswer: 1,
      explanation: 'Mercury is the closest planet to the Sun, orbiting at an average distance of about 57.9 million kilometers.'
    },
    {
      id: 2,
      type: 'multiple-choice',
      question: 'Which of the following is not a state of matter?',
      options: ['Solid', 'Energy', 'Liquid', 'Gas'],
      correctAnswer: 1,
      explanation: 'Energy is not a state of matter. The main states of matter are solid, liquid, gas, and plasma.'
    },
    {
      id: 3,
      type: 'multiple-choice',
      question: 'What is the chemical symbol for gold?',
      options: ['Ag', 'Au', 'Fe', 'Cu'],
      correctAnswer: 1,
      explanation: 'Au (from the Latin "aurum") is the chemical symbol for gold.'
    },
    {
      id: 4,
      type: 'multiple-choice',
      question: 'Which organ in the human body produces insulin?',
      options: ['Liver', 'Pancreas', 'Kidney', 'Stomach'],
      correctAnswer: 1,
      explanation: 'The pancreas produces insulin, a hormone that regulates blood sugar levels.'
    },
    {
      id: 5,
      type: 'multiple-choice',
      question: 'What is the speed of light in vacuum?',
      options: ['299,792 km/s', '199,792 km/s', '399,792 km/s', '499,792 km/s'],
      correctAnswer: 0,
      explanation: 'The speed of light in a vacuum is approximately 299,792 kilometers per second.'
    }
  ]
};