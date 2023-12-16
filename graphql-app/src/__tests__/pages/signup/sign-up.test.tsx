import { render, screen } from '@testing-library/react';
import SignUpPage from '../../../app/sign-up/page';

jest.mock('../../../app/sign-up/signupForm', () => () => <div data-testid="sign-up"></div>);

describe('SignUpPage', () => {
  it('renders the SignUpPage component', () => {
    render(<SignUpPage />);

    const signUpHeading = screen.getByRole('heading');
    expect(signUpHeading).toBeInTheDocument();

    const signupForm = screen.getByTestId('sign-up');
    expect(signupForm).toBeInTheDocument();
  });
});
