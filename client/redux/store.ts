import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import authReducer from './reducers/auth';
import { customMiddleware } from './middleware/customMiddleware';
import talentsReducer from './reducers/talents';

const rootReducer = combineReducers({
  auth: authReducer,
  talents: talentsReducer
})

const initStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(customMiddleware),
    devTools: true
  })
}

export type IRootState = ReturnType<typeof rootReducer>;

export const wrapper = createWrapper(initStore)