'use client';
import { useState } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-graphqlschema';
import { API_OPTIONS } from '@/common/api-path';
import { ToastContainer, toast } from 'react-toastify';
import Documentation from '@/components/documentation/documentation';
import { faFileText } from '@fortawesome/free-regular-svg-icons/faFileText';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const EditorQraphqlRequest = () => {
  const [query, setQuery] = useState('');
  const [getResponse, setResponse] = useState('');
  const [api, setApi] = useState('');
  const [isCustomApi, setIsCustomApi] = useState(true);
  const [isDocsOpened, setIsDocsOpened] = useState(false);

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

  const handleEditorChange = (value: string | undefined) => {
    if (value) {
      setQuery(value);
    } else {
      setQuery('');
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
        body: JSON.stringify({ query }),
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

  const handleDocsOpen = () => {
    setIsDocsOpened(!isDocsOpened);
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

      <div className="flex w-full flex-wrap sm:flex-nowrap relative">
        <div className="flex sm:justify-center items-start sm:h-full sm:px-2 pb-2 w-screen sm:w-fit h-fit">
          <button
            className="p-2 rounded border border-gray-300 hover:opacity-60 hover:bg-gray-200 cursor-pointer"
            onClick={handleDocsOpen}
          >
            <FontAwesomeIcon icon={faFileText} />
          </button>
        </div>
        {isDocsOpened && <Documentation url={api} />}
        <div className="grid grid-cols-2 w-full flex-1 gap-2 col-end-auto">
          <div className="flex-1" data-testid="editor">
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
              className="flex-1 border border-gray-300 rounded p-2 text-black"
              value={query}
              onChange={handleEditorChange}
            />

            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
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
      </div>
      <ToastContainer position="bottom-right" />
    </>
  );
};
