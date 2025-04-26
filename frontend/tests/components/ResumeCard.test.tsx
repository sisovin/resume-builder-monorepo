import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ResumeCard from '../../components/ResumeCard';

describe('ResumeCard', () => {
  const mockResume = {
    id: 1,
    title: 'Software Engineer',
    content: 'Experienced software engineer with a focus on backend development.',
  };

  test('renders resume card', () => {
    render(<ResumeCard resume={mockResume} />);
    expect(screen.getByText(/Software Engineer/i)).toBeInTheDocument();
    expect(screen.getByText(/Experienced software engineer with a focus on backend development./i)).toBeInTheDocument();
  });

  test('opens actions menu', () => {
    render(<ResumeCard resume={mockResume} />);
    fireEvent.click(screen.getByText(/Actions/i));
    expect(screen.getByText(/Edit/i)).toBeInTheDocument();
    expect(screen.getByText(/Delete/i)).toBeInTheDocument();
  });

  test('handles edit action', () => {
    const handleEdit = jest.fn();
    render(<ResumeCard resume={mockResume} onEdit={handleEdit} />);
    fireEvent.click(screen.getByText(/Actions/i));
    fireEvent.click(screen.getByText(/Edit/i));
    expect(handleEdit).toHaveBeenCalled();
  });

  test('handles delete action', () => {
    const handleDelete = jest.fn();
    render(<ResumeCard resume={mockResume} onDelete={handleDelete} />);
    fireEvent.click(screen.getByText(/Actions/i));
    fireEvent.click(screen.getByText(/Delete/i));
    expect(handleDelete).toHaveBeenCalled();
  });
});
