// This is a simplified encryption implementation
// In a production environment, use a proper encryption library and secure key management
const ENCRYPTION_KEY = 'your-secure-encryption-key';

export const encrypt = (text) => {
  // Implement proper encryption
  return btoa(text);
};

export const decrypt = (encryptedText) => {
  // Implement proper decryption
  return atob(encryptedText);
};