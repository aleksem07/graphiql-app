import { useEffect, useState } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-graphqlschema';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';
import { setHeaders, setVariables } from '@/redux/editor/editorSlice';

export const EditorTools = () => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isVariables, setIsVariables] = useState(false);
  const [isHeaders, setIsHeaders] = useState(false);
  const CLOSE_EDITOR_TOOLS = '0vh';
  const OPEN_EDITOR_TOOLS = '15vh';
  const [heightVariablesEditor, setHeightEditorTools] = useState(CLOSE_EDITOR_TOOLS);
  const BUTTONS = [
    { name: 'Variables', id: 'variables', className: 'border-r-2' },
    { name: 'Headers', id: 'headers', className: 'border-r-2' },
    { name: isOpen ? 'Hide' : 'Show', id: 'show-hide', className: 'float-right' },
  ];
  const variables = useAppSelector((state: RootState) => state.editorSlice.variables);
  const headers = useAppSelector((state: RootState) => state.editorSlice.headers);

  useEffect(() => {
    if (isOpen) {
      setHeightEditorTools(OPEN_EDITOR_TOOLS);
    } else {
      setHeightEditorTools(CLOSE_EDITOR_TOOLS);
    }
  }, [isOpen]);

  const handleButtonChange = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    switch (evt.currentTarget.id) {
      case 'variables': {
        setIsOpen(true);
        setIsVariables(true);
        setIsHeaders(false);
        break;
      }
      case 'headers': {
        setIsOpen(true);
        setIsHeaders(true);
        setIsVariables(false);
        break;
      }
      case 'show-hide': {
        setIsOpen(!isOpen);
        !isHeaders && setIsVariables(true);
        break;
      }
      default: {
        return;
      }
    }
  };

  const handleEditorChange = (value: string | undefined) => {
    if (value) {
      if (isVariables) {
        dispatch(setVariables({ variables: value }));
      } else if (isHeaders) {
        dispatch(setHeaders({ headers: value }));
      }
    } else {
      if (isVariables) {
        dispatch(setVariables({ variables: '' }));
      } else if (isHeaders) {
        dispatch(setHeaders({ headers: '' }));
      }
    }
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
