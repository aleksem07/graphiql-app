'use client';
import { useContext } from 'react';
import { LangContext } from '@/context/langContext';

function LangSwitch() {
  const { language, updateLanguage } = useContext(LangContext);

  const toggleLanguage = () => {
    updateLanguage(language === 'en' ? 'ru' : 'en');
  };

  return (
    <div className="flex justify-center my-4">
      <button
        onClick={toggleLanguage}
        className="w-32 px-4 py-2 bg-white hover:bg-gray-100 text-gray-800 font-bold rounded"
      >
        {language === 'en' ? 'Ру' : 'En'}
      </button>
    </div>
  );
}

export default LangSwitch;
