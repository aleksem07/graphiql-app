import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { EditorQraphqlRequest } from '@/app/graphql/editor';
import ace from 'ace-builds';
import { Providers } from '@/redux/provider';
import { toast } from 'react-toastify';

ace.config.set('basePath', '@/app/graphql/editor');

describe('EditorQraphqlRequest', () => {
  it('should render correctly', () => {
    render(
      <Providers>
        <EditorQraphqlRequest />
      </Providers>
    );
    const editor = screen.getByTestId('api-select');
    const customApiInput = screen.getByPlaceholderText('Enter Custom API URL');
    const customApi = screen.getByTestId('editor');
    const responce = screen.getByTestId('response');
    const executeButton = screen.getByTestId('execute-button');

    expect(editor).toBeInTheDocument();
    expect(customApiInput).toBeInTheDocument();
    expect(customApi).toBeInTheDocument();
    expect(responce).toBeInTheDocument();
    expect(executeButton).toBeInTheDocument();
  });

  it('should display an error toast when the API request fails', async () => {
    render(
      <Providers>
        <EditorQraphqlRequest />
      </Providers>
    );

    const executeButton = screen.getByTestId('execute-button');
    const toastErrorSpy = jest.spyOn(toast, 'error');

    fireEvent.click(executeButton);

    await waitFor(() => {
      expect(toastErrorSpy).toHaveBeenCalledWith('Please select an API endpoint');
    });
  });

  it('allows entering a custom API URL', () => {
    render(
      <Providers>
        <EditorQraphqlRequest />
      </Providers>
    );

    const customApiInput = screen.getByPlaceholderText('Enter Custom API URL');

    fireEvent.change(customApiInput, { target: { value: 'http://custom-api-url.com' } });

    expect(customApiInput).toHaveValue('http://custom-api-url.com');
  });

  it('find "enter query here" in editor', () => {
    render(
      <Providers>
        <EditorQraphqlRequest />
      </Providers>
    );
    const editorInput = screen.getByText(/Enter GraphQL query here/i);
    expect(editorInput).toBeInTheDocument();
  });

  it('change query in editor', () => {
    render(
      <Providers>
        <EditorQraphqlRequest />
      </Providers>
    );
    const editor = screen.getByTestId('editor');

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
    render(
      <Providers>
        <EditorQraphqlRequest />
      </Providers>
    );
    const executeButton = screen.getByTestId('execute-button');

    global.fetch = jest.fn().mockResolvedValue({
      status: 200,
      json: () => Promise.resolve({ data: 'mocked data' }),
    });

    fireEvent.click(executeButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });
  });

  it('allows selecting an API from the dropdown', async () => {
    render(
      <Providers>
        <EditorQraphqlRequest />
      </Providers>
    );
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
});
