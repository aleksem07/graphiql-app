import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignUpForm from '../../../app/sign-up/signupForm';
import { registerWithEmailAndPassword } from '@/firebase';
import { AppRoutes } from '@/common/routes';

jest.mock('next/navigation');

jest.mock('react-firebase-hooks/auth', () => ({
  useAuthState: jest.fn(() => [null, false]),
}));

jest.mock('../../../firebase', () => ({
  auth: {
    onAuthStateChanged: jest.fn(() => {
      jest
        .spyOn(require('react-firebase-hooks/auth'), 'useAuthState')
        .mockReturnValue([{ email: 'test@example.com' }, false]);
    }),
  },
  createUserWithEmailAndPassword: jest.fn(async () => true),
  registerWithEmailAndPassword: jest.fn(async () => true),
  addDoc: jest.fn(() => Promise.resolve({})),
}));

const testName = 'Test';
const validEmail = 'test@example.com';
const validPassword = 'Password123!';
const invalidPassword = 'password';

describe('SignUpForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders SignUpForm correctly', () => {
    const { container } = render(<SignUpForm />);
    expect(container).toMatchSnapshot();
  });

  it('submits the form with valid data', async () => {
    render(<SignUpForm />);
    jest
      .spyOn(require('../../../firebase'), 'createUserWithEmailAndPassword')
      .mockResolvedValueOnce({ user: { uid: 'test-uid' } });

    const nameInput = screen.getByPlaceholderText(/name/i);
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInputs = screen.getAllByPlaceholderText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    fireEvent.change(nameInput, { target: { value: testName } });
    fireEvent.change(emailInput, { target: { value: validEmail } });
    passwordInputs.forEach((passwordInput) => {
      fireEvent.change(passwordInput, { target: { value: validPassword } });
    });

    await waitFor(() => {
      expect(nameInput).toHaveValue(testName);
      expect(emailInput).toHaveValue(validEmail);
      passwordInputs.forEach((passwordInput) => {
        expect(passwordInput).toHaveValue(validPassword);
      });
      expect(submitButton).toBeEnabled();
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(registerWithEmailAndPassword).toHaveBeenCalledWith(
        testName,
        validEmail,
        validPassword
      );
    });
  });

  it('displays an error for name validation', async () => {
    render(<SignUpForm />);

    const nameInput = screen.getByPlaceholderText(/name/i);

    fireEvent.change(nameInput, { target: { value: testName.toLocaleLowerCase() } });

    await waitFor(() => {
      const errorText = screen.getByText(/Name should start with a capital letter/i);
      expect(errorText).toBeInTheDocument();
    });
  });

  it('displays an error for passwords mismatch', async () => {
    render(<SignUpForm />);

    const passwordInput = screen.getByPlaceholderText('Password');
    const confirmPasswordInput = screen.getByPlaceholderText(/confirm password/i);

    fireEvent.change(passwordInput, { target: { value: validPassword } });
    fireEvent.change(confirmPasswordInput, { target: { value: invalidPassword } });

    await waitFor(() => {
      const errorText = screen.getByText(/Passwords must match/i);
      expect(errorText).toBeInTheDocument();
    });
  });

  it('toggles password visibility when eye icon is clicked', () => {
    render(<SignUpForm />);
    const passwordInputs = screen.getAllByPlaceholderText(/password/i);
    const eyeIcons = screen.getAllByTestId('eye-icon');

    passwordInputs.forEach((passwordInput) => {
      expect(passwordInput).toHaveAttribute('type', 'password');
    });

    eyeIcons.forEach((eyeIcon) => {
      fireEvent.click(eyeIcon);
    });

    passwordInputs.forEach((passwordInput) => {
      expect(passwordInput).toHaveAttribute('type', 'text');
    });

    eyeIcons.forEach((eyeIcon) => {
      fireEvent.click(eyeIcon);
    });

    passwordInputs.forEach((passwordInput) => {
      expect(passwordInput).toHaveAttribute('type', 'password');
    });
  });

  it('redirects to HOME on successful sign up', async () => {
    const mockReplace = jest.fn();
    jest
      .spyOn(require('next/navigation'), 'useRouter')
      .mockReturnValueOnce({ replace: mockReplace });

    jest
      .spyOn(require('react-firebase-hooks/auth'), 'useAuthState')
      .mockReturnValueOnce([{ email: 'test@example.com' }, false]);

    render(<SignUpForm />);

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith(AppRoutes.GRAPHQL);
    });
  });
});
