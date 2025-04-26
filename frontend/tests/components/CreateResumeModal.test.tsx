import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CreateResumeModal from '../../components/CreateResumeModal';

describe('CreateResumeModal', () => {
  const mockOnRequestClose = jest.fn();
  const mockOnResumeCreated = jest.fn();

  test('renders create resume modal', () => {
    render(
      <CreateResumeModal
        isOpen={true}
        onRequestClose={mockOnRequestClose}
        onResumeCreated={mockOnResumeCreated}
      />
    );
    expect(screen.getByText(/Create Resume/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Content/i)).toBeInTheDocument();
  });

  test('shows validation errors', async () => {
    render(
      <CreateResumeModal
        isOpen={true}
        onRequestClose={mockOnRequestClose}
        onResumeCreated={mockOnResumeCreated}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /Create/i }));
    expect(await screen.findByText(/Title is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/Content is required/i)).toBeInTheDocument();
  });

  test('shows error message on creation failure', async () => {
    // Mock failed creation response
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({ error: 'Error creating resume' }),
    });

    render(
      <CreateResumeModal
        isOpen={true}
        onRequestClose={mockOnRequestClose}
        onResumeCreated={mockOnResumeCreated}
      />
    );
    fireEvent.input(screen.getByLabelText(/Title/i), { target: { value: 'New Resume' } });
    fireEvent.input(screen.getByLabelText(/Content/i), { target: { value: 'Resume content' } });
    fireEvent.click(screen.getByRole('button', { name: /Create/i }));

    expect(await screen.findByText(/Error creating resume. Please try again./i)).toBeInTheDocument();
  });

  test('calls onResumeCreated on successful creation', async () => {
    // Mock successful creation response
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({ id: 1, title: 'New Resume', content: 'Resume content' }),
    });

    render(
      <CreateResumeModal
        isOpen={true}
        onRequestClose={mockOnRequestClose}
        onResumeCreated={mockOnResumeCreated}
      />
    );
    fireEvent.input(screen.getByLabelText(/Title/i), { target: { value: 'New Resume' } });
    fireEvent.input(screen.getByLabelText(/Content/i), { target: { value: 'Resume content' } });
    fireEvent.click(screen.getByRole('button', { name: /Create/i }));

    expect(mockOnResumeCreated).toHaveBeenCalledWith({ id: 1, title: 'New Resume', content: 'Resume content' });
  });

  test('calls onRequestClose on cancel', () => {
    render(
      <CreateResumeModal
        isOpen={true}
        onRequestClose={mockOnRequestClose}
        onResumeCreated={mockOnResumeCreated}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /Cancel/i }));
    expect(mockOnRequestClose).toHaveBeenCalled();
  });
});
