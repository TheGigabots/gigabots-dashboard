import * as ActionTypes from "./ActionTypes";

function gigabotReducer(state, action) {
    if (typeof state === 'undefined') {
        return null;
    }
    else if (action.type === ActionTypes.ROBOT_UPDATE) {
        return toJson(action.channel);
    }
    else if( action.type === ActionTypes.ROBOT_UNSUBSCRIBE) {
        return null;
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


export default gigabotReducer;