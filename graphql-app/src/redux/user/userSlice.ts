import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type userSliceType = {
  isSignedIn: boolean;
};

const initialState: userSliceType = {
  isSignedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsSignedIn: (state: userSliceType, action: PayloadAction<boolean>) => {
      state.isSignedIn = action.payload;
    },
  },
});

export const { setIsSignedIn } = userSlice.actions;
export default userSlice.reducer;
