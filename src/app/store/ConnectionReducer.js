import * as ActionTypes from "./ActionTypes";

function connectionReducer(state, action) {
    if (typeof state === 'undefined') {
        return {
            connected: false,
            client: null,
            message: ""
        }
    }
    else if (action.type === ActionTypes.CLIENT_CONNECT) {
        const newState = {client: action.client, connected: true, message: ""};
        return {...state, ...newState};
    }
    else if (action.type === ActionTypes.CLIENT_DISCONNECT) {
        const newState = {client: null, connected: false, message: action.message}
        return {...state, ...newState};
    }
    else {
        return state;
    }
}

export default connectionReducer;