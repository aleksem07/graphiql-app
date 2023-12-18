import React from 'react';
import { render, screen } from '@testing-library/react';
import { DeveloperCard } from '../../../app/welcome/page';

const mockDeveloper = {
    name: 'Test Developer',
    githubLink: 'https://github.com/JuliaAvona',
    imageLink: 'https://avatars.githubusercontent.com/u/94717941?v=4',
    description: 'Test Content',
};

describe('DeveloperCard', () => {
    it('renders DeveloperCard correctly', () => {
        render(<DeveloperCard developer={mockDeveloper} />);

        expect(screen.getByText(mockDeveloper.name)).toBeInTheDocument();
        expect(screen.getByText(mockDeveloper.description)).toBeInTheDocument();
        expect(screen.getByRole('img', { name: mockDeveloper.name })).toBeInTheDocument();
        expect(screen.getByRole('link')).toHaveAttribute('href', mockDeveloper.githubLink);
    });
});
