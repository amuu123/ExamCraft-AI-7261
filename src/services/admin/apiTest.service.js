import { getApiKey } from './apiKeys.service';

export const testApiConnection = async (service) => {
  try {
    const apiKey = await getApiKey(service);
    if (!apiKey) {
      throw new Error('API key not found');
    }

    let endpoint;
    let headers = {
      'Content-Type': 'application/json',
    };

    switch (service) {
      case 'openai':
        endpoint = 'https://api.openai.com/v1/models';
        headers['Authorization'] = `Bearer ${apiKey}`;
        break;
      case 'gemini':
        endpoint = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
        break;
      case 'claude':
        endpoint = 'https://api.anthropic.com/v1/models';
        headers['x-api-key'] = apiKey;
        break;
      default:
        throw new Error('Unsupported service');
    }

    const response = await fetch(endpoint, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      throw new Error(`API test failed: ${response.statusText}`);
    }

    return { success: true };
  } catch (error) {
    console.error(`API test failed for ${service}:`, error);
    return { success: false, error: error.message };
  }
};