import { motion } from 'framer-motion';

const TextInput = ({ value, onChange }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-2"
    >
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter your educational content here..."
        className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
      />
      <p className="text-sm text-gray-500">
        Paste or type your content directly. The AI will analyze the text and generate questions accordingly.
      </p>
    </motion.div>
  );
};

export default TextInput;