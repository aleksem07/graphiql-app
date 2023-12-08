'use client';

import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { auth, sendPasswordReset } from '../../firebase';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ValidationDataReset, validationSchemaReset } from '@/common/validations/schema';
import translation from '@/common/translation';
import { AppRoutes } from '@/common/routes';

export default function ResetPassword() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(validationSchemaReset),
    mode: 'onChange',
  });

  const [errorInReset, setErrorInReset] = useState('');
  const [resetLinkSent, setResetLinkSent] = useState('');
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  const language = 'en';

  const submitForm = async (data: ValidationDataReset) => {
    await sendPasswordReset(data.email)
      .then((res) => {
        if (res instanceof Error) throw new Error(res.message);
        console.log(res);
        console.log(user);
        setResetLinkSent(translation.auth.resetLinkSent[language]);
      })
      .catch((err) => {
        if (err instanceof Error) setErrorInReset(translation.error.defaultError[language]);
      });
  };

  useEffect(() => {
    if (loading) return;
    if (user) router.replace('/');
  }, [user, loading]);

  watch(['email']);

  return (
    <form
      className="w-full max-w-md bg-gray-300 p-6 rounded-md"
      onSubmit={handleSubmit(submitForm)}
      noValidate
    >
      <input
        type="text"
        className="px-4 py-2 mb-1 w-full text-lg border border-gray-400 rounded-md"
        placeholder={translation.auth.email[language]}
        {...register('email', { required: true })}
      />
      <p className="text-red-500 text-xs mb-1 text-left h-4">{errors.email?.message}</p>

      <input
        type="submit"
        value={translation.auth.resetPassword[language]}
        disabled={!isValid}
        className="px-4 py-2 mt-2 mb-2 w-full text-lg text-white bg-black rounded-md cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
      />
      <p
        className={`${
          errorInReset ? 'text-red-500' : 'text-green-500'
        } text-sm mb-4 text-center h-4`}
      >
        {errorInReset || resetLinkSent}
      </p>
      <div>
        {`${translation.auth.dontHaveAccount[language]} `}
        <Link href={AppRoutes.SING_UP}>{translation.buttons.signUp[language]}</Link>
      </div>
    </form>
  );
}
