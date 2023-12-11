import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type userSliceType = {
  isSignedIn: boolean;
  email: string | null;
};

const initialState: userSliceType = {
  isSignedIn: false,
  email: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state: userSliceType, action: PayloadAction<userSliceType>) => {
      state.isSignedIn = action.payload.isSignedIn;
      state.email = action.payload.email;
    },
    removeUser: (state: userSliceType) => {
      state.isSignedIn = false;
      state.email = null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
