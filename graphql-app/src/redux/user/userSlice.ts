import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type userSliceType = {
  name: string;
  isSignedIn: boolean;
};

const initialState: userSliceType = {
  name: '',
  isSignedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setName: (state: userSliceType, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setIsSignedIn: (state: userSliceType, action: PayloadAction<boolean>) => {
      state.isSignedIn = action.payload;
    },
  },
});

export const { setName, setIsSignedIn } = userSlice.actions;
export default userSlice.reducer;
