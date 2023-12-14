import { render, screen } from '@testing-library/react';
import NavLinks from '@/components/navLinks/navLinks';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

jest.mock('react-firebase-hooks/auth', () => ({
  useAuthState: jest.fn(),
}));

jest.mock('../../firebase', () => ({
  auth: {
    onAuthStateChanged: jest.fn(() => {
      jest
        .spyOn(require('react-firebase-hooks/auth'), 'useAuthState')
        .mockReturnValue([null, false]);
    }),
    signOut: jest.fn(),
  },
  logout: jest.fn(() => {
    jest.spyOn(require('../../firebase'), 'logout');
    jest.spyOn(require('react-firebase-hooks/auth'), 'useAuthState').mockReturnValue([null, false]);
  }),
}));

describe('NavLinks', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders NavLinks component for non-authenticated user', () => {
    jest.spyOn(require('react-firebase-hooks/auth'), 'useAuthState').mockReturnValue([null, false]);

    render(<NavLinks />);

    const signInLink = screen.getByText(/Sign In/i);
    const signUpLink = screen.getByText(/Sign Up/i);

    expect(signInLink).toBeInTheDocument();
    expect(signUpLink).toBeInTheDocument();
  });

  it('renders NavLinks component for authenticated user', () => {
    jest
      .spyOn(require('react-firebase-hooks/auth'), 'useAuthState')
      .mockReturnValue([{ email: 'test@example.com' }, false]);

    render(<NavLinks />);

    const loggedInAsText = screen.getByText(/Logged in as/i);
    const graphqlLink = screen.getByText(/Go to playground/i);
    const logoutButton = screen.getByText(/Logout/i);

    expect(loggedInAsText).toBeInTheDocument();
    expect(graphqlLink).toBeInTheDocument();
    expect(logoutButton).toBeInTheDocument();
  });
});
