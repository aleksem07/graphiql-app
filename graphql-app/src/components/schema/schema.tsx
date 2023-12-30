import { useState } from 'react';
import {
  GraphQLField,
  GraphQLFieldMap,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
} from 'graphql/type';

export default function Schema({ graphQLSchema }: { graphQLSchema: GraphQLSchema }) {
  const [heading, setHeading] = useState<string>('Documentation');
  const [rootHeading, setRootHeading] = useState<string>('Root Types');
  const [docsDescription, setDocsDescription] = useState<string>(
    'A GraphQL schema provides a root type for each kind of operation.'
  );
  const [isFirstPage, setIsFirstPage] = useState<boolean>(true);
  const [typeData, setTypeData] = useState<[string, GraphQLField<unknown, unknown>][] | null>(null);
  console.log(graphQLSchema);
  const root = graphQLSchema.getQueryType()?.name;
  const typeMap = graphQLSchema.getTypeMap();
  const types: string[] = Object.keys(typeMap).filter(
    (key) => key !== root && !key.startsWith('__')
  );

  const handleTypeClick = (type: string) => {
    setHeading(type);
    const typeInfo = graphQLSchema.getType(type);
    setDocsDescription(typeInfo?.description ?? '');
    setRootHeading('');
    setIsFirstPage(false);
    setTypeData(null);
    console.log('type: ', type);
    const typeFields: GraphQLFieldMap<unknown, unknown> | null =
      typeInfo instanceof GraphQLObjectType ? typeInfo.getFields() : null;
    console.log(typeFields);
    if (typeFields) {
      const typeFieldsArray = Object.entries(typeFields).filter(([, value]) => {
        if (value) return true;
        if (Array.isArray(value) && (value as unknown[]).length) return true;
        if (typeof value === 'object' && Object.keys(value).length) return true;
        return false;
      });
      setTypeData(typeFieldsArray);
    }
  };

  const handleBack = () => {
    console.log('back');
  };

  return (
    <>
      <h3 className="text-md font-semibold mb-2 relative">
        {heading}
        <button
          className="text-sm p-1 border absolute right-0 hover:border-current"
          onClick={handleBack}
        >
          {`<-`}
        </button>
      </h3>
      <p className="text-sm mb-2">{docsDescription}</p>
      <h5 className="text-sm font-semibold">{rootHeading}</h5>
      {isFirstPage && root && (
        <>
          <p>
            query:{' '}
            <span className="text-orange-700 text-sm cursor-pointer hover:underline">{root}</span>
          </p>
          <h5 className="text-sm font-semibold">All Schema Types</h5>
        </>
      )}
      {isFirstPage &&
        types &&
        types.map((type) => (
          <p
            key={type}
            onClick={() => handleTypeClick(type)}
            className="text-orange-700 text-sm cursor-pointer hover:underline"
          >
            {type}
          </p>
        ))}
      {!isFirstPage &&
        typeData &&
        typeData.map(([key, value]) => {
          return (
            <div key={key}>
              <span
                className="text-blue-700 text-sm cursor-pointer hover:underline"
                onClick={() => console.log(key)}
              >
                {`${value.name}: `}
              </span>
              <span
                className="text-orange-700 text-sm cursor-pointer hover:underline"
                onClick={(e) =>
                  e.target instanceof HTMLSpanElement && e.target.textContent
                    ? handleTypeClick(e.target.textContent)
                    : null
                }
              >
                {value.type instanceof GraphQLList ? value.type.ofType.name : value.type.toString()}
              </span>
              <p className="text-xs text-gray-500 mt-1 mb-3">{value.description}</p>
            </div>
          );
        })}
    </>
  );
}
