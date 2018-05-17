import {combineReducers, createStore} from "redux";
import backoff from "backoff";
import BigBang from "bigbang.io";
import * as ActionTypes from "./ActionTypes";
import connectionReducer from "./ConnectionReducer";
import channelsReducer from "./ChannelsReducer";
import gigabotReducer from "./GigabotReducer";
import async from "async";
import S from 'string'
import {reactLocalStorage} from 'reactjs-localstorage';


const BOT_HOST = 'https://thegigabots.bigbang.io';

class AppStoreClz {
    constructor() {

        this.client = new BigBang.Client(BOT_HOST);
        this.subQueue = async.queue(this.processSubscribe.bind(this), 1);

        const reducers = combineReducers({
            con: connectionReducer,
            channels: channelsReducer,
            gigabot: gigabotReducer,
        })
        this._store = createStore(reducers);
        this.doConnect();
    }

    subscribeChannel(channelName) {
        this.subQueue.push({channelName: channelName}, (err) => {
        })
    }

    subscribeDevice(deviceId) {
        this.subQueue.push({deviceId: deviceId, channelName: deviceId}, (err) => {
        })
    }


    connectToBot(botShortId) {
        this.client.queryDevices([botShortId], (err, results) => {
            if (results && results.devices && results.devices.length > 0) {
                this.subQueue.push({type: "botConnect", botId: botShortId, id: results.devices[0].id});
            }
            else {
                console.error(`Failed to look up ${botShortId}`);
            }
        })
    }


    botIdFromShortBotId(botShortId) {
        return new Promise((resolve, reject) => {
            this.client.queryDevices([botShortId], (err, results) => {
                if (results && results.devices) {
                    resolve(results.devices[0].id);
                }
                else {
                    reject();
                }
            })
        })
    }


    disconnectFromBot(botId) {

        const channel = this.client.getChannel(botId);
        if (channel) {
            channel.unsubscribe(() => {
                //Client bug, it should remove this channel reference after unsub..
                delete this.client.channelMap[botId];

                this._store.dispatch({type: ActionTypes.ROBOT_UNSUBSCRIBE});
            });
        }
    }

    processSubscribe(task, done) {
        if (task.type === "botConnect") {
            this.processBotConnect(task, done);
        }
        else {
            console.log("No type!")
            done()
        }
    }

    processBotConnect(task, done) {
        if (this.client.getChannel(task.id) != null) {
            done();
            return;
        }
        else {
            this.client.subscribe(task.id, (err, channel) => {

                this._store.dispatch({type: ActionTypes.ROBOT_UPDATE, channel: channel});
                channel.on('addNamespace', (channelData) => {
                    const ns = channelData.keySpace;
                    channel.getChannelData(ns).on('add', (k, v) => {
                        this._store.dispatch({type: ActionTypes.ROBOT_UPDATE, channel: channel});
                    })

                    channel.getChannelData(ns).on('update', (k, v) => {
                        this._store.dispatch({type: ActionTypes.ROBOT_UPDATE, channel: channel});
                    })

                    channel.getChannelData(ns).on('remove', (k) => {
                        this._store.dispatch({type: ActionTypes.ROBOT_UPDATE, channel: channel});
                    })
                })

                channel.getChannelData().on('add', (k, v) => {
                    this._store.dispatch({type: ActionTypes.ROBOT_UPDATE, channel: channel});
                })

                channel.getChannelData().on('update', (k, v) => {
                    this._store.dispatch({type: ActionTypes.ROBOT_UPDATE, channel: channel});
                })

                channel.getChannelData().on('remove', (k) => {
                    this._store.dispatch({type: ActionTypes.ROBOT_UPDATE, channel: channel});
                })

                done();
            })
        }

    }

    //Bot Commands
    publishScript(botId, src) {
        let buf = Buffer.from(src);
        const channel = this.client.getChannel(botId);
        if (channel) {
            channel.publish({botId: botId, type: "script", src: buf.toString('base64')});
        }
    }


