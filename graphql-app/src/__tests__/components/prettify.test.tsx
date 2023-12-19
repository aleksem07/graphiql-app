import { screen, render, fireEvent } from '@testing-library/react';
import { Prettify } from '@/common/prettify';

describe('Prettify', () => {
  it('should call setQuery with the prettified query when the button is clicked', () => {
    const setQueryMock = jest.fn();
    const query = '{characters{results{name status}}}';
    render(<Prettify query={query} setQuery={setQueryMock} />);

    const button = screen.getByText('Prettify');

    fireEvent.click(button);

    const prettifiedQuery =
      '{\n  characters {\n    results {\n      name\n      status\n    }\n  }\n}';
    expect(setQueryMock).toHaveBeenCalledWith(prettifiedQuery);
  });
});
