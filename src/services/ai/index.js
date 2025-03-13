import { generateQuestionsWithOpenAI } from './openai.service';
import { generateQuestionsWithGemini } from './gemini.service';

export const generateQuestions = async (content, settings) => {
  try {
    switch (settings.model) {
      case 'gpt-4':
      case 'gpt-3.5':
        return await generateQuestionsWithOpenAI(content, settings);
      case 'gemini-pro':
        return await generateQuestionsWithGemini(content, settings);
      default:
        throw new Error('Unsupported AI model');
    }
  } catch (error) {
    console.error('Question generation failed:', error);
    throw error;
  }
};