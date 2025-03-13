import API_CONFIG from '../../config/api.config';

export const generateQuestionsWithGemini = async (content, settings) => {
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${API_CONFIG.gemini.model}:generateContent?key=${API_CONFIG.gemini.apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Generate ${settings.questionCount} ${settings.questionType} questions based on this content: ${content}`
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          {
            category: 'HARM_CATEGORY_HARASSMENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_HATE_SPEECH',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error('Gemini API request failed');
    }

    const data = await response.json();
    return parseGeminiResponse(data);
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw error;
  }
};

const parseGeminiResponse = (data) => {
  const content = data.candidates[0].content.parts[0].text;
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