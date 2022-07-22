import { auth_load, setLoginError } from "../reducers/auth";

export const customMiddleware = store => next => action => {
    const state = store.getState();

    if (action.type === 'function') {
        next(action);
    }

    else if (action.type === 'post/login/fulfilled') {
        if (action.payload.error) {
            store.dispatch(setLoginError(action.payload.error));
        } else {
            store.dispatch(auth_load({ payload: action.payload }));
        }
        next(action);
    }

    else if (action.type === 'get/cookies/fulfilled') {
        next(action);
        store.dispatch(auth_load({ payload: null }));
    }

    else {
        next(action);
    }
}