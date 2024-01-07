import { render, screen } from '@testing-library/react';
import Documentation from '@/components/documentation/documentation';
import { Providers } from '@/redux/provider';
import { docsRequestEnum } from '@/app/graphql/editor';

describe('Documentation component', () => {
  it('should render text with url request if it is not provided ', () => {
    render(
      <Providers>
        <Documentation url={''} request={docsRequestEnum.docs} lang="en" />
      </Providers>
    );
    const heading = screen.getByText(/Please select an API/i);
    expect(heading).toBeInTheDocument();
  });
});
