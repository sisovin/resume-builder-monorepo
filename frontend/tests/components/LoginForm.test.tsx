import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LoginForm from '../../components/LoginForm';

describe('LoginForm', () => {
  test('renders login form', () => {
    render(<LoginForm />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  test('shows validation errors', async () => {
    render(<LoginForm />);
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/password is required/i)).toBeInTheDocument();
  });

  test('shows error message on invalid credentials', async () => {
    render(<LoginForm />);
    fireEvent.input(screen.getByLabelText(/email/i), { target: { value: 'invalid@example.com' } });
    fireEvent.input(screen.getByLabelText(/password/i), { target: { value: 'wrongpassword' } });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    expect(await screen.findByText(/invalid email or password/i)).toBeInTheDocument();
  });

  test('redirects to dashboard on successful login', async () => {
    // Mock successful login response
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({ token: 'fake-token' }),
    });

    render(<LoginForm />);
    fireEvent.input(screen.getByLabelText(/email/i), { target: { value: 'user@example.com' } });
    fireEvent.input(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    // Check if redirected to dashboard
    await screen.findByText(/redirecting to dashboard/i);
  });
});
