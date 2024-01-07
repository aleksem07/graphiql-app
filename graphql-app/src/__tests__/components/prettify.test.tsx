import { render, screen, fireEvent } from '@testing-library/react';
import { Prettify } from '@/common/prettify';
import { Providers } from '@/redux/provider';
import { toast } from 'react-toastify';

describe('Prettify', () => {
  it('should render a button with the text "Prettify"', () => {
    render(
      <Providers>
        <Prettify />
      </Providers>
    );
    const button = screen.getByTestId('prettify-button');
    expect(button).toBeInTheDocument();
  });

  it('should dispatch setQuery with prettified query and show success toast on button click', () => {
    const mockDispatch = jest.fn();
    const mockToast = jest.spyOn(toast, 'success');
    const query = 'test';

    jest.mock('../../redux/hooks', () => ({
      useAppSelector: jest.fn().mockReturnValue(query),
      useAppDispatch: jest.fn().mockReturnValue(mockDispatch),
    }));

    render(
      <Providers>
        <Prettify />
      </Providers>
    );

    const button = screen.getByTestId('prettify-button');
    fireEvent.click(button);

    expect(mockToast).toHaveBeenCalledWith('Prettified successfully!');
  });
});
