import { ELoadingState } from "@customTypes/shared";
import { createSlice } from "@reduxjs/toolkit";
import actAuthRegister from "./act(thunk)/actAuthRegister";
import { handleError } from "@utils/handleAxiosError";
import actAuthLogin from "./act(thunk)/actAuthLogin";

type TAuthState = {
  loading: ELoadingState;
  error: string | null;
  accessToken: string | null;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  } | null;
};

const initialState: TAuthState = {
  loading: ELoadingState.Idle,
  error: null,
  accessToken: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    cleanUpRegister: (state) => {
      state.loading = ELoadingState.Idle;
      state.error = null;
    },
    cleanUpLogin: (state) => {
      state.error = null;
      state.loading = ELoadingState.Idle;
    },
    authLogout: state => {
      state.accessToken = null;
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(actAuthRegister.pending, (state) => {
        state.loading = ELoadingState.Pending;
        state.error = null;
      })
      .addCase(actAuthRegister.fulfilled, (state) => {
        state.accessToken = null;
        state.user = null;
        state.loading = ELoadingState.Succeeded;
        state.error = null;
      })
      .addCase(actAuthRegister.rejected, (state, action) => {
        state.loading = ELoadingState.Failed;
        state.error = handleError(action.payload);
      });
    // login user reducers
    builder
      .addCase(actAuthLogin.pending, (state) => {
        state.loading = ELoadingState.Pending;
        state.error = null;
      })
      .addCase(actAuthLogin.fulfilled, (state, action) => {
        state.accessToken = action.payload?.accessToken || null;
        state.user = action.payload?.user || null;
        state.loading = ELoadingState.Succeeded;
        state.error = null;
      })
      .addCase(actAuthLogin.rejected, (state, action) => {
        state.loading = ELoadingState.Failed;
        state.error = handleError(action.payload);
      });
  },
});

export { actAuthRegister, actAuthLogin };
export const { cleanUpRegister, cleanUpLogin, authLogout } = authSlice.actions;
export default authSlice.reducer;
