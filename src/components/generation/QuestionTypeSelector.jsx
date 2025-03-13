import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { FiCheck, FiChevronDown } from 'react-icons/fi';

const questionTypes = [
  { id: 'mixed', name: 'Mixed Format', description: 'Combination of different question types' },
  { id: 'multiple-choice', name: 'Multiple Choice', description: 'Questions with multiple options' },
  { id: 'short-answer', name: 'Short Answer', description: 'Brief written responses' },
  { id: 'true-false', name: 'True/False', description: 'Binary choice questions' },
  { id: 'fill-blank', name: 'Fill in the Blank', description: 'Complete the missing words' },
];

const QuestionTypeSelector = ({ value, onChange }) => {
  const selectedType = questionTypes.find(type => type.id === value) || questionTypes[0];

  return (
    <Listbox value={value} onChange={onChange}>
      <div className="relative">
        <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500">
          <span className="block truncate">{selectedType.name}</span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2">
            <FiChevronDown className="h-5 w-5 text-gray-400" />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none">
            {questionTypes.map((type) => (
              <Listbox.Option
                key={type.id}
                value={type.id}
                className={({ active }) =>
                  `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                    active ? 'bg-primary-50 text-primary-900' : 'text-gray-900'
                  }`
                }
              >
                {({ selected }) => (
                  <>
                    <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                      {type.name}
                    </span>
                    <span className="block text-sm text-gray-500">{type.description}</span>
                    {selected && (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary-600">
                        <FiCheck className="h-5 w-5" />
                      </span>
                    )}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default QuestionTypeSelector;