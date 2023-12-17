type PrettifyProps = {
  query: string;
  setQuery: (query: string) => void;
};

export const Prettify = ({ query, setQuery }: PrettifyProps) => {
  const handleEditorChange = () => {
    const prettifyQuery = query
      .trim()
      .toLowerCase()
      .split('')
      .map((item, index, array) => {
        if (item === '{' || item === '}') {
          if (item === '{' && array[index + 1] !== '\n') {
            return `${item}\n  `;
          }
          if (item === '}' && array[index - 1] !== '\n') {
            return `\n${item}`;
          }
        }

        return item;
      })
      .join('');

    setQuery(prettifyQuery);
  };

  return (
    <>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={handleEditorChange}
      >
        Prettify
      </button>
    </>
  );
};
