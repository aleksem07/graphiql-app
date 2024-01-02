import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type editorSliceType = {
  query?: string;
  variables?: string;
  headers?: string;
};

const initialState: editorSliceType = {
  query: '',
  variables: '',
  headers: '',
};

const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    setQuery: (state: editorSliceType, action: PayloadAction<editorSliceType>) => {
      state.query = action.payload.query;
    },
    setVariables: (state: editorSliceType, action: PayloadAction<editorSliceType>) => {
      state.variables = action.payload.variables;
    },
    setHeaders: (state: editorSliceType, action: PayloadAction<editorSliceType>) => {
      state.headers = action.payload.headers;
    },
  },
});

export const { setQuery, setVariables, setHeaders } = editorSlice.actions;
export default editorSlice.reducer;
