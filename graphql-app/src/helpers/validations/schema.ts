import { InferType, object, ref, string } from 'yup';
import {
  minPasswordLength,
  regexLetterLowerCase,
  regexLetterUpperCase,
  regexNumber,
  regexSpecialChar,
} from './data';

export const validationSchema = object().shape({
  userName: string()
    .required()
    .matches(/\p{Lu}/u, 'Name should start with a capital letter'),
  email: string().required().email(),
  password: string()
    .required()
    .min(minPasswordLength, `Password must be at least ${minPasswordLength} length`)
    .matches(regexNumber, 'Password must contain a number')
    .matches(regexLetterUpperCase, 'Password must contain a capital letter')
    .matches(regexLetterLowerCase, 'Password must contain a lowercase letter')
    .matches(regexSpecialChar, 'Password must contain a special character'),
  confirmPassword: string()
    .oneOf([ref('password')], 'Passwords must match')
    .required(),
});

export type Data = InferType<typeof validationSchema>;
