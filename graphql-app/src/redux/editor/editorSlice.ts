import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type editorSliceType = {
  query: string;
  variables?: string;
};

const initialState: editorSliceType = {
  query: '',
  variables: '',
};

const editorSlice = createSlice({
  name: 'query',
  initialState,
  reducers: {
    setQuery: (state: editorSliceType, action: PayloadAction<editorSliceType>) => {
      state.query = action.payload.query;
    },
    setVariables: (state: editorSliceType, action: PayloadAction<editorSliceType>) => {
      state.variables = action.payload.variables;
    },
  },
});

export const { setQuery, setVariables } = editorSlice.actions;
export default editorSlice.reducer;
