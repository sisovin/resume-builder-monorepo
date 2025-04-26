import React, { useState } from 'react';
import Modal from 'react-modal';
import axiosInstance from '../utils/axiosInstance';

const CreateResumeModal = ({ isOpen, onRequestClose, onResumeCreated }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axiosInstance.post('/resumes', { title, content });
      onResumeCreated(response.data);
      onRequestClose();
    } catch (error) {
      setError('Error creating resume. Please try again.');
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h2>Create Resume</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        {error && <p>{error}</p>}
        <button type="submit">Create</button>
        <button type="button" onClick={onRequestClose}>
          Cancel
        </button>
      </form>
    </Modal>
  );
};

export default CreateResumeModal;
