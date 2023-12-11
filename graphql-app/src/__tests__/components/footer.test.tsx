import { screen, render } from '@testing-library/react';
import Footer from '@/components/footer/footer';

describe('Footer', () => {
  it('should render correctly', () => {
    render(<Footer />);
    const footerText = screen.getByTestId('footer');
    expect(footerText).toBeInTheDocument();
  });

  it('renders 3 GitHub links', () => {
    render(<Footer />);
    const githubLinks = screen.getAllByRole('link', { name: /github/i });
    expect(githubLinks).toHaveLength(3);
    githubLinks.forEach((link) => {
      expect(link).toHaveAttribute('href', expect.stringContaining('https://github.com/'));
    });
  });

  it('renders RS School link', () => {
    render(<Footer />);
    const rsSchoolLink = screen.getByRole('link', { name: /rs school/i });
    expect(rsSchoolLink).toBeInTheDocument();
    expect(rsSchoolLink).toHaveAttribute('href', 'https://rs.school/react/');
  });
});
