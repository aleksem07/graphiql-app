import { screen, render } from '@testing-library/react';
import Footer from '@/components/footer/footer';
import { describe } from 'node:test';

describe('Footer', () => {
  it('should render correctly', () => {
    render (<Footer />);
    const footerText = screen.getByText(`© ${new Date().getFullYear()} All Rights Reserved.`);
    expect(footerText).toBeInTheDocument();
  });
});