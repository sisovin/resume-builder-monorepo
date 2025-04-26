import React, { useState } from 'react';
import axiosInstance from '../utils/axiosInstance';

const ResumeSharing = ({ resumeId }) => {
  const [shareLink, setShareLink] = useState('');
  const [error, setError] = useState('');

  const generateShareLink = async () => {
    try {
      const response = await axiosInstance.post(`/resumes/${resumeId}/share`);
      setShareLink(response.data.shareLink);
    } catch (err) {
      setError('Failed to generate share link');
    }
  };

  return (
    <div>
      <button onClick={generateShareLink}>Generate Share Link</button>
      {shareLink && (
        <div>
          <p>Share this link:</p>
          <a href={shareLink} target="_blank" rel="noopener noreferrer">
            {shareLink}
          </a>
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default ResumeSharing;