    stopScript(botId) {
        const channel = this.client.getChannel(botId);
        if (channel) {
            channel.publish({botId: botId, type: "stopScript"});
        }
    }

    startScript(botId) {
        const channel = this.client.getChannel(botId);
        if (channel) {
            channel.publish({botId: botId, type: "startScript"});
        }
    }


    /**
     *
     * @param port (ABCD)
     * @param dir (f,b)
     * @param speed
     */
    startMotor(botId, port, dir, speed) {

        const channel = this.client.getChannel(botId);

        const msg = {
            botId: botId,
            type: 'motorStart',
            port: port,
            dir: dir,
            speed: speed
        }

        if (channel) {
            channel.publish(msg);
        }


    }

    stopMotor(botId, port) {
        const msg = {
            botId: botId,
            type: 'motorStop',
            port: port,
        }

        const channel = this.client.getChannel(botId);

        if (channel) {
            channel.publish(msg);
        }
    }



    allStop(botId) {
        //TODO could use a real all stop command
        const channel = this.client.getChannel(botId);

        if (channel) {
            channel.publish( {botId: botId, type: 'motorStop', port: "A",});
            channel.publish( {botId: botId, type: 'motorStop', port: "B",});
            channel.publish( {botId: botId, type: 'motorStop', port: "C",});
            channel.publish( {botId: botId, type: 'motorStop', port: "D",});
        }
    }

    drive(botId, left, right) {

        left = Math.round(left);
        right = Math.round(right);

        const msg = {
            botId: botId,
            type: 'drive',
            left: left,
            right: right
        }

        const channel = this.client.getChannel(botId);

        if (channel) {
            channel.publish(msg);
        }
    }

    /**
     * Use localStorage to help with reconnect on refresh / revisit
     * @param botId
     */
    storeLocalBotId(botId) {
        reactLocalStorage.set('botId', botId);
    }

    getLocalBotId() {
        return reactLocalStorage.get('botId', "");
    }


    doConnect() {
        const MAX_CONNECT_ATTEMPTS = 99999;

        const connectBackoff = backoff.exponential({
            randomisationFactor: 0,
            initialDelay: 1000,
            maxDelay: 60000,
            factor: 2
        });

        this.client.on('disconnected', (reason) => {
            this._store.dispatch({type: ActionTypes.CLIENT_DISCONNECT, message: "Disconnected."});
            connectBackoff.backoff();
        });

        connectBackoff.failAfter(MAX_CONNECT_ATTEMPTS);

        connectBackoff.on('fail', () => {
            console.log("I HAVE FAILED.");
        })

        connectBackoff.on('backoff', (number, delay) => {

            let message = `Reconnect attempt ${number}/${MAX_CONNECT_ATTEMPTS} in ${delay}ms.`;

            if (number === 0) {
                message = 'Connecting ...'
            }

            this._store.dispatch({type: ActionTypes.CLIENT_DISCONNECT, message: message});
        });

        connectBackoff.on('ready', (number, delay) => {
            this.client.connect((err) => {
                if (err) {
                    console.warn(err);
                    connectBackoff.backoff();
                }
                else {
                    connectBackoff.reset();
                    this._store.dispatch({type: ActionTypes.CLIENT_CONNECT, client: this.client});

                    //Reconnect to a bot if we have a local botId
                    let botId = this.getLocalBotId();
                    if (!S(botId).isEmpty()) {
                        this.connectToBot(botId);
                    }
                }
            })
        });

        connectBackoff.backoff();
    }

    get store() {
        return this._store;
    }

    addFriend(myBotId, friendShortCode) {
        const channel = this.client.getChannel(myBotId);
        if (channel) {
            channel.publish({botId: myBotId, friendShortCode: friendShortCode, type: "addFriend"});
        }
    }

    removeFriend(myBotId, friendShortCode) {
        console.log(`Removing friend ${friendShortCode} from ${myBotId}`);

        const channel = this.client.getChannel(myBotId);
        if (channel) {
            channel.publish({botId: myBotId, friendShortCode: friendShortCode, type: "removeFriend"});
        }
    }

}

const instance = new AppStoreClz();
export default instance;