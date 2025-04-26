import React, { useState } from 'react';
import axios from 'axios';

const AIContentSuggestions = ({ resumeContent, onSuggestionSelect }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSuggestions = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('/api/ai-suggestions', { content: resumeContent });
      setSuggestions(response.data.suggestions);
    } catch (err) {
      setError('Failed to fetch suggestions. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={fetchSuggestions} disabled={loading}>
        {loading ? 'Loading...' : 'Get AI Suggestions'}
      </button>
      {error && <div>{error}</div>}
      <ul>
        {suggestions.map((suggestion, index) => (
          <li key={index} onClick={() => onSuggestionSelect(suggestion)}>
            {suggestion}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AIContentSuggestions;
