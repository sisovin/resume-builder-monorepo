import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ResumeEditor from '../../components/ResumeEditor';

describe('ResumeEditor', () => {
  test('renders resume editor', () => {
    render(<ResumeEditor />);
    expect(screen.getByText(/Template Selector/i)).toBeInTheDocument();
    expect(screen.getByText(/Color Palette/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Export as PDF/i })).toBeInTheDocument();
  });

  test('handles form submission', () => {
    render(<ResumeEditor />);
    fireEvent.click(screen.getByRole('button', { name: /Save/i }));
    expect(screen.getByText(/Auto-saving resume data/i)).toBeInTheDocument();
  });

  test('handles color change', () => {
    render(<ResumeEditor />);
    fireEvent.change(screen.getByLabelText(/Color Palette/i), { target: { value: '#ff0000' } });
    expect(screen.getByLabelText(/Color Palette/i)).toHaveValue('#ff0000');
  });

  test('handles template change', () => {
    render(<ResumeEditor />);
    fireEvent.change(screen.getByLabelText(/Template Selector/i), { target: { value: 'template1' } });
    expect(screen.getByLabelText(/Template Selector/i)).toHaveValue('template1');
  });

  test('exports PDF', () => {
    render(<ResumeEditor />);
    fireEvent.click(screen.getByRole('button', { name: /Export as PDF/i }));
    expect(screen.getByText(/Resume/i)).toBeInTheDocument();
  });
});
