'use client';
import { useState, useRef } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import * as Monaco from 'monaco-editor/esm/vs/editor/editor.api';

export default function EditorPage() {
  const editorRef = useRef<Monaco.editor.IStandaloneCodeEditor | null>(null);
  const API_LIST = {
    POKEMON: 'https://graphql-pokemon2.vercel.app/api',
    STARWARS: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
    RICK_AND_MORTY: 'https://rickandmortyapi.com/graphql',
    CUSTOM: '',
  };
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [api, setApi] = useState(API_LIST.CUSTOM);
  const [isCustomApi, setIsCustomApi] = useState(true);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    editor.focus();
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      executeQuery();
    });
    editor.addCommand(monaco.KeyCode.Escape, () => {
      setQuery('');
    });
  };

  const handleCustomApiChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isCustomApi) {
      setApi(event.target.value);
    }
  };

  const handleApiChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedApi = event.target.value;
    if (selectedApi === API_LIST.CUSTOM) {
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
    if (!editorRef.current) {
      return;
    }

    try {
      const queryValue = editorRef.current.getValue();
      const response = await fetch(api, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: queryValue }),
      });
      const data = await response.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="flex-1 flex flex-col gap-2 m-2">
      <div className="w-full">
        <select
          className="w-full border border-gray-300 rounded p-2 text-black"
          onChange={handleApiChange}
          value={api}
        >
          <option value={API_LIST.CUSTOM}>Custom API</option>
          <option value={API_LIST.RICK_AND_MORTY}>Rick and Morty</option>
          <option value={API_LIST.STARWARS}>Star Wars</option>
          <option value={API_LIST.POKEMON}>Pokemon</option>
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
        <div className="flex-1 flex-col">
          <Editor
            height="60vh"
            language="graphql"
            className="flex-1 border border-gray-300 rounded p-2 text-black"
            value={query}
            onChange={handleEditorChange}
            onMount={handleEditorDidMount}
            options={{
              minimap: {
                enabled: false,
              },
            }}
          />

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={executeQuery}
          >
            Execute Query
          </button>
        </div>

        <div className="flex-1 p-2 bg-gray-200 rounded">
          <pre className="whitespace-pre-wrap">{response}</pre>
        </div>
      </div>
    </main>
  );
}
