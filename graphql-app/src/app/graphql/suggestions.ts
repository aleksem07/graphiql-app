import * as Monaco from 'monaco-editor/esm/vs/editor/editor.api';

export const Suggestions = (monaco: typeof Monaco) => {
  monaco.languages.registerCompletionItemProvider('graphql', {
    provideCompletionItems: (model, position) => {
      const line = position.lineNumber;
      const column = position.column;

      const suggestions = [
        {
          label: 'getCharacterNameFromRickAndMorty',
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: 'query {\n\tcharacters {\n\t\tresults {\n\t\t\tname\n\t\t}\n\t}\n}',
          range: {
            startLineNumber: line,
            endLineNumber: line,
            startColumn: column,
            endColumn: column,
          },
          sortText: 'getCharacterNameFromRickAndMorty',
        },
      ];

      const completionList = {
        suggestions: suggestions.map((suggestion) => ({
          label: suggestion.label,
          kind: suggestion.kind,
          insertText: suggestion.insertText,
          range: suggestion.range,
          sortText: suggestion.sortText,
        })),
      };

      return completionList;
    },
  });
};
