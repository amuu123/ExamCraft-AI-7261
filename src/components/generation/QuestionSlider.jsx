import { useState } from 'react';
import { motion } from 'framer-motion';

const QuestionSlider = ({ value, onChange }) => {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">1</span>
        <span className="text-sm font-medium text-primary-600">
          {value} questions
        </span>
        <span className="text-sm text-gray-500">25</span>
      </div>
      <div className="relative">
        <input
          type="range"
          min="1"
          max="25"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #0ea5e9 0%, #0ea5e9 ${
              (value / 25) * 100
            }%, #e5e7eb ${(value / 25) * 100}%, #e5e7eb 100%)`,
          }}
        />
        <motion.div
          className="absolute top-0 -mt-2"
          style={{
            left: `calc(${(value / 25) * 100}% - 12px)`,
          }}
          animate={{
            scale: isDragging ? 1.2 : 1,
          }}
        >
          <div className="w-6 h-6 bg-white rounded-full shadow-md border-2 border-primary-500" />
        </motion.div>
      </div>
    </div>
  );
};

export default QuestionSlider;