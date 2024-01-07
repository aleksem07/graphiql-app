import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { setQuery } from '@/redux/editor/editorSlice';
import { RootState } from '@/redux/store';
import { toast } from 'react-toastify';

export const Prettify = () => {
  const dispatch = useAppDispatch();
  const query = useAppSelector((state: RootState) => state.editorSlice.query);
  const TAB_SIZE = 2;
  let indentation = 0;

  const handleIndentation = () => ' '.repeat(TAB_SIZE * indentation);

  const regex = /(\{|\}|\s(?!\{)(?<!:))/g;
  const linesArr = query?.split(regex).filter((item) => item.trim() !== '');

  const lineWithoutSpace = linesArr
    ?.map((item, index, array) => {
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

  const prettyLines = lineWithoutSpace?.map((line) => {
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
    ?.filter((item) => item.trim() === '}')
    .map((item, i) => (i === 0 ? `\n${item.slice(TAB_SIZE)}` : item.slice(TAB_SIZE)))
    .join('\n');
  const prettyLinesWithoutClosedBrackets = prettyLines
    ?.filter((item) => item.trim() !== '}')
    .join('\n');

  const handleEditorChange = () => {
    const prettifyQuery = prettyLinesWithoutClosedBrackets?.concat(closedBracketsPretty || '');
    dispatch(setQuery({ query: prettifyQuery }));
    toast.success('Prettified successfully!');
  };

  return (
    <button
      type="button"
      data-testid="prettify-button"
      className="hover:bg-gray-300 py-2 px-4 mt-4"
      onClick={handleEditorChange}
    >
      P
    </button>
  );
};
