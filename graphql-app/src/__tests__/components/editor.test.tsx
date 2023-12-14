import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { EditorQraphqlRequest } from '@/app/graphql/editor';
import ace from 'ace-builds';

ace.config.set('basePath', '@/app/graphql/editor');

describe('EditorQraphqlRequest', () => {
  it('should render correctly', () => {
    render(<EditorQraphqlRequest />);
    const editor = screen.getByTestId('api-select');
    const customApi = screen.getByTestId('editor');
    const responce = screen.getByTestId('response');
    const executeButton = screen.getByTestId('execute-button');

    expect(editor).toBeInTheDocument();
    expect(customApi).toBeInTheDocument();
    expect(responce).toBeInTheDocument();
    expect(executeButton).toBeInTheDocument();
  });

  it('allows entering a custom API URL', () => {
    render(<EditorQraphqlRequest />);
    const customApiInput = screen.getByPlaceholderText('Enter Custom API URL');

    fireEvent.change(customApiInput, { target: { value: 'http://custom-api-url.com' } });

    expect(customApiInput).toHaveValue('http://custom-api-url.com');
  });

  it('find "enter query here" in editor', () => {
    render(<EditorQraphqlRequest />);
    const editorInput = screen.getByText(/Enter GraphQL query here/i);
    expect(editorInput).toBeInTheDocument();
  });

  it('change query in editor', () => {
    const { getByTestId } = render(<EditorQraphqlRequest />);
    const editor = getByTestId('editor');

    if (editor) {
      const textarea = editor.querySelector('textarea');
      if (textarea) {
        fireEvent.change(textarea, { target: { value: 'new query' } });
        expect(textarea.value).toBe('new query');
      } else {
        throw new Error('Textarea not found');
      }
    } else {
      throw new Error('Editor not found');
    }
  });

  it('click on execute button', async () => {
    render(<EditorQraphqlRequest />);
    const executeButton = screen.getByTestId('execute-button');

    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve({ data: 'mocked data' }),
    });

    fireEvent.click(executeButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });
  });

  it('allows entering a custom API URL when the custom API option is enabled', () => {
    render(<EditorQraphqlRequest />);
    const customApiInput = screen.getByPlaceholderText('Enter Custom API URL');

    fireEvent.change(customApiInput, { target: { value: 'http://custom-api-url.com' } });

    expect(customApiInput).toHaveValue('http://custom-api-url.com');
  });

  it('allows selecting an API from the dropdown', async () => {
    render(<EditorQraphqlRequest />);
    const apiSelect = screen.getByTestId('api-select').querySelector('select') as HTMLSelectElement;

    if (apiSelect) {
      waitFor(() => {
        fireEvent.change(apiSelect, { target: { value: 'https://example.com/graphql' } });
        expect(apiSelect.value).toBe('https://example.com/graphql');
      });
    } else {
      throw new Error('API Select element not found');
    }
  });

  it('executes a query when the "Execute Query" button is clicked', async () => {
    render(<EditorQraphqlRequest />);
    const executeButton = screen.getByTestId('execute-button');

    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve({ data: 'mocked data' }),
    });

    fireEvent.click(executeButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });
  });
});
