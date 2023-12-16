'use client';
import { useState } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-graphqlschema';
import { API_OPTIONS } from '@/common/api-path';

export const EditorQraphqlRequest = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [api, setApi] = useState('');
  const [isCustomApi, setIsCustomApi] = useState(true);

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
      const response = await fetch(api, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });
      const data = await response.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error(error);
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

      <div className="grid grid-cols-2 w-full flex-1 gap-2">
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
          <pre className="whitespace-pre-wrap">{response}</pre>
        </div>
      </div>
    </>
  );
};
