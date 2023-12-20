import { API_OPTIONS } from '@/common/api-path';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IntrospectionQuery, getIntrospectionQuery } from 'graphql';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: API_OPTIONS[1].value }), //ToDO: add ability to change api
  endpoints: ({ query }) => ({
    getSchema: query<IntrospectionQuery, void>({
      query: () => ({
        url: '/',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: getIntrospectionQuery(),
        }),
      }),
      transformResponse: ({ data }: { data: IntrospectionQuery }) => data,
    }),
  }),
});

export const { useLazyGetSchemaQuery } = api;
