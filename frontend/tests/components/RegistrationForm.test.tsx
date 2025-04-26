import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RegistrationForm from '../../components/RegistrationForm';

describe('RegistrationForm', () => {
  test('renders registration form', () => {
    render(<RegistrationForm />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
  });

  test('shows validation errors', async () => {
    render(<RegistrationForm />);
    fireEvent.click(screen.getByRole('button', { name: /register/i }));
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/password is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/confirm password is required/i)).toBeInTheDocument();
  });

  test('shows error message on password mismatch', async () => {
    render(<RegistrationForm />);
    fireEvent.input(screen.getByLabelText(/email/i), { target: { value: 'user@example.com' } });
    fireEvent.input(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.input(screen.getByLabelText(/confirm password/i), { target: { value: 'password456' } });
    fireEvent.click(screen.getByRole('button', { name: /register/i }));
    expect(await screen.findByText(/passwords do not match/i)).toBeInTheDocument();
  });

  test('shows error message on registration failure', async () => {
    // Mock failed registration response
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({ error: 'Registration failed' }),
    });

    render(<RegistrationForm />);
    fireEvent.input(screen.getByLabelText(/email/i), { target: { value: 'user@example.com' } });
    fireEvent.input(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.input(screen.getByLabelText(/confirm password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    expect(await screen.findByText(/registration failed/i)).toBeInTheDocument();
  });

  test('redirects to login on successful registration', async () => {
    // Mock successful registration response
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({}),
    });

    render(<RegistrationForm />);
    fireEvent.input(screen.getByLabelText(/email/i), { target: { value: 'user@example.com' } });
    fireEvent.input(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.input(screen.getByLabelText(/confirm password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    // Check if redirected to login
    await screen.findByText(/redirecting to login/i);
  });
});
