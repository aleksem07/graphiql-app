'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { auth, logInWithEmailAndPassword } from '../../firebase';
import translation from '@/data/translation';
import { ValidationDataSignIn, validationSchemaSignIn } from '@/helpers/validations/schema';
import { useForm } from 'react-hook-form';

export default function SignIn() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isValid, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(validationSchemaSignIn),
    mode: 'onChange',
  });

  const [errorInSignIn, setErrorInSignIn] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [user, loading] = useAuthState(auth);

  const router = useRouter();

  const language = 'en';

  const submitForm = async (data: ValidationDataSignIn) => {
    await logInWithEmailAndPassword(data.email, data.password)
      .then((res: unknown) => {
        if (loading) return;
        if (isSubmitSuccessful && user) router.push('/');
        if (res instanceof Error) throw new Error(res.message);
      })
      .catch((err) => {
        console.log(err);
        if (err instanceof Error) setErrorInSignIn(translation.auth.emailNotFound[language]);
      });
  };
  watch(['email', 'password']);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        className="w-full max-w-md bg-gray-300 p-6 rounded-md"
        onSubmit={handleSubmit(submitForm)}
        noValidate
      >
        <input
          type="text"
          className="px-4 py-2 mb-1 w-full text-lg border border-gray-400 rounded-md"
          placeholder={translation.auth.email[language]}
          onFocus={() => setErrorInSignIn('')}
          {...register('email', { required: true })}
        />
        <p className="text-red-500 text-xs mb-1 text-left h-4">{errors.email?.message}</p>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            className="px-4 py-2 mb-1 w-full text-lg border border-gray-400 rounded-md"
            placeholder={translation.auth.password[language]}
            onFocus={() => setErrorInSignIn('')}
            {...register('password', { required: true })}
          />
          <button
            className="absolute top-1 right-0 mt-2 mr-2 text-sm text-gray-600 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <FontAwesomeIcon icon={faEyeSlash} />
            ) : (
              <FontAwesomeIcon icon={faEye} />
            )}
          </button>
        </div>
        <p className="text-red-500 text-xs mb-1 text-left h-4">{errors.password?.message}</p>

        <input
          type="submit"
          value={translation.buttons.signIn[language]}
          disabled={!isValid}
          className="px-4 py-2 mt-2 mb-2 w-full text-lg text-white bg-black rounded-md cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
        />
        <p className="text-red-500 text-sm mb-4 text-center h-4">{errorInSignIn}</p>
        <div>
          <Link href="/reset">
            <span className="group relative">
              {translation.auth.forgotPassword[language]}
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gray-500 w-0 transition-all group-hover:w-full"></span>
            </span>
          </Link>
        </div>
        <div>
          {translation.auth.dontHaveAccount[language]}{' '}
          <Link href="/signup">
            <span className="group relative">
              {translation.buttons.signUp[language]}
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gray-500 w-0 transition-all group-hover:w-full"></span>
            </span>
          </Link>
        </div>
      </form>
    </div>
  );
}
