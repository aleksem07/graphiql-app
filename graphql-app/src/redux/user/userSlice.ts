import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type userSliceType = {
  userUrl: string;
};

const initialState: userSliceType = {
  userUrl: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserUrl: (state: userSliceType, action: PayloadAction<userSliceType>) => {
      state.userUrl = action.payload.userUrl;
    },
  },
});

export const { setUserUrl } = userSlice.actions;
export default userSlice.reducer;
