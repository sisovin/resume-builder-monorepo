import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import LoadingErrorStateHandlers from './LoadingErrorStateHandlers';

const AnalyticsDashboard = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/analytics');
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <LoadingErrorStateHandlers isLoading={isLoading} isError={isError}>
      <div className="analytics-dashboard">
        {data && (
          <div>
            <h1>Analytics Dashboard</h1>
            <p>Total Resumes: {data.totalResumes}</p>
            <p>Total Users: {data.totalUsers}</p>
            <p>Most Popular Template: {data.mostPopularTemplate}</p>
          </div>
        )}
      </div>
    </LoadingErrorStateHandlers>
  );
};

export default AnalyticsDashboard;
