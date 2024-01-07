import { EditorTools } from '@/components/editor-tools/editor-tools';
import { screen, render, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { Providers } from '@/redux/provider';

describe('EditorTools', () => {
  it('should render correctly', () => {
    render(
      <Providers>
        <EditorTools />
      </Providers>
    );
    const editor = document.querySelector('[id="variables-editor"]') as HTMLElement;

    expect(editor).toBeInTheDocument();
  });

  it('should toggle the height of the editor when button is clicked', () => {
    render(
      <Providers>
        <EditorTools />
      </Providers>
    );
    const button = screen.getByTestId('show-hide-button');
    const editor = document.querySelector('[id="variables-editor"]') as HTMLElement;
    const defaultHeight = '0vh';
    const openHeight = '15vh';

    if (!editor) {
      throw new Error('Editor not found');
    }

    expect(editor.style.height).toBe(defaultHeight);

    act(() => {
      fireEvent.click(button);
    });

    expect(editor.style.height).toBe(openHeight);

    act(() => {
      fireEvent.click(button);
    });

    expect(editor.style.height).toBe(defaultHeight);
  });

  it('Buttons toggle state correctly', () => {
    render(
      <Providers>
        <EditorTools />
      </Providers>
    );
    const variablesButton = screen.getByTestId('variables-button');
    const headersButton = screen.getByTestId('headers-button');
    const showHideButton = screen.getByTestId('show-hide-button');

    act(() => {
      fireEvent.click(variablesButton);
    });
    expect(variablesButton).toHaveClass('bg-gray-300');
    expect(headersButton).not.toHaveClass('bg-gray-300');
    expect(showHideButton).toHaveTextContent('Hide');

    act(() => {
      fireEvent.click(headersButton);
    });
    expect(headersButton).toHaveClass('bg-gray-300');
    expect(variablesButton).not.toHaveClass('bg-gray-300');
    expect(showHideButton).toHaveTextContent('Hide');

    act(() => {
      fireEvent.click(showHideButton);
    });
    expect(variablesButton).not.toHaveClass('bg-gray-300');
    expect(headersButton).not.toHaveClass('bg-gray-300');
    expect(showHideButton).toHaveTextContent('Show');
  });
});
