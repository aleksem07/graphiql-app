import { useState } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-graphqlschema';
import { useAppDispatch } from '@/redux/hooks';
import { setVariables } from '@/redux/editor/editorSlice';

export const VariablesSection = () => {
  const dispatch = useAppDispatch();
  const DEFAULT_HEIGHT_VARIABLES_EDITOR = '0vh';
  const OPEN_HEIGHT_VARIABLES_EDITOR = '10vh';
  const [heightVariablesEditor, setHeightVariablesEditor] = useState(
    DEFAULT_HEIGHT_VARIABLES_EDITOR
  );

  const handleButtonChange = () => {
    if (heightVariablesEditor === DEFAULT_HEIGHT_VARIABLES_EDITOR) {
      setHeightVariablesEditor(OPEN_HEIGHT_VARIABLES_EDITOR);
    } else {
      setHeightVariablesEditor(DEFAULT_HEIGHT_VARIABLES_EDITOR);
    }
  };

  const handleVariablesChange = (value: string | undefined) => {
    if (value) {
      dispatch(setVariables({ variables: value }));
    } else {
      dispatch(setVariables({ variables: '' }));
    }
  };

  return (
    <div>
      <button className="hover:bg-gray-300 p-2" onClick={handleButtonChange}>
        Variables
      </button>

      <AceEditor
        setOptions={{
          showLineNumbers: true,
          tabSize: 2,
        }}
        placeholder="Enter your variables"
        mode="graphqlschema"
        width="100%"
        height={heightVariablesEditor}
        onChange={handleVariablesChange}
      />
    </div>
  );
};
