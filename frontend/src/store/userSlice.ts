import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import userService, {
     ApiError,
     type GetUserResponse,
     type LoginRequest,
     type RegisterUserRequest,
} from '../services/userService';

export interface UserState {
     user: GetUserResponse | null;
     token: string | null;
     isAuthenticated: boolean;
     loading: boolean;
     error: string | null;
}

const initialState: UserState = {
     user: null,
     token: null,
     isAuthenticated: false,
     loading: true,
     error: null,
};

/**
 * Async thunk for user login
 */
export const loginUser = createAsyncThunk(
     'user/login',
     async (credentials: LoginRequest, { rejectWithValue }) => {
          try {
               const response = await userService.login(credentials);
               userService.storeToken(response.token);
               return response;
          } catch (error) {
               if (error instanceof ApiError && error.status === 401) {
                    return rejectWithValue('Invalid email or password.');
               }

               return rejectWithValue(
                    error instanceof Error
                         ? error.message
                         : 'Failed to sign in. Please check your credentials and try again.'
               );
          }
     }
);

/**
 * Async thunk for user registration
 */
export const registerUser = createAsyncThunk(
     'user/register',
     async (
          credentials: RegisterUserRequest,
          { rejectWithValue }
     ) => {
          try {
               const user = await userService.register(credentials);
               return user;
          } catch (error) {
               return rejectWithValue(
                    error instanceof Error ? error.message : 'Registration failed'
               );
          }
     }
);

/**
 * Async thunk to restore user session from stored token
 */
export const restoreSession = createAsyncThunk(
     'user/restoreSession',
     async (_, { rejectWithValue }) => {
          try {
               const token = userService.getStoredToken();
               if (!token) {
                    return rejectWithValue('No stored token');
               }
               // const user = await userService.getCurrentUser(token);
               return { token };
          } catch (error) {
               userService.clearToken();
               return rejectWithValue(
                    error instanceof Error ? error.message : 'Session restore failed'
               );
          }
     }
);

/**
 * Async thunk for user logout
 */
export const logoutUser = createAsyncThunk(
     'user/logout',
     async (_, { getState, rejectWithValue }) => {
          try {
               const state = getState() as { user: UserState };
               const token = state.user.token;
               if (token) {
                    await userService.logout(token);
               }
               userService.clearToken();
               return null;
          } catch (error) {
               return rejectWithValue(
                    error instanceof Error ? error.message : 'Logout failed'
               );
          }
     }
);

const userSlice = createSlice({
     name: 'user',
     initialState,
     reducers: {
          clearError: (state) => {
               state.error = null;
          },
          setError: (state, action: PayloadAction<string>) => {
               state.error = action.payload;
          },
          setUser: (state, action: PayloadAction<GetUserResponse | null>) => {
               state.user = action.payload;
          },
          setToken: (state, action: PayloadAction<string>) => {
               state.token = action.payload;
               state.isAuthenticated = true;
          },
     },
     extraReducers: (builder) => {
          // Login
          builder
               .addCase(loginUser.pending, (state) => {
                    state.loading = true;
                    state.error = null;
               })
               .addCase(loginUser.fulfilled, (state, action) => {
                    state.loading = false;
                    state.token = action.payload.token;
                    state.isAuthenticated = true;
                    state.error = null;
               })
               .addCase(loginUser.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload as string;
                    state.isAuthenticated = false;
               });

          // Register
          builder
               .addCase(registerUser.pending, (state) => {
                    state.loading = true;
                    state.error = null;
               })
               .addCase(registerUser.fulfilled, (state, action) => {
                    state.loading = false;
                    state.user = action.payload;
                    state.error = null;
               })
               .addCase(registerUser.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload as string;
               });

          // Restore Session
          builder
               .addCase(restoreSession.pending, (state) => {
                    state.loading = true;
               })
               .addCase(restoreSession.fulfilled, (state, action) => {
                    state.loading = false;
                    // state.user = action.payload.user;
                    state.token = action.payload.token;
                    state.isAuthenticated = true;
                    state.error = null;
               })
               .addCase(restoreSession.rejected, (state) => {
                    state.loading = false;
                    state.isAuthenticated = false;
                    state.user = null;
                    state.token = null;
               });

          // Logout
          builder
               .addCase(logoutUser.pending, (state) => {
                    state.loading = true;
               })
               .addCase(logoutUser.fulfilled, (state) => {
                    state.loading = false;
                    state.user = null;
                    state.token = null;
                    state.isAuthenticated = false;
                    state.error = null;
               })
               .addCase(logoutUser.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload as string;
                    // Clear auth state even if logout fails
                    state.user = null;
                    state.token = null;
                    state.isAuthenticated = false;
               });
     },
});

export const { clearError, setUser, setToken, setError } = userSlice.actions;

export const selectUser = (state: { user: UserState }) => state.user.user;
export const selectToken = (state: { user: UserState }) => state.user.token;
export const selectIsAuthenticated = (state: { user: UserState }) =>
     state.user.isAuthenticated;
export const selectUserLoading = (state: { user: UserState }) =>
     state.user.loading;
export const selectUserError = (state: { user: UserState }) =>
     state.user.error;
export const selectUserUsername = (state: { user: UserState }) =>
     state.user.user?.username ?? null;
export const selectUserEmail = (state: { user: UserState }) =>
     state.user.user?.email ?? null;

export default userSlice.reducer;
