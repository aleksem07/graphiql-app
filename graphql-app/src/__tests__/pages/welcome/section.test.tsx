import React from 'react';
import { render, screen } from '@testing-library/react';
import { WelcomeSection } from '../../../components/WelcomeSection/WelcomeSection';
import { SectionInfo } from '@/common/welcomePageData';

const mockSectionInfo: SectionInfo = {
  title: {
    en: 'Test Section',
    ru: 'Тестовая секция',
  },
  content: {
    en: 'Test Content',
    ru: 'Тестовый контент',
  },
  link: 'https://example.com/test',
};

describe('Section', () => {
  it('renders Section correctly', () => {
    render(<WelcomeSection info={mockSectionInfo} lang={'en'} />);

    expect(screen.getByText(mockSectionInfo.title.en)).toBeInTheDocument();
    expect(screen.getByText(mockSectionInfo.content.en)).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', mockSectionInfo.link);
  });
});
