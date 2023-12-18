import { Suspense } from 'react';

type apiType = {
  api: string;
};

export default function Documentation({ api }: apiType) {
  console.log(api);
  return (
    <section className="max-w-xs">
      <h3 className="text-md font-semibold mb-2">Documentation</h3>
      <p className="text-sm mb-2">
        A GraphQL schema provides a root type for each kind of operation.
      </p>
      <h5 className="text-sm font-semibold">Root Types</h5>
      <Suspense fallback={<p>Loading...</p>}></Suspense>
    </section>
  );
}
