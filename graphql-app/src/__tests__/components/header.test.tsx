import { screen, render } from '@testing-library/react';
import Header from '@/components/header/header';

describe('Header', () => {
  it('should render correctly', () => {
    render (<Header />);
    const headerText = screen.getByTestId('header');
    
    expect(headerText).toBeInTheDocument();
  });
  
  it('renders sign-in link', () => {
    render (<Header />);
    const signInLink = screen.getByText('Sign In');
    
    expect(signInLink).toBeInTheDocument();
    expect(signInLink).toHaveAttribute('href', '/sign-in');
  });
});