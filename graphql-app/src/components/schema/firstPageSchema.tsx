'use client';
import translation from '@/common/translation';
import { LangContext } from '@/context/langContext';
import { GraphQLSchema } from 'graphql/type';
import { useContext } from 'react';

type FirstPageProps = {
  graphQLSchema: GraphQLSchema;
  handleTypeClick: (type: string) => void;
};

export default function FirstPageSchema({ graphQLSchema, handleTypeClick }: FirstPageProps) {
  const { language } = useContext(LangContext);

  const root = graphQLSchema.getQueryType()?.name;
  const typeMap = graphQLSchema.getTypeMap();
  const types: string[] = Object.keys(typeMap).filter(
    (key) => key !== root && !key.startsWith('__')
  );

  return (
    <>
      <h3 className="text-md font-semibold mb-2 relative">
        {translation.documentation.documentation[language]}
      </h3>
      <p className="text-sm mb-2">{translation.documentation.description[language]}</p>
      <h5 className="text-sm font-semibold">{translation.documentation.rootTypes[language]}</h5>
      {root && (
        <>
          <p className="text-blue-700 inline text-sm">query: </p>
          <span
            className="text-orange-700 text-sm cursor-pointer hover:underline"
            onClick={() => handleTypeClick(root)}
          >
            {root}
          </span>
          <h5 className="text-sm font-semibold">
            {translation.documentation.allSchemaType[language]}
          </h5>
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
