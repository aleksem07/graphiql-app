import React from 'react';
import { render, screen } from '@testing-library/react';
import { DeveloperCard } from '../../../components/DeveloperCard/DeveloperCard';
import { Developer } from '@/common/welcomePageData';

const mockDeveloper: Developer = {
  name: {
    en: 'Test Developer',
    ru: 'Тестовый разработчик',
  },
  githubLink: 'https://github.com/JuliaAvona',
  imageLink: 'https://avatars.githubusercontent.com/u/94717941?v=4',
  description: {
    en: 'Test Content',
    ru: 'Тестовый контент',
  },
};

describe('DeveloperCard', () => {
  it('renders DeveloperCard correctly', () => {
    render(<DeveloperCard developer={mockDeveloper} lang={'en'} />);

    expect(screen.getByText(mockDeveloper.name.en)).toBeInTheDocument();
    expect(screen.getByText(mockDeveloper.description.en)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: mockDeveloper.name.en })).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', mockDeveloper.githubLink);
  });
});
