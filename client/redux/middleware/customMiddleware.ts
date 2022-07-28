import { auth_load, setLoginError } from "../reducers/auth";
import { addTalent, clearDraft } from "../reducers/talents";

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

    else if (action.type === 'talents/updateTalent') {
        const index = state.talents.talents.findIndex(talent => talent.id === action.payload.id);
        if (index < 0) {
            store.dispatch(addTalent(action.payload))
            store.dispatch(clearDraft())
        } else {
            next(action);
        }
    }

    else {
        next(action);
    }
}