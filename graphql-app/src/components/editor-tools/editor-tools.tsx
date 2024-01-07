'use client';
import { useContext, useState } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-graphqlschema';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';
import { setHeaders, setVariables } from '@/redux/editor/editorSlice';
import { LangContext } from '@/context/langContext';
import translation from '@/common/translation';

export const EditorTools = () => {
  const { language } = useContext(LangContext);
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isVariables, setIsVariables] = useState(false);
  const [isHeaders, setIsHeaders] = useState(false);
  const CLOSE_EDITOR_TOOLS = '0vh';
  const OPEN_EDITOR_TOOLS = '15vh';
  const BUTTONS = [
    {
      name: translation.editor.variables[language],
      id: 'variables',
      className: `border-r-2 ${isVariables && isOpen ? 'bg-gray-300' : ''}`,
    },
    {
      name: translation.editor.headers[language],
      id: 'headers',
      className: `border-r-2 ${isHeaders && isOpen ? 'bg-gray-300' : ''}`,
    },
    {
      name: isOpen ? translation.editor.hide[language] : translation.editor.show[language],
      id: 'show-hide',
      className: 'float-right',
    },
  ];
  const variables = useAppSelector((state: RootState) => state.editorSlice.variables);
  const headers = useAppSelector((state: RootState) => state.editorSlice.headers);

  const heightVariablesEditor = isOpen ? OPEN_EDITOR_TOOLS : CLOSE_EDITOR_TOOLS;

  const buttonHandlers: Record<string, () => void> = {
    variables: () => {
      setIsOpen(true);
      setIsVariables(true);
      setIsHeaders(false);
    },
    headers: () => {
      setIsOpen(true);
      setIsHeaders(true);
      setIsVariables(false);
    },
    'show-hide': () => {
      setIsOpen(!isOpen);
      !isHeaders && setIsVariables(true);
    },
  };

  const handleButtonChange = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    const buttonId = evt.currentTarget.id;
    const buttonHandler = buttonHandlers[buttonId];
    if (buttonHandler) {
      buttonHandler();
    }
  };

  const handleEditorChange = (value: string | undefined) => {
    const dispatchValue = value ? value : '';
    dispatch(
      isVariables
        ? setVariables({ variables: dispatchValue })
        : setHeaders({ headers: dispatchValue })
    );
  };

  return (
    <div>
      {BUTTONS.map((button) => (
        <button
          type="button"
          id={button.id}
          key={button.id}
          data-testid={`${button.id}-button`}
          className={`hover:bg-gray-300 p-2 ${button.className}`}
          onClick={(evt) => {
            handleButtonChange(evt);
          }}
        >
          {button.name}
        </button>
      ))}

      <AceEditor
        name="variables-editor"
        setOptions={{
          showLineNumbers: true,
          tabSize: 2,
        }}
        placeholder={`Enter your ${isVariables ? 'variables' : 'headers'} here`}
        mode="graphqlschema"
        width="100%"
        height={heightVariablesEditor}
        onChange={handleEditorChange}
        value={isVariables ? variables : isHeaders ? headers : ''}
      />
    </div>
  );
};
