import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiActivity, FiClock, FiAlertCircle } from 'react-icons/fi';
import { Line } from 'react-chartjs-2';
import { getServiceMetrics } from '../../services/admin/metrics.service';

const ServiceHealth = () => {
  const [metrics, setMetrics] = useState({});
  const [timeRange, setTimeRange] = useState('24h');

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const data = await getServiceMetrics(timeRange);
        setMetrics(data);
      } catch (error) {
        console.error('Failed to fetch metrics:', error);
      }
    };
    fetchMetrics();
  }, [timeRange]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white shadow rounded-lg p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Service Health</h2>
        <div className="flex space-x-2">
          {['24h', '7d', '30d'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 rounded-md text-sm ${
                timeRange === range
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {Object.entries(metrics).map(([service, data]) => (
          <ServiceCard key={service} service={service} data={data} />
        ))}
      </div>

      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900">Response Times</h3>
        <div className="h-64">
          <ResponsiveChart metrics={metrics} />
        </div>
      </div>
    </motion.div>
  );
};

const ServiceCard = ({ service, data }) => (
  <div className="bg-gray-50 rounded-lg p-4">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-medium text-gray-900 capitalize">{service}</h3>
      <StatusBadge status={data.status} />
    </div>
    <div className="space-y-2">
      <Metric
        icon={<FiClock className="h-5 w-5" />}
        label="Avg Response Time"
        value={`${data.avgResponseTime}ms`}
      />
      <Metric
        icon={<FiActivity className="h-5 w-5" />}
        label="Uptime"
        value={`${data.uptime}%`}
      />
      <Metric
        icon={<FiAlertCircle className="h-5 w-5" />}
        label="Errors (24h)"
        value={data.errors}
      />
    </div>
  </div>
);

const StatusBadge = ({ status }) => (
  <span
    className={`px-2 py-1 rounded-full text-xs font-medium ${
      status === 'healthy'
        ? 'bg-green-100 text-green-800'
        : status === 'degraded'
        ? 'bg-yellow-100 text-yellow-800'
        : 'bg-red-100 text-red-800'
    }`}
  >
    {status}
  </span>
);

const Metric = ({ icon, label, value }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center text-gray-600">
      {icon}
      <span className="ml-2">{label}</span>
    </div>
    <span className="font-medium text-gray-900">{value}</span>
  </div>
);

const ResponsiveChart = ({ metrics }) => {
  // Chart configuration would go here
  return <div className="h-full">Chart placeholder</div>;
};

export default ServiceHealth;