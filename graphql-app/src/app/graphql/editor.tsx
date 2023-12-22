'use client';
import { useState, useEffect } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-graphqlschema';
import { API_OPTIONS } from '@/common/api-path';
import { ToastContainer, toast } from 'react-toastify';
import { EditorTools } from '@/components/editor-tools/editor-tools';
import { useAppDispatch } from '@/redux/hooks';
import { setQuery } from '@/redux/editor/editorSlice';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export const EditorQraphqlRequest = () => {
  const [fetchQuery, setFetchQuery] = useState('');
  const [getResponse, setResponse] = useState('');
  const [api, setApi] = useState('');
  const [isCustomApi, setIsCustomApi] = useState(true);
  const dispatch = useAppDispatch();
  const query = useSelector((state: RootState) => state.editorSlice.query);

  const handleCustomApiChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isCustomApi) {
      setApi(event.target.value);
    }
  };

  const handleApiChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedApi = event.target.value;
    if (selectedApi === '') {
      setIsCustomApi(true);
      setApi('');
    } else {
      setIsCustomApi(false);
      setApi(selectedApi);
    }
  };

  useEffect(() => {
    setFetchQuery(query);
  }, [query]);

  const handleEditorChange = (value: string | undefined) => {
    if (value) {
      dispatch(setQuery({ query: value }));
    } else {
      dispatch(setQuery({ query: '' }));
    }
  };

  const executeQuery = async () => {
    try {
      if (!api) {
        toast.error('Please select an API endpoint');
        setResponse('');
      }

      if (!query) {
        toast.error('Please enter a query');
        setResponse('');
      }

      const response = await fetch(api, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: fetchQuery }),
      });

      if (!response.ok) {
        const data = await response.json();
        const errorCode = await response.status;
        const errorMessage = data.errors
          .map((error: { message: string }) => error.message)
          .join(', ');
        toast.error(`status code ${errorCode}\n${errorMessage}`);
        setResponse(JSON.stringify(data, null, 2));
        return;
      }

      if (response.status === 200) {
        const data = await response.json();
        setResponse(JSON.stringify(data, null, 2));
        toast.success('Query executed successfully');
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('An unexpected error occurred');
        console.error(error);
      }
    }
  };
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && event.ctrlKey) {
      executeQuery();
    }
  };

  return (
    <>
      <div className="w-full my-2" data-testid="api-select">
        <select
          className="w-full border border-gray-300 rounded p-2 text-black"
          onChange={handleApiChange}
          value={api}
        >
          {API_OPTIONS.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        {isCustomApi && (
          <input
            className="w-full border border-gray-300 rounded p-2 text-black mt-2"
            type="text"
            placeholder="Enter Custom API URL"
            value={api}
            onChange={handleCustomApiChange}
          />
        )}
      </div>

      <div className="grid grid-cols-2 w-full flex-1 gap-2 pb-2">
        <div className="flex flex-col" data-testid="editor" onKeyDown={handleKeyDown}>
          <AceEditor
            fontSize={14}
            setOptions={{
              showLineNumbers: true,
              tabSize: 2,
            }}
            placeholder="Enter GraphQL query here"
            width="100%"
            height="60vh"
            mode="graphqlschema"
            className="flex-1 border border-gray-300 rounded text-black"
            value={query}
            onChange={handleEditorChange}
          />

          <EditorTools />

          <button
            className="bg-slate-700 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded"
            onClick={executeQuery}
            data-testid="execute-button"
          >
            Execute Query
          </button>
        </div>

        <div className="flex-1 p-2 bg-gray-200 rounded" data-testid="response">
          <pre className="whitespace-pre-wrap">{getResponse}</pre>
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </>
  );
};
