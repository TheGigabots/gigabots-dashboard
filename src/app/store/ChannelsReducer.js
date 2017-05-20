"use strict";
import * as ActionTypes from "./ActionTypes";
import Immutable from  'immutable';

function channelsReducer(state, action) {
    if (typeof state === 'undefined') {
        return { };
    }
    else if (action.type === ActionTypes.CHANNEL_SUBSCRIBE) {
        let newState = {};
        newState[action.channel.getName()] = toJson(action.channel);
        return {...state, ...newState};
    }
    else if (action.type === ActionTypes.CHANNEL_UPDATE) {
        let newState = {};
        newState[action.channel.getName()] = toJson(action.channel);
        return {...state, ...newState};
    }
    else {
        return state;
    }
}


function toJson(channel) {
    let data = {}

    for (var ns of channel.getNamespaces()) {
        const cd = channel.getChannelData(ns);

        let channelData = {}

        for (var k of cd.getKeys()) {
            channelData[k] = cd.get(k);
        }

        data[ns] = channelData;
    }
    return data;
}

export default channelsReducer;