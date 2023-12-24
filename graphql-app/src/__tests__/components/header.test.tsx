import { screen, render } from '@testing-library/react';
import Header from '@/components/header/header';

jest.mock('../../components/navLinks/navLinks', () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="navLinks" />),
}));

describe('Header', () => {
  it('should render correctly', () => {
    render(<Header />);
    const headerText = screen.getByTestId('header');
    const navLinks = screen.getByTestId('navLinks');

    expect(headerText).toBeInTheDocument();
    expect(navLinks).toBeInTheDocument();
  });
});
