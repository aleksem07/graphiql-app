'use client';
import { useContext, useEffect } from 'react';
import { LangContext } from '@/context/langContext';

function LangSwitch() {
  const { language, updateLanguage } = useContext(LangContext);

  useEffect(() => {
    const langFromLS = localStorage.getItem('langGRAPHQL');
    if (langFromLS === 'ru' || langFromLS === 'en') updateLanguage(langFromLS);
  }, []);

  const toggleLanguage = () => {
    updateLanguage(language === 'en' ? 'ru' : 'en');
  };

  return (
    <div className="flex justify-center my-1">
      <button
        onClick={toggleLanguage}
        className="w-18 px-2 py-2 bg-white hover:bg-gray-100 text-gray-800 font-bold rounded"
      >
        {language === 'en' ? 'Ру' : 'En'}
      </button>
    </div>
  );
}

export default LangSwitch;
