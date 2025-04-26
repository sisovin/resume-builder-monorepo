import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SortingFilteringControls from '../../components/SortingFilteringControls';

describe('SortingFilteringControls', () => {
  test('renders sorting and filtering controls', () => {
    render(<SortingFilteringControls onSortChange={jest.fn()} onFilterChange={jest.fn()} />);
    expect(screen.getByLabelText(/sort by/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/filter by/i)).toBeInTheDocument();
  });

  test('calls onSortChange when sort option is changed', () => {
    const onSortChange = jest.fn();
    render(<SortingFilteringControls onSortChange={onSortChange} onFilterChange={jest.fn()} />);
    fireEvent.change(screen.getByLabelText(/sort by/i), { target: { value: 'date' } });
    expect(onSortChange).toHaveBeenCalledWith('date');
  });

  test('calls onFilterChange when filter option is changed', () => {
    const onFilterChange = jest.fn();
    render(<SortingFilteringControls onSortChange={jest.fn()} onFilterChange={onFilterChange} />);
    fireEvent.change(screen.getByLabelText(/filter by/i), { target: { value: 'completed' } });
    expect(onFilterChange).toHaveBeenCalledWith('completed');
  });
});
