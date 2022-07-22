import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import authReducer from './reducers/auth';
import { customMiddleware } from './middleware/customMiddleware';

const initStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(customMiddleware),
    devTools: true
  })
}

export const wrapper = createWrapper(initStore)