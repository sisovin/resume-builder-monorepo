import React, { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import debounce from 'lodash.debounce';
import { useForm, Controller } from 'react-hook-form';
import { jsPDF } from 'jspdf';
import { SketchPicker } from 'react-color';

const ProfileSection = dynamic(() => import('./ProfileSection'));
const ExperienceSection = dynamic(() => import('./ExperienceSection'));
const EducationSection = dynamic(() => import('./EducationSection'));
const SkillsSection = dynamic(() => import('./SkillsSection'));
const TemplateSelector = dynamic(() => import('./TemplateSelector'));

const ResumeEditor = () => {
  const { control, handleSubmit, watch, setValue } = useForm();
  const [color, setColor] = useState('#000000');
  const [template, setTemplate] = useState('default');
  const [resumeData, setResumeData] = useState({});

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleColorChange = (color) => {
    setColor(color.hex);
  };

  const handleTemplateChange = (template) => {
    setTemplate(template);
  };

  const saveResume = useCallback(
    debounce((data) => {
      console.log('Auto-saving resume data:', data);
      setResumeData(data);
    }, 1000),
    []
  );

  useEffect(() => {
    const subscription = watch((data) => {
      saveResume(data);
    });
    return () => subscription.unsubscribe();
  }, [watch, saveResume]);

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text('Resume', 10, 10);
    doc.save('resume.pdf');
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="profile"
          control={control}
          render={({ field }) => <ProfileSection {...field} />}
        />
        <Controller
          name="experience"
          control={control}
          render={({ field }) => <ExperienceSection {...field} />}
        />
        <Controller
          name="education"
          control={control}
          render={({ field }) => <EducationSection {...field} />}
        />
        <Controller
          name="skills"
          control={control}
          render={({ field }) => <SkillsSection {...field} />}
        />
        <button type="submit">Save</button>
      </form>
      <div>
        <h3>Template Selector</h3>
        <TemplateSelector onChange={handleTemplateChange} />
      </div>
      <div>
        <h3>Color Palette</h3>
        <SketchPicker color={color} onChange={handleColorChange} />
      </div>
      <button onClick={exportPDF}>Export as PDF</button>
    </div>
  );
};

export default ResumeEditor;
