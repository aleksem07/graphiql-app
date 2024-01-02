"use client";
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '../../redux/lang/languageSlice';
import { RootState } from '../../redux/store';

const LangSwitch = () => {
    const dispatch = useDispatch();
    const language = useSelector((state: RootState) => state.language.value);

    const toggleLanguage = () => {
        dispatch(setLanguage(language === 'en' ? 'ru' : 'en'));
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
