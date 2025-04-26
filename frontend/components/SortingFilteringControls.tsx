import React, { useState } from 'react';

const SortingFilteringControls = ({ onSortChange, onFilterChange }) => {
  const [sortOption, setSortOption] = useState('');
  const [filterOption, setFilterOption] = useState('');

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortOption(value);
    onSortChange(value);
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilterOption(value);
    onFilterChange(value);
  };

  return (
    <div className="sorting-filtering-controls">
      <div>
        <label htmlFor="sort">Sort by:</label>
        <select id="sort" value={sortOption} onChange={handleSortChange}>
          <option value="">Select</option>
          <option value="date">Date</option>
          <option value="title">Title</option>
        </select>
      </div>
      <div>
        <label htmlFor="filter">Filter by:</label>
        <select id="filter" value={filterOption} onChange={handleFilterChange}>
          <option value="">Select</option>
          <option value="completed">Completed</option>
          <option value="in-progress">In Progress</option>
        </select>
      </div>
    </div>
  );
};

export default SortingFilteringControls;
