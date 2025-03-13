// Mock service - replace with actual API calls
export const getServiceMetrics = async (timeRange) => {
  // In a real application, fetch this data from your backend
  return {
    openai: {
      status: 'healthy',
      avgResponseTime: 245,
      uptime: 99.9,
      errors: 2,
      history: generateMockHistory(timeRange),
    },
    gemini: {
      status: 'healthy',
      avgResponseTime: 180,
      uptime: 99.8,
      errors: 1,
      history: generateMockHistory(timeRange),
    },
    claude: {
      status: 'degraded',
      avgResponseTime: 350,
      uptime: 98.5,
      errors: 5,
      history: generateMockHistory(timeRange),
    },
  };
};

const generateMockHistory = (timeRange) => {
  const points = timeRange === '24h' ? 24 : timeRange === '7d' ? 7 : 30;
  return Array.from({ length: points }, (_, i) => ({
    timestamp: new Date(Date.now() - i * 3600000).toISOString(),
    responseTime: Math.floor(Math.random() * 200) + 150,
    requests: Math.floor(Math.random() * 100),
    errors: Math.floor(Math.random() * 3),
  }));
};