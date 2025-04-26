import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axiosInstance from '../utils/axiosInstance';

interface RegistrationFormInputs {
  email: string;
  password: string;
  confirmPassword: string;
}

const RegistrationForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<RegistrationFormInputs>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [passwordStrength, setPasswordStrength] = useState<string | null>(null);

  const onSubmit = async (data: RegistrationFormInputs) => {
    if (data.password !== data.confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    try {
      await axiosInstance.post('/api/auth/register', data);
      window.location.href = '/login';
    } catch (error) {
      setErrorMessage('Registration failed');
    }
  };

  const validatePasswordStrength = (password: string) => {
    const strength = password.length >= 8 ? 'Strong' : 'Weak';
    setPasswordStrength(strength);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register('email', { required: 'Email is required' })}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          id="password"
          type="password"
          {...register('password', { required: 'Password is required' })}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          onChange={(e) => validatePasswordStrength(e.target.value)}
        />
        {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>}
        {passwordStrength && <p className="mt-2 text-sm text-green-600">{passwordStrength}</p>}
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          {...register('confirmPassword', { required: 'Confirm Password is required' })}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.confirmPassword && <p className="mt-2 text-sm text-red-600">{errors.confirmPassword.message}</p>}
      </div>

      {errorMessage && <p className="mt-2 text-sm text-red-600">{errorMessage}</p>}

      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Register
        </button>
      </div>
    </form>
  );
};

export default RegistrationForm;
