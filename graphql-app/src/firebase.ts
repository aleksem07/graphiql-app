import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_ENV_apiKey,
  authDomain: process.env.NEXT_PUBLIC_ENV_authDomain,
  projectId: process.env.NEXT_PUBLIC_ENV_projectId,
  storageBucket: process.env.NEXT_PUBLIC_ENV_storageBucket,
  messagingSenderId: process.env.NEXT_PUBLIC_ENV_messagingSenderId,
  appId: process.env.NEXT_PUBLIC_ENV_appId,
  measurementId: process.env.NEXT_PUBLIC_ENV_measurementId,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const logInWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<void | Error> => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    if (err instanceof Error) return err;
  }
};

const registerWithEmailAndPassword = async (
  name: string,
  email: string,
  password: string
): Promise<void | Error> => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      name,
      authProvider: 'local',
      email,
    });
  } catch (err) {
    if (err instanceof Error) return err;
  }
};

const sendPasswordReset = async (email: string): Promise<void | Error> => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (err) {
    if (err instanceof Error) return err;
  }
};

const logout = (): void => {
  signOut(auth);
};

export {
  auth,
  db,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};
