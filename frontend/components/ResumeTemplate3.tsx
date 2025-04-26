import React from 'react';

const ResumeTemplate3 = ({ profile, experience, education, skills }) => {
  return (
    <div className="resume-template-3">
      <div className="profile-section">
        <h2>{profile.name}</h2>
        <p>{profile.summary}</p>
      </div>
      <div className="experience-section">
        <h3>Experience</h3>
        {experience.map((exp, index) => (
          <div key={index}>
            <h4>{exp.title}</h4>
            <p>{exp.company}</p>
            <p>{exp.description}</p>
          </div>
        ))}
      </div>
      <div className="education-section">
        <h3>Education</h3>
        {education.map((edu, index) => (
          <div key={index}>
            <h4>{edu.degree}</h4>
            <p>{edu.institution}</p>
            <p>{edu.description}</p>
          </div>
        ))}
      </div>
      <div className="skills-section">
        <h3>Skills</h3>
        <ul>
          {skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ResumeTemplate3;
