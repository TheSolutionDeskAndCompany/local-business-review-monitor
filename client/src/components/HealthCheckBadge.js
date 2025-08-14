import React, { useState, useEffect } from 'react';

const HealthCheckBadge = () => {
  const [isHealthy, setIsHealthy] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await fetch('/api/health');
        const data = await response.json();
        setIsHealthy(data.ok === true);
      } catch (error) {
        console.error('Health check failed:', error);
        setIsHealthy(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkHealth();
  }, []);

  if (isLoading) return null; // Don't show anything while loading

  return (
    <div className="health-badge">
      <span className={`health-dot ${isHealthy ? 'healthy' : 'unhealthy'}`}></span>
      <span className="sr-only">Service {isHealthy ? 'is healthy' : 'is experiencing issues'}</span>
    </div>
  );
};

export default HealthCheckBadge;
