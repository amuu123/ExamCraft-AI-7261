import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiKey, FiShield, FiActivity, FiRefreshCw } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';
import ApiKeyForm from '../../components/admin/ApiKeyForm';
import ServiceHealth from '../../components/admin/ServiceHealth';
import { testApiConnection } from '../../services/admin/apiTest.service';

const ApiConfiguration = () => {
  const { hasPermission } = useAuth();
  const [activeService, setActiveService] = useState(null);
  const [testResults, setTestResults] = useState({});

  const handleTestConnection = async (service) => {
    try {
      const result = await testApiConnection(service);
      setTestResults(prev => ({
        ...prev,
        [service]: { success: result.success, timestamp: new Date() }
      }));
    } catch (error) {
      setTestResults(prev => ({
        ...prev,
        [service]: { success: false, error: error.message, timestamp: new Date() }
      }));
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow rounded-lg p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">API Configuration</h1>
          <div className="flex items-center space-x-2">
            <FiShield className="h-5 w-5 text-primary-600" />
            <span className="text-sm text-gray-600">Admin Only</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Service Selection */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-lg font-medium text-gray-900">LLM Services</h2>
            <div className="space-y-2">
              {['openai', 'gemini', 'claude'].map((service) => (
                <button
                  key={service}
                  onClick={() => setActiveService(service)}
                  className={`w-full flex items-center justify-between p-4 rounded-lg border transition-colors ${
                    activeService === service
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-primary-200'
                  }`}
                >
                  <div className="flex items-center">
                    <FiKey className="h-5 w-5 mr-2" />
                    <span className="capitalize">{service}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <StatusIndicator status={testResults[service]?.success} />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTestConnection(service);
                      }}
                      className="p-1 hover:bg-gray-100 rounded-full"
                    >
                      <FiRefreshCw className="h-4 w-4" />
                    </button>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* API Key Configuration */}
          <div className="lg:col-span-2">
            {activeService ? (
              <ApiKeyForm service={activeService} onTest={handleTestConnection} />
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">
                Select a service to configure
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Service Health Dashboard */}
      <ServiceHealth />
    </div>
  );
};

const StatusIndicator = ({ status }) => (
  <div
    className={`h-3 w-3 rounded-full ${
      status === undefined
        ? 'bg-gray-300'
        : status
        ? 'bg-green-500'
        : 'bg-red-500'
    }`}
  />
);

export default ApiConfiguration;