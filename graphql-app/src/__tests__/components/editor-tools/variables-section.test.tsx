import { screen, render, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { VariablesSection } from '@/components/editor-tools/variables-section';
import { Providers } from '@/redux/provider';

describe('VariablesSection', () => {
  test('should toggle the height of the editor when button is clicked', () => {
    render(
      <Providers>
        <VariablesSection />
      </Providers>
    );
    const button = screen.getByTestId('variables-button');
    const editor = document.querySelector('[id="variables-editor"]') as HTMLElement;
    const defaultHeight = '0vh';
    const openHeight = '10vh';

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
});
