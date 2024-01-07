import { useState } from 'react';
import {
  GraphQLEnumType,
  GraphQLEnumValue,
  GraphQLField,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
} from 'graphql/type';
import FirstPageSchema from './firstPageSchema';

export default function Schema({ graphQLSchema }: { graphQLSchema: GraphQLSchema }) {
  const [heading, setHeading] = useState<string | null>(null);
  const [docsDescription, setDocsDescription] = useState<string>(
    'A GraphQL schema provides a root type for each kind of operation.'
  );
  const [isFirstPage, setIsFirstPage] = useState<boolean>(true);
  const [typeData, setTypeData] = useState<[string, GraphQLField<unknown, unknown>][] | null>(null);
  const [values, setValues] = useState<readonly GraphQLEnumValue[] | null>(null);
  const [history, setHistory] = useState<string[]>([]);

  const handleTypeClick = (type: string, isBack: boolean = false) => {
    if (!isBack && typeof heading === 'string') setHistory([...history, heading]);
    const cleanedType = type.replace(/[\[\]:! ]/g, '');
    setHeading(cleanedType);
    const typeInfo = graphQLSchema.getType(cleanedType);
    setDocsDescription(typeInfo?.description ?? '');
    setIsFirstPage(false);
    setTypeData(null);
    const typeFields =
      typeInfo instanceof GraphQLObjectType || typeInfo instanceof GraphQLInputObjectType
        ? typeInfo.getFields()
        : null;
    setValues(typeInfo instanceof GraphQLEnumType ? typeInfo.getValues() : null);
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
    const type: string | undefined = history[history.length - 1];
    if (history.length) {
      setHistory(history.slice(0, -1));
      handleTypeClick(type, true);
    } else {
      setIsFirstPage(true);
      setHeading(null);
    }
  };

  return (
    <>
      {isFirstPage && (
        <FirstPageSchema graphQLSchema={graphQLSchema} handleTypeClick={handleTypeClick} />
      )}
      {!isFirstPage && (
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
        </>
      )}
      {!isFirstPage &&
        typeData &&
        typeData.map(([key, value]) => {
          return (
            <div key={key} className="text-sm">
              <span className="text-blue-700">{`${value.name}`}</span>
              {value.args && value.args.length > 0 && (
                <>
                  <span>{'('}</span>
                  {value.args.map((arg, ind) => (
                    <p className="inline" key={ind}>
                      <span className="text-gray-500 ">{`${arg.name}: `}</span>
                      <span
                        className="text-orange-700 cursor-pointer hover:underline"
                        onClick={(e) =>
                          e.target instanceof HTMLSpanElement && e.target.textContent
                            ? handleTypeClick(e.target.textContent)
                            : null
                        }
                      >
                        {arg.type instanceof GraphQLList
                          ? arg.type.ofType.toString()
                          : arg.type.toString()}
                      </span>
                      {ind === value.args.length - 1 ? null : <span>{', '}</span>}
                    </p>
                  ))}
                  <span>{')'}</span>
                </>
              )}
              {': '}
              <span
                className="text-orange-700 cursor-pointer hover:underline"
                onClick={(e) =>
                  e.target instanceof HTMLSpanElement && e.target.textContent
                    ? handleTypeClick(e.target.textContent)
                    : null
                }
              >
                {value.type instanceof GraphQLList
                  ? value.type.ofType.toString()
                  : value.type.toString()}
              </span>
              <p className="text-xs text-gray-500 mt-1 mb-3">{value.description}</p>
            </div>
          );
        })}
      {!isFirstPage &&
        values &&
        values.map((value) => (
          <p className="text-sm text-blue-700" key={value.name}>
            {value.name}
          </p>
        ))}
    </>
  );
}
