import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootStateOrAny } from 'react-redux';
import { HYDRATE } from 'next-redux-wrapper';
import jwt_decode from 'jwt-decode';
import APIClient from '../../helpers/apiClient';
import config from '../../config';

export const initialState: any = {
  authenticated: false,
  user: '',
  isAdmin: false,
  showLoginModal: false,
  loginError: null,
  cookies: {},
  loaded: false,
};

export const get_cookies = createAsyncThunk('get/cookies', async () => {
    const res = await fetch(`${config.publicPath}api/cookies`);

    return await res.json();
});

// Thunk API Calls
export const auth_load = createAsyncThunk('get/authTokens', async ({ payload }: { payload?: any }, { getState }: RootStateOrAny) => {
    if (typeof window === 'undefined') {
        return initialState;
    }

    if (payload !== null && payload.authenticated) {
        return {
            user: payload.user,
            authenticated: true
        }
    }

    const state = getState();
    const cookie = state.auth.cookies['t'];

    if (!cookie) {
        return {
            user: null,
            authenticated: false
        }
    }
    const token: any = jwt_decode(cookie);
    let authenticated = false;
    let user = null;

    if (token) {
        authenticated = true;
        user = token.user;
    }

    return {
        user: user,
        authenticated: authenticated
    };
});

export const login = createAsyncThunk('post/login', async ({ username, password }: { username: string, password: string }, state) => {
    // server will sanitize fields
    const res = await APIClient('post', `${config.apiHost}login`, null, {
        username: username,
        password: password
    });

    return res.data;
});

export const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
      setLoginModal(state, action: PayloadAction<boolean>) {
        state.showLoginModal = action.payload;
      },
      setLoginError(state, action: PayloadAction<string>) {
        state.loginError = action.payload;
      },
      setCookies(state, action: PayloadAction<any>) {
          state.cookies = action.payload;
      }
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action:any) => {
      return {
          ...state,
          ...action.payload.auth,
      };
    }),
    builder.addCase(get_cookies.pending, (state, action) => {
        state.loaded = false;
    }),
    builder.addCase(auth_load.fulfilled, (state, action) => {
      if (typeof window === 'undefined') {
        state = initialState;
      } else if (action.payload.authenticated) {
          state.authenticated = true;
          state.isAdmin = action.payload.user.isAdmin;
          state.user = action.payload.user.user_id;
          state.showLoginModal = false;
          state.loginError = null;
      } else {
          state.authenticated = false;
          state.isAdmin = false;
          state.user = '';
      }
      state.loaded = true;
    }),
    builder.addCase(get_cookies.fulfilled, (state, action) => {
        state.cookies = action.payload;
    }),
    builder.addCase(auth_load.rejected, (state, action) => {
        state.error = action.error;
    }),
    builder.addCase(login.rejected, (state, action) => {
        state.error = action.error;
    }),
    builder.addCase(get_cookies.rejected, (state, action) => {
        state.error = action.error;
    })
  }
});

export const {
    setLoginModal,
    setLoginError
} = auth.actions;

 // Selectors
export const selectAuthenticated = state => state.auth.authenticated;
export const selectRole = state => state.auth.isAdmin;
export const selectAuth = state => state.auth;

export default auth.reducer