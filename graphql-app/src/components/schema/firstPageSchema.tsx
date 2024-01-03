import { GraphQLSchema } from 'graphql/type';

type FirstPageProps = {
  graphQLSchema: GraphQLSchema;
  handleTypeClick: (type: string) => void;
};

export default function FirstPageSchema({ graphQLSchema, handleTypeClick }: FirstPageProps) {
  const root = graphQLSchema.getQueryType()?.name;
  const typeMap = graphQLSchema.getTypeMap();
  const types: string[] = Object.keys(typeMap).filter(
    (key) => key !== root && !key.startsWith('__')
  );

  return (
    <>
      <h3 className="text-md font-semibold mb-2 relative">{'Documentation'}</h3>
      <p className="text-sm mb-2">
        {'A GraphQL schema provides a root type for each kind of operation.'}
      </p>
      <h5 className="text-sm font-semibold">{'Root Types'}</h5>
      {root && (
        <>
          <p className="text-blue-700 inline text-sm">query: </p>
          <span
            className="text-orange-700 text-sm cursor-pointer hover:underline"
            onClick={() => handleTypeClick(root)}
          >
            {root}
          </span>
          <h5 className="text-sm font-semibold">All Schema Types</h5>
        </>
      )}
      {types &&
        types.map((type) => (
          <p
            key={type}
            onClick={() => handleTypeClick(type)}
            className="text-orange-700 text-sm cursor-pointer hover:underline"
          >
            {type}
          </p>
        ))}
    </>
  );
}
