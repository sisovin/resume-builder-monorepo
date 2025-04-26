import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ResumeList from '../../components/ResumeList';
import axiosInstance from '../../utils/axiosInstance';

jest.mock('../../utils/axiosInstance');

describe('ResumeList', () => {
  const mockResumes = [
    { id: 1, title: 'Software Engineer', content: 'Experienced software engineer with a focus on backend development.' },
    { id: 2, title: 'Frontend Developer', content: 'Skilled frontend developer with expertise in React and TypeScript.' },
  ];

  beforeEach(() => {
    axiosInstance.get.mockResolvedValue({
      data: {
        resumes: mockResumes,
        totalPages: 1,
      },
    });
  });

  test('renders resume list', async () => {
    render(<ResumeList />);

    const resumeTitles = await screen.findAllByText(/Software Engineer|Frontend Developer/);
    expect(resumeTitles).toHaveLength(2);
  });

  test('handles pagination', async () => {
    render(<ResumeList />);

    const nextPageButton = screen.getByText('Next');
    fireEvent.click(nextPageButton);

    expect(axiosInstance.get).toHaveBeenCalledWith('/resumes?page=2');
  });
});
