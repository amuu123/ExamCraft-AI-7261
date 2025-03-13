import API_CONFIG from '../../config/api.config';

export const generateQuestionsWithOpenAI = async (content, settings) => {
  try {
    const response = await fetch(`${API_CONFIG.openai.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_CONFIG.openai.apiKey}`
      },
      body: JSON.stringify({
        model: API_CONFIG.openai.model,
        messages: [
          {
            role: 'system',
            content: `You are an expert educator tasked with generating ${settings.questionType} questions based on educational content. Generate ${settings.questionCount} questions with explanations.`
          },
          {
            role: 'user',
            content: content
          }
        ],
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error('OpenAI API request failed');
    }

    const data = await response.json();
    return parseOpenAIResponse(data);
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw error;
  }
};

const parseOpenAIResponse = (data) => {
  const content = data.choices[0].message.content;
  // Parse the AI response into a structured format
  // This is a simplified example - enhance based on your needs
  return {
    questions: content.split('\n\n').map((q, index) => ({
      id: index + 1,
      question: q,
      type: 'multiple-choice',
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      correctAnswer: 0,
      explanation: 'Explanation for the correct answer'
    }))
  };
};