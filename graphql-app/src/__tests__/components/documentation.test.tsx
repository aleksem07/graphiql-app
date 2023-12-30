import { render, screen } from '@testing-library/react';
import Documentation from '@/components/documentation/documentation';
import { Providers } from '@/redux/provider';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  lazy: () => ({ then: jest.fn(), catch: jest.fn() }),
}));

describe('Documentation component', () => {
  it('should render text with url request if it is not provided ', () => {
    render(
      <Providers>
        <Documentation url={''} />
      </Providers>
    );
    const heading = screen.getByText(/Please select an API/i);
    expect(heading).toBeInTheDocument();
  });

  it('displays loading skeleton when data is being fetched', async () => {
    jest.mock('../../redux/api/api');

    render(
      <Providers>
        <Documentation url="test-url" />
      </Providers>
    );
    expect(screen.getByTestId('skeleton')).toBeInTheDocument();
  });
});
