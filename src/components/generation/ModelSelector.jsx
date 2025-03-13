import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { FiCheck, FiChevronDown } from 'react-icons/fi';

const models = [
  { id: 'gpt-4', name: 'GPT-4', description: 'Most capable model, best for complex tasks' },
  { id: 'gemini-pro', name: 'Gemini Pro', description: 'Google\'s advanced AI model' },
  { id: 'claude-2', name: 'Claude 2', description: 'Balanced performance and efficiency' },
  { id: 'gpt-3.5', name: 'GPT-3.5', description: 'Fast and cost-effective' },
];

const ModelSelector = ({ value, onChange }) => {
  const selectedModel = models.find(model => model.id === value) || models[0];

  return (
    <Listbox value={value} onChange={onChange}>
      <div className="relative">
        <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500">
          <span className="block truncate">{selectedModel.name}</span>
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
            {models.map((model) => (
              <Listbox.Option
                key={model.id}
                value={model.id}
                className={({ active }) =>
                  `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                    active ? 'bg-primary-50 text-primary-900' : 'text-gray-900'
                  }`
                }
              >
                {({ selected }) => (
                  <>
                    <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                      {model.name}
                    </span>
                    <span className="block text-sm text-gray-500">{model.description}</span>
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

export default ModelSelector;