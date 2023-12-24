"use client";
import React, { useState } from 'react';

const LangSwitch = () => {
    const [language, setLanguage] = useState('en');

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'ru' : 'en');
        if (language === 'ru') {
            localStorage.setItem('language', 'ru');
        } else {
            localStorage.setItem('language', 'en');
        }
    };

    return (
        <div className="flex justify-center my-4">
            <button
                onClick={toggleLanguage}
                className="w-32 px-4 py-2 bg-white hover:bg-gray-100 text-gray-800 font-bold rounded"
            >
                {language === 'en' ? 'Русский' : 'English'}
            </button>
        </div>
    );
};

export default LangSwitch;
