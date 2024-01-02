import { AppRoutes } from '@/common/routes';
import { render, screen, waitFor } from '@testing-library/react';
import { redirect } from 'next/navigation';
import { Providers } from '@/redux/provider';
import AuthGuard from '@/components/authGuard/authGuard';

jest.mock('next/navigation');

jest.mock('react-firebase-hooks/auth', () => ({
  useAuthState: jest.fn(() => [null, false]),
}));

jest.mock('../../firebase', () => ({
  auth: {
    onAuthStateChanged: jest.fn(),
  },
}));

describe('AuthGuard', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('redirects to GRAPHQL page when user is authenticated', async () => {
    jest
      .spyOn(require('react-firebase-hooks/auth'), 'useAuthState')
      .mockReturnValue([{ email: 'test@example.com' }, false]);
    render(
      <Providers>
        <AuthGuard>
          <div data-testid="child">Child Component</div>
        </AuthGuard>
      </Providers>
    );
    await waitFor(() => expect(redirect).toHaveBeenCalledWith(AppRoutes.GRAPHQL));
    expect(screen.queryByTestId('child')).not.toBeInTheDocument();
  });

  it('renders Loading component while waiting for authentication state', async () => {
    jest.spyOn(require('react-firebase-hooks/auth'), 'useAuthState').mockReturnValue([null, true]);

    render(
      <Providers>
        <AuthGuard>
          <div data-testid="child">Child Component</div>
        </AuthGuard>
      </Providers>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
    expect(screen.queryByTestId('child')).not.toBeInTheDocument();
  });

  it('renders child component when user is not authenticated', async () => {
    jest.spyOn(require('react-firebase-hooks/auth'), 'useAuthState').mockReturnValue([null, false]);

    render(
      <Providers>
        <AuthGuard>
          <div data-testid="child">Child Component</div>
        </AuthGuard>
      </Providers>
    );

    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });
});
