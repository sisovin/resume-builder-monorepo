import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import ResumeCard from './ResumeCard';
import Pagination from './Pagination';

const ResumeList = () => {
  const [resumes, setResumes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await axiosInstance.get(`/resumes?page=${currentPage}`);
        setResumes(response.data.resumes);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Error fetching resumes:', error);
      }
    };

    fetchResumes();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <h1>Resume List</h1>
      <div>
        {resumes.map((resume) => (
          <ResumeCard key={resume.id} resume={resume} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ResumeList;
