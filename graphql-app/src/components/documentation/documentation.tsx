import { useLazyGetSchemaQuery } from '@/redux/api/api';
import { GraphQLSchema, buildClientSchema } from 'graphql';
import { Suspense, useEffect, useState, lazy } from 'react';
// import Schema from '../schema/schema';
import Skeleton from '../skeleton/skeleton';
import { useAppDispatch } from '@/redux/hooks';
import { setUserUrl } from '@/redux/user/userSlice';

type apiType = {
  url: string;
};

export default function Documentation({ url }: apiType) {
  const [schema, setSchema] = useState<GraphQLSchema | null>();
  const [trigger, { data, isLoading, isError }] = useLazyGetSchemaQuery();
  const [schemaJSX, setSchemaJSX] = useState<JSX.Element | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (url) {
      dispatch(setUserUrl({ userUrl: url }));
      trigger();
      if (data) {
        const PrintedSchema = lazy(() => import('../printedSchema/printedSchema'));
        const graphQLSchema = buildClientSchema(data);
        setSchemaJSX(<PrintedSchema graphQLSchema={graphQLSchema} />);
        setSchema(graphQLSchema);
      }
    }
  }, [url, data]);

  if (!url)
    return (
      <h3 className="absolute left-8 sm:static p-2 text-md font-semibold text-red-500">
        Please select an API
      </h3>
    );

  return (
    <section className="absolute left-8 z-10 sm:static max-w-[80vw] sm:w-1/4 sm:min-w-[200px] overflow-scroll max-h-[80vh] border-l border-t border-gray-300 p-2 bg-white">
      <Suspense fallback={<Skeleton />}>
        {isLoading && <Skeleton />}
        {isError && <p className="p-2 text-md text-red-500">Error...</p>}
        {/* {schema && <Schema graphQLSchema={schema} />} */}
        {schema && schemaJSX}
      </Suspense>
    </section>
  );
}
