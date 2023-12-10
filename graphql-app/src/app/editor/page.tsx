'use client';
import { useState } from 'react';

export default function EditorPage() {
  const API_LIST = {
    POKEMON: 'https://graphql-pokemon2.vercel.app/api',
    STARWARS: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
  };
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [api, setApi] = useState(API_LIST.STARWARS);

  const handleQueryKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      executeQuery();
    }
    if (event.key === 'Escape') {
      setQuery('');
    }
  };

  const handleApiChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setApi(event.target.value);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuery(event.target.value);
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
    <main className="flex-1 flex flex-col gap-2 m-2">
      <div className="w-full">
        <select
          className="w-full border border-gray-300 rounded p-2 text-black"
          onChange={handleApiChange}
          value={api}
        >
          <option value={API_LIST.STARWARS}>Star Wars</option>
          <option value={API_LIST.POKEMON}>Pokemon</option>
          <option value="">Other...</option>
        </select>
      </div>
      <div className="grid grid-cols-2 w-full flex-1 gap-2">
        <div className="flex-1 flex-col">
          <textarea
            className="flex-1 border border-gray-300 rounded p-2 text-black"
            value={query}
            onChange={handleQueryChange}
            placeholder="Enter your GraphQL query here"
            style={{ width: '100%', height: '200px', marginBottom: '10px' }}
            onKeyDown={handleQueryKeyDown}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={executeQuery}
          >
            Execute Query
          </button>
        </div>
        <div className="flex-1 border-2 border-solid border-white p-2">
          <pre className="whitespace-pre-wrap">{response}</pre>
        </div>
      </div>
    </main>
  );
}
