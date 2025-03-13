import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import UploadSection from '../components/upload/UploadSection';
import GenerationPanel from '../components/generation/GenerationPanel';
import { generateQuestions } from '../services/ai';

const Upload = () => {
  const [files, setFiles] = useState([]);
  const [text, setText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();

  const handleGenerate = async (settings) => {
    setIsGenerating(true);
    try {
      // Get content from either files or text input
      const content = text || await getFileContent(files[0]);
      
      // Generate questions using the selected AI model
      const result = await generateQuestions(content, settings);
      
      // Store the generated questions in localStorage or your state management solution
      localStorage.setItem('generatedQuestions', JSON.stringify(result.questions));
      
      // Navigate to the exam page
      navigate('/exam/preview');
    } catch (error) {
      console.error('Generation failed:', error);
      // Handle error (show error message to user)
    } finally {
      setIsGenerating(false);
    }
  };

  const getFileContent = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = reject;
      reader.readAsText(file);
    });
  };

  const hasContent = files.length > 0 || text.trim().length > 0;

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        <div className="lg:col-span-2">
          <div className="bg-white shadow-sm rounded-lg p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              Upload Materials
            </h1>
            <UploadSection
              onFilesChange={setFiles}
              onTextChange={setText}
            />
          </div>
        </div>
        <div>
          <GenerationPanel
            onGenerate={handleGenerate}
            disabled={!hasContent || isGenerating}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Upload;