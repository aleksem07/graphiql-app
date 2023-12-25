import { EditorTools } from '@/components/editor-tools/editor-tools';
import { render, screen } from '@testing-library/react';
import { Providers } from '@/redux/provider';

describe('EditorTools', () => {
  it('should render correctly', () => {
    render(
      <Providers>
        <EditorTools />
      </Providers>
    );
    const editor = screen.getByTestId('editor-tools');
    expect(editor).toBeInTheDocument();
  });
});
