'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, registerWithEmailAndPassword } from '../../firebase';
import { yupResolver } from '@hookform/resolvers/yup';
import { ValidationDataSignUp, validationSchemaSignUp } from '@/common/validations/schema';
import { useForm } from 'react-hook-form';
import translation from '@/common/translation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { AppRoutes } from '@/common/routes';
import { setUser } from '@/redux/user/userSlice';
import { useAppDispatch } from '@/redux/hooks';

export default function SignupForm() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(validationSchemaSignUp),
    mode: 'onChange',
  });

  const [errorInSignUp, setErrorInSignUp] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
  const [user, loading] = useAuthState(auth);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const language = 'en';

  const submitForm = async (data: ValidationDataSignUp) => {
    await registerWithEmailAndPassword(data.userName, data.email, data.password)
      .then((res: unknown) => {
        if (res instanceof Error) throw new Error(res.message);
      })
      .catch((err) => {
        if (err instanceof Error) setErrorInSignUp(translation.error.defaultError[language]);
      });
  };

  useEffect(() => {
    if (loading) return;
    if (user) {
      dispatch(setUser({ isSignedIn: true, email: user.email }));
      router.replace('/');
    }
  }, [user, loading]);

  watch(['userName', 'email', 'password', 'confirmPassword']);

  return (
    <form
      className="w-full max-w-md bg-gray-300 p-6 rounded-md"
      onSubmit={handleSubmit(submitForm)}
      noValidate
    >
      <input
        type="text"
        className="px-4 py-2 mb-1 w-full text-lg border border-gray-400 rounded-md"
        placeholder={translation.auth.name[language]}
        onFocus={() => setErrorInSignUp('')}
        {...register('userName', { required: true })}
      />
      <p className="text-red-500 text-xs mb-1 text-left h-4">{errors.userName?.message}</p>

      <input
        type="text"
        className="px-4 py-2 mb-1 w-full text-lg border border-gray-400 rounded-md"
        placeholder={translation.auth.email[language]}
        onFocus={() => setErrorInSignUp('')}
        {...register('email', { required: true })}
      />
      <p className="text-red-500 text-xs mb-1 text-left h-4">{errors.email?.message}</p>

      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          className="px-4 py-2 mb-1 w-full text-lg border border-gray-400 rounded-md"
          placeholder={translation.auth.password[language]}
          onFocus={() => setErrorInSignUp('')}
          {...register('password', { required: true })}
        />
        <button
          className="absolute top-1 right-0 mt-2 mr-2 text-sm text-gray-600 cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
        </button>
      </div>
      <p className="text-red-500 text-xs mb-1 text-left h-4">{errors.password?.message}</p>

      <div className="relative">
        <input
          type={showPasswordConfirmation ? 'text' : 'password'}
          className="px-4 py-2 mb-1 w-full text-lg border border-gray-400 rounded-md"
          placeholder={translation.auth.confirmPassword[language]}
          onFocus={() => setErrorInSignUp('')}
          {...register('confirmPassword', { required: true })}
        />
        <button
          className="absolute top-1 right-0 mt-2 mr-2 text-sm text-gray-600 cursor-pointer"
          onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
        >
          {showPasswordConfirmation ? (
            <FontAwesomeIcon icon={faEyeSlash} />
          ) : (
            <FontAwesomeIcon icon={faEye} />
          )}
        </button>
      </div>
      <p className="text-red-500 text-xs mb-1 text-left h-4">{errors.confirmPassword?.message}</p>

      <input
        type="submit"
        value={translation.buttons.signIn[language]}
        disabled={!isValid}
        className="px-4 py-2 mt-2 mb-2 w-full text-lg text-white bg-black rounded-md cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
      />
      <p className="text-red-500 text-sm mb-4 text-center h-4">{errorInSignUp}</p>

      <div>
        {`${translation.auth.alreadyHaveAccount[language]} `}
        <Link href={AppRoutes.SING_IN}>
          <span className="group relative">
            {translation.buttons.signIn[language]}
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gray-500 w-0 transition-all group-hover:w-full"></span>
          </span>
        </Link>
      </div>
    </form>
  );
}
