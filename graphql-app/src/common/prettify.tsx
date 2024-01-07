import { useContext } from 'react';
import { LangContext } from '@/context/langContext';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { setQuery } from '@/redux/editor/editorSlice';
import { RootState } from '@/redux/store';
import { toast } from 'react-toastify';
import translation from './translation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCode } from '@fortawesome/free-regular-svg-icons/faFileCode';

export const Prettify = () => {
  const { language } = useContext(LangContext);
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

  const prettyLines = lineWithoutSpace?.map((line, index, array) => {
    return line
      .trim()
      .split('')
      .map((item, itemIndex) => {
        switch (item) {
          case '{':
            indentation += 1;
            if (index === 0 && itemIndex === 0) {
              return `${item}\n`;
            }
            if (
              array[index - 1] &&
              array[index - 1].includes('(') &&
              !array[index - 1].includes(')')
            ) {
              return `${item}`;
            }
            return ` ${item}\n`;
          case '}':
            indentation -= 1;
            indentation < 0 ? (indentation = 0) : indentation;
            if (array[index - 1] && array[index - 1].includes('}')) {
              return `${handleIndentation()}${item}\n`;
            }
            if (array[index + 1] && array[index + 1].includes(')')) {
              return `${item}`;
            }
            return `\n${handleIndentation()}${item}\n`;
          default:
            if (
              array[index - 1] &&
              (array[index - 1].includes('{') || array[index - 1].includes('}')) &&
              itemIndex === 0
            ) {
              return `${handleIndentation()}${item}`;
            }
            if (item === ',' || item === ':') {
              return `${item} `;
            }
            return item;
        }
      })
      .join('');
  });

  const handleEditorChange = () => {
    const openingBracesCount = (query?.match(/{/g) || []).length;
    const closingBracesCount = (query?.match(/}/g) || []).length;
    const openingParenthesesCount = (query?.match(/\(/g) || []).length;
    const closingParenthesesCount = (query?.match(/\)/g) || []).length;
    const openingSquareBracketsCount = (query?.match(/\[/g) || []).length;
    const closingSquareBracketsCount = (query?.match(/]/g) || []).length;

    if (
      openingBracesCount !== closingBracesCount ||
      openingParenthesesCount !== closingParenthesesCount ||
      openingSquareBracketsCount !== closingSquareBracketsCount
    ) {
      toast.error(translation.error.prettifyError[language]);
      return null;
    }

    const prettifyQuery = prettyLines?.join('');
    dispatch(setQuery({ query: prettifyQuery }));
    toast.success(translation.editor.prettifyCompleted[language]);
  };

  return (
    <button
      className="p-2 rounded border border-gray-300 hover:opacity-60 hover:bg-gray-200 cursor-pointer"
      title={translation.editor.prettifyTitle[language]}
      type="button"
      data-testid="prettify-button"
      onClick={handleEditorChange}
    >
      <FontAwesomeIcon icon={faFileCode} />
    </button>
  );
};
