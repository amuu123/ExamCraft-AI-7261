import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSettings, FiInfo } from 'react-icons/fi';
import QuestionSlider from './QuestionSlider';
import ModelSelector from './ModelSelector';
import QuestionTypeSelector from './QuestionTypeSelector';
import SettingsModal from './SettingsModal';
import Tooltip from '../common/Tooltip';

const GenerationPanel = ({ onGenerate, disabled }) => {
  const [settings, setSettings] = useState({
    questionCount: 10,
    model: 'gpt-4',
    questionType: 'mixed',
  });
  const [showSettings, setShowSettings] = useState(false);

  const handleSettingsChange = (newSettings) => {
    setSettings(newSettings);
  };

  const handleGenerate = () => {
    onGenerate(settings);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm p-6 space-y-6"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">
          Generation Settings
        </h2>
        <button
          onClick={() => setShowSettings(true)}
          className="p-2 text-gray-500 hover:text-primary-600 rounded-full hover:bg-gray-100"
        >
          <FiSettings className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">
              Number of Questions
            </label>
            <Tooltip content="Select how many questions to generate">
              <FiInfo className="h-4 w-4 text-gray-400" />
            </Tooltip>
          </div>
          <QuestionSlider
            value={settings.questionCount}
            onChange={(value) =>
              handleSettingsChange({ ...settings, questionCount: value })
            }
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">
              AI Model
            </label>
            <Tooltip content="Choose which AI model to use for generation">
              <FiInfo className="h-4 w-4 text-gray-400" />
            </Tooltip>
          </div>
          <ModelSelector
            value={settings.model}
            onChange={(value) =>
              handleSettingsChange({ ...settings, model: value })
            }
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">
              Question Type
            </label>
            <Tooltip content="Select the type of questions to generate">
              <FiInfo className="h-4 w-4 text-gray-400" />
            </Tooltip>
          </div>
          <QuestionTypeSelector
            value={settings.questionType}
            onChange={(value) =>
              handleSettingsChange({ ...settings, questionType: value })
            }
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={disabled}
          className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-colors ${
            disabled
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-primary-600 hover:bg-primary-700'
          }`}
        >
          Generate Questions
        </button>
      </div>

      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        settings={settings}
        onSave={handleSettingsChange}
      />
    </motion.div>
  );
};

export default GenerationPanel;