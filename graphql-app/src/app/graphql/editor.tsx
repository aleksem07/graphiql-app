'use client';
import { useContext, useState } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-graphqlschema';
import { API_OPTIONS } from '@/common/api-path';
import { ToastContainer, toast } from 'react-toastify';
import { EditorTools } from '@/components/editor-tools/editor-tools';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setQuery } from '@/redux/editor/editorSlice';
import { RootState } from '@/redux/store';
import { parseJson } from '@/common/parse-json';
import Documentation from '@/components/documentation/documentation';
import { faFileText } from '@fortawesome/free-regular-svg-icons/faFileText';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePowerpoint } from '@fortawesome/free-regular-svg-icons';

export enum docsRequestEnum {
  docs = 'docs',
  print = 'print',
}
import { LangContext } from '@/context/langContext';
import translation from '@/common/translation';

export const EditorQraphqlRequest = () => {
  const { language } = useContext(LangContext);
  const [getResponse, setResponse] = useState('');
  const [api, setApi] = useState('');
  const [isCustomApi, setIsCustomApi] = useState(true);
  const dispatch = useAppDispatch();
  const query = useAppSelector((state: RootState) => state.editorSlice.query);
  const variables = parseJson(
    useAppSelector((state: RootState) => state.editorSlice.variables) || '{}'
  );
  const headers = parseJson(
    useAppSelector((state: RootState) => state.editorSlice.headers) || '{}'
  );
  const [isDocsOpened, setIsDocsOpened] = useState(false);
  const [docsRequest, setDocsRequest] = useState<docsRequestEnum>(docsRequestEnum.docs);

  const handleCustomApiChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isCustomApi) {
      setApi(event.target.value);
      setIsDocsOpened(false);
    }
  };

  const handleApiChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedApi = event.target.value;
    if (selectedApi === '') {
      setIsCustomApi(true);
      setApi('');
    } else {
      setIsCustomApi(false);
      setApi(selectedApi);
    }
    setIsDocsOpened(false);
  };

  const handleEditorChange = (value: string | undefined) => {
    if (value) {
      dispatch(setQuery({ query: value }));
    } else {
      dispatch(setQuery({ query: '' }));
    }
  };

  const executeQuery = async () => {
    try {
      if (!api) {
        toast.error(translation.error.selectApi[language]);
        setResponse('');
      }

      if (!query) {
        toast.error(translation.error.noQuery[language]);
        setResponse('');
      }

      const response = await fetch(api, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: JSON.stringify({ query, variables }),
      });

      if (!response.ok) {
        const data = await response.json();
        const errorCode = await response.status;
        const errorMessage = data.errors
          .map((error: { message: string }) => error.message)
          .join(', ');
        toast.error(`${translation.error.statusCode[language]} ${errorCode}\n${errorMessage}`);
        setResponse(JSON.stringify(data, null, 2));
        return;
      }

      const data = await response.json();
      setResponse(JSON.stringify(data, null, 2));
      toast.success(translation.editor.querySuccess[language]);
    } catch (error) {
      if (error instanceof Error) {
        setResponse(error.message);
        toast.error(error.message);
      } else {
        toast.error(translation.error.unexpectedError[language]);
        console.error(error);
      }
    }
  };
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && event.ctrlKey) {
      executeQuery();
    }
  };

  const handleDocsOpen = (button: docsRequestEnum) => {
    setIsDocsOpened(!isDocsOpened);
    setDocsRequest(button);
  };

  return (
    <>
      <div className="w-full my-2" data-testid="api-select">
        <select
          className="w-full border border-gray-300 rounded p-2 text-black"
          onChange={handleApiChange}
          value={api}
        >
          {API_OPTIONS.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        {isCustomApi && (
          <input
            className="w-full border border-gray-300 rounded p-2 text-black mt-2"
            type="text"
            placeholder={translation.editor.customApi[language]}
            value={api}
            onChange={handleCustomApiChange}
          />
        )}
      </div>

      <div className="flex w-full flex-wrap sm:flex-nowrap relative content-start">
        <div className="flex flex-wrap gap-1 sm:justify-center items-start sm:h-full pb-2 w-screen sm:w-fit h-fit">
          <button
            className="p-2 rounded border border-gray-300 hover:opacity-60 hover:bg-gray-200 cursor-pointer"
            title="Show documentation"
            onClick={() => handleDocsOpen(docsRequestEnum.docs)}
          >
            <FontAwesomeIcon icon={faFileText} />
          </button>
          <button
            className="p-2 rounded border border-gray-300 hover:opacity-60 hover:bg-gray-200 cursor-pointer"
            title="Print schema"
            onClick={() => handleDocsOpen(docsRequestEnum.print)}
          >
            <FontAwesomeIcon icon={faFilePowerpoint} />
          </button>
        </div>
        {isDocsOpened && <Documentation url={api} request={docsRequest} />}
        <div className="grid grid-cols-2 w-full gap-2 pb-2 col-end-auto">
          <div className="flex flex-col" data-testid="editor" onKeyDown={handleKeyDown}>
            <AceEditor
              fontSize={14}
              setOptions={{
                showLineNumbers: true,
                tabSize: 2,
              }}
              placeholder={translation.editor.enterGraphqlQuery[language]}
              width="100%"
              height="60vh"
              mode="graphqlschema"
              className="flex-1 border border-gray-300 rounded text-black min-h-[50vh] sm:min-h-[60vh]"
              value={query}
              onChange={handleEditorChange}
            />

            <EditorTools />

            <button
              className="bg-slate-700 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded"
              onClick={executeQuery}
              data-testid="execute-button"
            >
              {translation.editor.executeQuery[language]}
            </button>
          </div>

          <div className="flex-1 p-2 bg-gray-200 rounded" data-testid="response">
            <pre className="whitespace-pre-wrap">{getResponse}</pre>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </>
  );
};
