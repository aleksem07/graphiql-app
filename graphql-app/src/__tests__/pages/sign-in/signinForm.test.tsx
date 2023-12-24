import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignInForm from '../../../app/sign-in/signinForm';
import { logInWithEmailAndPassword } from '@/firebase';
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
  signInWithEmailAndPassword: jest.fn(),
  logInWithEmailAndPassword: jest.fn(async () => true),
}));

const validEmail = 'test@example.com';
const validPassword = 'Password123!';
const invalidPassword = 'password';

describe('SignInForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders SignInForm correctly', () => {
    const { container } = render(<SignInForm />);
    expect(container).toMatchSnapshot();
  });

  it('toggles password visibility when eye icon is clicked', () => {
    render(<SignInForm />);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const eyeIcon = screen.getByTestId('eye-icon');

    expect(passwordInput).toHaveAttribute('type', 'password');

    fireEvent.click(eyeIcon);
    expect(passwordInput).toHaveAttribute('type', 'text');

    fireEvent.click(eyeIcon);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  it('submits the form with valid data', async () => {
    render(<SignInForm />);
    jest
      .spyOn(require('../../../firebase'), 'signInWithEmailAndPassword')
      .mockResolvedValueOnce({});

    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: validEmail } });
    fireEvent.change(passwordInput, { target: { value: validPassword } });

    await waitFor(() => {
      expect(emailInput).toHaveValue(validEmail);
      expect(passwordInput).toHaveValue(validPassword);
      expect(submitButton).toBeEnabled();
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(logInWithEmailAndPassword).toHaveBeenCalledWith(validEmail, validPassword);
    });
  });

  it('displays an error for validation violations', async () => {
    render(<SignInForm />);

    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: validEmail } });
    fireEvent.change(passwordInput, { target: { value: invalidPassword } });

    await waitFor(() => {
      expect(emailInput).toHaveValue(validEmail);
      expect(passwordInput).toHaveValue(invalidPassword);
      expect(submitButton).toBeDisabled();
      const errorText = screen.getByText(/Password must contain a number/i);
      expect(errorText).toBeInTheDocument();
    });
  });

  it('redirects to graphql page if user is signed in', async () => {
    const mockReplace = jest.fn();
    jest
      .spyOn(require('next/navigation'), 'useRouter')
      .mockReturnValueOnce({ replace: mockReplace });

    jest
      .spyOn(require('react-firebase-hooks/auth'), 'useAuthState')
      .mockReturnValueOnce([{ email: 'test@example.com' }, false]);

    render(<SignInForm />);

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith(AppRoutes.GRAPHQL);
    });
  });
});
