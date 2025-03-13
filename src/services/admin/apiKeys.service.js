import { encrypt, decrypt } from '../../utils/encryption';

const API_KEYS_STORAGE_KEY = 'secure_api_keys';

export const getApiKey = async (service) => {
  try {
    const encryptedKeys = localStorage.getItem(API_KEYS_STORAGE_KEY);
    if (!encryptedKeys) return null;

    const keys = JSON.parse(decrypt(encryptedKeys));
    return keys[service] || null;
  } catch (error) {
    console.error('Failed to get API key:', error);
    throw error;
  }
};

export const updateApiKey = async (service, apiKey) => {
  try {
    let keys = {};
    const existingKeys = localStorage.getItem(API_KEYS_STORAGE_KEY);
    
    if (existingKeys) {
      keys = JSON.parse(decrypt(existingKeys));
    }

    keys[service] = apiKey;
    const encryptedKeys = encrypt(JSON.stringify(keys));
    localStorage.setItem(API_KEYS_STORAGE_KEY, encryptedKeys);

    // In a real application, you would make an API call to update the key on the server
    return true;
  } catch (error) {
    console.error('Failed to update API key:', error);
    throw error;
  }
};