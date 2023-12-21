import { useState } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-graphqlschema';

export const VariablesSection = () => {
  const DEFAULT_HEIGHT_VARIABLES_EDITOR = '0vh';
  const OPEN_HEIGHT_VARIABLES_EDITOR = '10vh';
  const [heightVariablesEditor, setHeightVariablesEditor] = useState(
    DEFAULT_HEIGHT_VARIABLES_EDITOR
  );

  const handleVariablesChange = () => {
    if (heightVariablesEditor === DEFAULT_HEIGHT_VARIABLES_EDITOR) {
      setHeightVariablesEditor(OPEN_HEIGHT_VARIABLES_EDITOR);
    } else {
      setHeightVariablesEditor(DEFAULT_HEIGHT_VARIABLES_EDITOR);
    }
  };

  return (
    <div>
      <button className="hover:bg-gray-300 p-2" onClick={handleVariablesChange}>
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
      />
    </div>
  );
};
