import { GraphQLSchema } from 'graphql/type';
import { printSchema } from 'graphql';

export default function PrintedSchema({ graphQLSchema }: { graphQLSchema: GraphQLSchema }) {
  const newSchema = printSchema(graphQLSchema)
    .replace(/\{([^}]*)\}/g, (match) => match.replace(/"""/g, ''))
    .split('""""""')
    .map((el) => el.replaceAll(/"""/g, '\t'));

  return (
    <div>
      {newSchema.map((el, i) => (
        <pre key={(i + 1).toString()} className="text-xs">
          {el}
        </pre>
      ))}
    </div>
  );
}
