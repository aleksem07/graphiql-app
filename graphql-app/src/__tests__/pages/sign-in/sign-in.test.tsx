import { render, screen } from '@testing-library/react';
import SignInPage from '../../../app/sign-in/page';

jest.mock('../../../app/sign-in/signinForm', () => () => <div data-testid="sign-in"></div>);

describe('SignInPage', () => {
  it('renders the SignInPage component', () => {
    render(<SignInPage />);

    const signInHeading = screen.getByRole('heading');
    expect(signInHeading).toBeInTheDocument();

    const signinForm = screen.getByTestId('sign-in');
    expect(signinForm).toBeInTheDocument();
  });
});
