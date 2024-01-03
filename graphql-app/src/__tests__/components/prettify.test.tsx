import { render, screen } from '@testing-library/react';
import { Prettify } from '@/common/prettify';
import { Providers } from '@/redux/provider';

describe('Prettify', () => {
  it('should render correctly', () => {
    render(
      <Providers>
        <Prettify />
      </Providers>
    );
    const prettify = screen.getByTestId('prettify-button');

    expect(prettify).toBeInTheDocument();
  });

  // it('should call setQuery with the prettified query when the button is clicked', () => {
  //   const mockDispatch = jest.fn();
  //   const query = '{characters{results{name status}}}';
  //   const prettifiedQuery =
  //     '{\n  characters {\n    results {\n      name\n      status\n    }\n  }\n}';

  //   jest.spyOn(require('@/redux/hooks'), 'useAppSelector').mockReturnValue(query);

  //   jest.spyOn(require('@/redux/hooks'), 'useAppDispatch').mockReturnValue(mockDispatch);

  //   render(
  //     <Providers>
  //       <Prettify />
  //     </Providers>
  //   );

  //   const button = screen.getByTestId('prettify-button');
  //   fireEvent.click(button);

  //   expect(mockDispatch).toHaveBeenCalledWith({
  //     query: prettifiedQuery,
  //   });
  // });
});
