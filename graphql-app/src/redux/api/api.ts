import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { IntrospectionQuery, getIntrospectionQuery } from 'graphql';
import { RootState } from '../store';

const dynamicBaseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  const baseUrl = (api.getState() as RootState).userSlice.userUrl;
  const rawBaseQuery = fetchBaseQuery({ baseUrl });
  return rawBaseQuery(args, api, extraOptions);
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: dynamicBaseQuery,
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
