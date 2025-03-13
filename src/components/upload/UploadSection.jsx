import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUpload, FiFile, FiX, FiType } from 'react-icons/fi';
import FileList from './FileList';
import TextInput from './TextInput';

const UploadSection = ({ onFilesChange, onTextChange }) => {
  const [files, setFiles] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [uploadType, setUploadType] = useState('file'); // 'file' or 'text'
  const [text, setText] = useState('');

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragIn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    
    const newFiles = [...e.dataTransfer.files];
    const updatedFiles = [...files, ...newFiles];
    setFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  const handleFileInput = (e) => {
    const newFiles = [...e.target.files];
    const updatedFiles = [...files, ...newFiles];
    setFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  const removeFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  const handleTextChange = (value) => {
    setText(value);
    onTextChange(value);
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setUploadType('file')}
          className={`flex items-center px-4 py-2 rounded-lg ${
            uploadType === 'file'
              ? 'bg-primary-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <FiFile className="mr-2" />
          Upload Files
        </button>
        <button
          onClick={() => setUploadType('text')}
          className={`flex items-center px-4 py-2 rounded-lg ${
            uploadType === 'text'
              ? 'bg-primary-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <FiType className="mr-2" />
          Enter Text
        </button>
      </div>

      <AnimatePresence mode="wait">
        {uploadType === 'file' ? (
          <motion.div
            key="file-upload"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragging ? 'border-primary-500 bg-primary-50' : 'border-gray-300'
              }`}
              onDragEnter={handleDragIn}
              onDragLeave={handleDragOut}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center">
                <FiUpload className="h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-600 mb-2">
                  Drag and drop your files here, or
                </p>
                <label className="cursor-pointer text-primary-600 hover:text-primary-700 font-medium">
                  browse files
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleFileInput}
                    accept=".pdf,.doc,.docx,.ppt,.pptx,.txt"
                  />
                </label>
                <p className="text-sm text-gray-500 mt-2">
                  Supported formats: PDF, DOC, DOCX, PPT, PPTX, TXT
                </p>
              </div>
            </div>
            <FileList files={files} onRemove={removeFile} />
          </motion.div>
        ) : (
          <motion.div
            key="text-input"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <TextInput value={text} onChange={handleTextChange} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UploadSection;