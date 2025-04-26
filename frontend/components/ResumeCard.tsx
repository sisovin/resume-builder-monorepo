import React, { useState } from 'react';
import { Menu, MenuItem, MenuButton } from '@reach/menu-button';
import '@reach/menu-button/styles.css';

const ResumeCard = ({ resume }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleEdit = () => {
    // Handle edit action
  };

  const handleDelete = () => {
    // Handle delete action
  };

  return (
    <div className="resume-card">
      <h2>{resume.title}</h2>
      <p>{resume.content}</p>
      <Menu>
        <MenuButton onClick={handleMenuToggle}>
          Actions <span aria-hidden>▾</span>
        </MenuButton>
        <div className={`menu ${isMenuOpen ? 'open' : ''}`}>
          <MenuItem onSelect={handleEdit}>Edit</MenuItem>
          <MenuItem onSelect={handleDelete}>Delete</MenuItem>
        </div>
      </Menu>
    </div>
  );
};

export default ResumeCard;
