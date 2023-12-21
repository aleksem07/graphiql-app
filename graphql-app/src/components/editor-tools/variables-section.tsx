import { useState } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-graphqlschema';

export const VariablesSection = () => {
  const DEFAULT_HEIGHT_VARIABLES_ACE_EDITOR = '0vh';
  const OPEN_HEIGHT_VARIABLES_ACE_EDITOR = '10vh';
  const [heightVariablesAceEditor, setHeightVariablesAceEditor] = useState(
    DEFAULT_HEIGHT_VARIABLES_ACE_EDITOR
  );

  const handleVariablesChange = () => {
    if (heightVariablesAceEditor === DEFAULT_HEIGHT_VARIABLES_ACE_EDITOR) {
      setHeightVariablesAceEditor(OPEN_HEIGHT_VARIABLES_ACE_EDITOR);
    } else {
      setHeightVariablesAceEditor(DEFAULT_HEIGHT_VARIABLES_ACE_EDITOR);
    }
  };

  return (
    <div>
      <button className="hover:bg-gray-300 p-2" onClick={handleVariablesChange}>
        Variables
      </button>

      <AceEditor
        placeholder="Enter your variables"
        mode="graphqlschema"
        width="100%"
        height={heightVariablesAceEditor}
      />
    </div>
  );
};
