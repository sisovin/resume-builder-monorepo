import React, { useState } from 'react';

const translations = {
  en: {
    welcome: 'Welcome',
    description: 'This is a multi-language support component.',
  },
  es: {
    welcome: 'Bienvenido',
    description: 'Este es un componente de soporte multilingüe.',
  },
  fr: {
    welcome: 'Bienvenue',
    description: 'Ceci est un composant de support multilingue.',
  },
};

const MultiLanguageSupport = () => {
  const [language, setLanguage] = useState('en');

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <div>
      <select value={language} onChange={handleLanguageChange}>
        <option value="en">English</option>
        <option value="es">Español</option>
        <option value="fr">Français</option>
      </select>
      <h1>{translations[language].welcome}</h1>
      <p>{translations[language].description}</p>
    </div>
  );
};

export default MultiLanguageSupport;
