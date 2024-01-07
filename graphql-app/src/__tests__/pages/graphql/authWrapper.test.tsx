import AuthWrapper from '@/app/graphql/authWrapper';
import { AppRoutes } from '@/common/routes';
import { render, screen, waitFor } from '@testing-library/react';
import { redirect } from 'next/navigation';
import { Providers } from '@/redux/provider';
import {} from '../../../app/graphql/editor';
import ace from 'ace-builds';

ace.config.set('basePath', '@/app/graphql/editor');

jest.mock('next/navigation');

jest.mock('react-firebase-hooks/auth', () => ({
  useAuthState: jest.fn(() => [null, false]),
}));

jest.mock('../../../firebase', () => ({
  auth: {
    onAuthStateChanged: jest.fn(),
  },
}));

describe('AuthWrapper', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('redirects to HOME when user is not authenticated', async () => {
    render(
      <Providers>
        <AuthWrapper />
      </Providers>
    );
    jest.spyOn(require('react-firebase-hooks/auth'), 'useAuthState').mockReturnValue([null, false]);
    await waitFor(() => expect(redirect).toHaveBeenCalledWith(AppRoutes.HOME));
  });

  it('renders EditorQraphqlRequest when user is authenticated', async () => {
    jest
      .spyOn(require('react-firebase-hooks/auth'), 'useAuthState')
      .mockReturnValue([{ email: 'test@example.com' }, false]);
    render(
      <Providers>
        <AuthWrapper />
      </Providers>
    );

    expect(screen.getByTestId('editor')).toBeInTheDocument();
  });

  it('renders Loading while waiting for authentication state', async () => {
    jest.spyOn(require('react-firebase-hooks/auth'), 'useAuthState').mockReturnValue([null, true]);
    render(
      <Providers>
        <AuthWrapper />
      </Providers>
    );
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
});
