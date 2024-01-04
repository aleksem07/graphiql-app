import { useLazyGetSchemaQuery } from '@/redux/api/api';
import { GraphQLSchema, buildClientSchema } from 'graphql';
import { Suspense, useEffect, useState, lazy } from 'react';
import Skeleton from '../skeleton/skeleton';
import { useAppDispatch } from '@/redux/hooks';
import { setUserUrl } from '@/redux/user/userSlice';
import { docsRequestEnum } from '@/app/graphql/editor';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { SerializedError } from '@reduxjs/toolkit/react';

type apiType = {
  url: string;
  request: docsRequestEnum;
};

export default function Documentation({ url, request }: apiType) {
  const [schema, setSchema] = useState<GraphQLSchema | null>();
  const [trigger, { data, isLoading, isError, error }] = useLazyGetSchemaQuery();
  const [schemaJSX, setSchemaJSX] = useState<JSX.Element | null>(null);
  const [ApiError, setApiError] = useState<FetchBaseQueryError | SerializedError | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (url) {
      dispatch(setUserUrl({ userUrl: url }));
      trigger();
      if (data && request === docsRequestEnum.print) {
        const PrintedSchema = lazy(() => import('../printedSchema/printedSchema'));
        const graphQLSchema = buildClientSchema(data);
        setSchemaJSX(<PrintedSchema graphQLSchema={graphQLSchema} />);
        setSchema(graphQLSchema);
      }
      if (data && request === docsRequestEnum.docs) {
        const Schema = lazy(() => import('../schema/schema'));
        const graphQLSchema = buildClientSchema(data);
        setSchemaJSX(<Schema graphQLSchema={graphQLSchema} />);
        setSchema(graphQLSchema);
      }
    }
  }, [url, data]);

  useEffect(() => {
    console.log(error);
    if (error) setApiError(error as FetchBaseQueryError | SerializedError);
  }, [error]);

  if (!url)
    return (
      <h3 className="absolute left-8 sm:static p-2 text-md font-semibold text-red-500">
        {'Please select an API'}
      </h3>
    );
  return (
    <section className="absolute left-8 z-10 sm:static max-w-[80vw] sm:w-1/4 sm:min-w-[200px] overflow-y-auto max-h-[80vh] border-l border-t border-gray-300 p-2 bg-white resize-x">
      <Suspense fallback={<Skeleton />}>
        {isLoading && <Skeleton />}
        {isError && ApiError && (
          <p className="p-2 text-md text-red-500">
            Error {'status' in ApiError ? ApiError.status : `: ${ApiError.message}`}
          </p>
        )}
        {isError && !ApiError && <p className="p-2 text-md text-red-500">Error occured</p>}
        {schema && schemaJSX}
      </Suspense>
    </section>
  );
}
