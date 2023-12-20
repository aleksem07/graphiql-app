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
      if (item === ' ' && array[index + 1] !== '{' && !array[index - 1].includes(':')) {
        return `\n${item}`;
      }

      return item;
    })
    .join('')
    .split('\n')
    .filter((item) => item.trim() !== '');

  const lineWithoutSpace = linesArr
    .map((item, index, array) => {
      if (item.trim().at(-1) === ':') {
        const newValue = `${item.concat(array[index + 1].trim())}`;
        array[index + 1] = ' ';
        return newValue;
      } else if (array[index + 1] && array[index + 1].trim().at(0) === ':') {
        item = item.trim().replace(':', '');
        const newValue = `${item}: ${array[index + 1].trim().replace(':', '')} `;
        array[index + 1] = ' ';
        return newValue;
      } else {
        return item;
      }
    })
    .filter((item) => item.trim() !== '');

  const prettyLines = lineWithoutSpace.map((line) => {
    return `${handleIndentation()}${line.trim()}`
      .split('')
      .map((item, index, array) => {
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
          indentation -= 1;
          indentation < 0 ? (indentation = 0) : indentation;
        }

        return item;
      })
      .join('');
  });

  const closedBracketsPretty = prettyLines
    .filter((item) => item.trim() === '}')
    .map((item, i) => (i === 0 ? `\n${item.slice(TAB_SIZE)}` : item.slice(TAB_SIZE)))
    .join('\n');
  const prettyLinesWithoutClosedBrackets = prettyLines
    .filter((item) => item.trim() !== '}')
    .join('\n');

  const handleEditorChange = () => {
    const prettifyQuery = prettyLinesWithoutClosedBrackets.concat(closedBracketsPretty);
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
