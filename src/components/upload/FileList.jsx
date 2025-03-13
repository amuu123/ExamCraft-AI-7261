import { motion, AnimatePresence } from 'framer-motion';
import { FiFile, FiX } from 'react-icons/fi';

const FileList = ({ files, onRemove }) => {
  if (files.length === 0) return null;

  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium text-gray-900 mb-3">Selected Files</h3>
      <div className="space-y-2">
        <AnimatePresence>
          {files.map((file, index) => (
            <motion.div
              key={`${file.name}-${index}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex items-center justify-between bg-gray-50 p-3 rounded"
            >
              <div className="flex items-center">
                <FiFile className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-gray-600">{file.name}</span>
              </div>
              <button
                onClick={() => onRemove(index)}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <FiX className="h-5 w-5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FileList;