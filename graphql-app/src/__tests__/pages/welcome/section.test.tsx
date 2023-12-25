import React from 'react';
import { render, screen } from '@testing-library/react';
import { WelcomeSection } from '../../../components/WelcomeSection/WelcomeSection';

const mockSectionInfo = {
    title: 'Test Section',
    content: 'Test Content',
    link: 'https://example.com/test',
};

describe('Section', () => {
    it('renders Section correctly', () => {
        render(<WelcomeSection info={mockSectionInfo} />);

        expect(screen.getByText(mockSectionInfo.title)).toBeInTheDocument();
        expect(screen.getByText(mockSectionInfo.content)).toBeInTheDocument();
        expect(screen.getByRole('link')).toHaveAttribute('href', mockSectionInfo.link);
    });
});
