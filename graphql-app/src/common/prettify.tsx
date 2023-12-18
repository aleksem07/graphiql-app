type PrettifyProps = {
  query: string;
  setQuery: (query: string) => void;
};

export const Prettify = ({ query, setQuery }: PrettifyProps) => {
  const TAB_SIZE = 2;
  let indentation = 0;

  const handleIndentation = () => ' '.repeat(TAB_SIZE * indentation);

  const linesArr = query
    .split('')
    .map((item, index, array) => {
      if (item === '{' || item === '}') {
        if (item === '{' && array[index + 1] !== '\n') {
          return `${item}\n`;
        }
        if (item === '}' && array[index - 1] !== '\n') {
          return `\n${item}`;
        }
      }

      return item;
    })
    .join('')
    .split('\n');

  const lineWithoutSpace = linesArr.filter((item) => item.trim() !== '');

  const prettyLine = lineWithoutSpace
    .map((line) => {
      console.log(line);

      return `${handleIndentation()}${line.trim()}`
        .split('')
        .map((item, index, array) => {
          // console.log(array)
          if (item === '{') {
            indentation += 1;
            if (array[0] === '{') {
              return `${item.trim()}`;
            }
            if (item === '{' && array[index - 1] !== ' ') {
              return ` ${item}`;
            }
          }
          if (item === '}') {
            indentation -= 2;
            indentation < 0 ? (indentation = 0) : indentation;
          } else {
          }
          return item;
        })
        .join('');
    })
    .join('\n');

  console.log(prettyLine);

  const handleEditorChange = () => {
    const prettifyQuery = prettyLine;
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
