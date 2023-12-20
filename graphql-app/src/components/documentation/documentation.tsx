import { useLazyGetSchemaQuery } from '@/redux/api/api';
import { buildClientSchema } from 'graphql';
import { Suspense, useEffect, useState } from 'react';

type apiType = {
  url: string;
};

export default function Documentation({ url }: apiType) {
  const [rootName, setRootName] = useState<string | null>(null);
  const [schemaTypes, setSchemaTypes] = useState<string[] | null>(null);
  const [trigger, { data, isLoading, isError }] = useLazyGetSchemaQuery();

  useEffect(() => {
    if (url) {
      trigger();
      if (data) {
        const graphQLSchema = buildClientSchema(data);
        console.log(graphQLSchema);
        const root = graphQLSchema.getQueryType()?.name;
        setRootName(root ?? null);
        const typeMap = graphQLSchema.getTypeMap();
        console.log(typeMap);
        const types = Object.keys(typeMap).filter((key) => !key.startsWith('__') && key !== root);
        console.log(types);
        setSchemaTypes(types);
      }
    }
  }, [url, data]);

  if (!url) return <h3 className="text-md text-red-500">Please select an API</h3>;

  return (
    <section className="max-w-[30%]">
      <h3 className="text-md font-semibold mb-2">Documentation</h3>
      <p className="text-sm mb-2">
        A GraphQL schema provides a root type for each kind of operation.
      </p>
      <h5 className="text-sm font-semibold">Root Types</h5>
      <Suspense fallback={<p>Loading...</p>}>
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error...</p>}
        {rootName && <p>query: {rootName}</p>}
        <h5 className="text-sm font-semibold">All Schema Types</h5>
        {schemaTypes && schemaTypes.map((type) => <p key={type}>{type}</p>)}
      </Suspense>
    </section>
  );
}
