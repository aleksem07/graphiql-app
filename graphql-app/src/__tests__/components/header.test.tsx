import { screen, render, fireEvent } from '@testing-library/react';
import Header from '@/components/header/header';

jest.mock('../../components/navLinks/navLinks', () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="navLinks" />),
}));

describe('Header', () => {
  it('should render correctly', () => {
    render(<Header />);
    const headerElement = screen.getByTestId('header');
    const navLinks = screen.getByTestId('navLinks');

    expect(headerElement).toBeInTheDocument();
    expect(navLinks).toBeInTheDocument();
  });

  it('changes styles on scroll', () => {
    render(<Header />);
    fireEvent.scroll(window, { target: { scrollY: 100 } });

    const headerElement = screen.getByTestId('header');

    expect(headerElement).toHaveStyle('background-color: #607D8B');
    expect(headerElement).toHaveStyle('color: #fff');
  });
});
