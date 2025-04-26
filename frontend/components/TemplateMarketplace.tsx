import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TemplateMarketplace = () => {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await axios.get('/api/templates');
        setTemplates(response.data);
      } catch (error) {
        console.error('Error fetching templates:', error);
      }
    };

    fetchTemplates();
  }, []);

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
  };

  return (
    <div>
      <h2>Template Marketplace</h2>
      <div className="template-list">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`template-item ${selectedTemplate === template ? 'selected' : ''}`}
            onClick={() => handleTemplateSelect(template)}
          >
            <h3>{template.name}</h3>
            <p>{template.description}</p>
          </div>
        ))}
      </div>
      {selectedTemplate && (
        <div className="template-preview">
          <h3>Preview: {selectedTemplate.name}</h3>
          <p>{selectedTemplate.description}</p>
          {/* Add more preview details as needed */}
        </div>
      )}
    </div>
  );
};

export default TemplateMarketplace;
