import { AsyncStorage } from 'react-native';

import alt from '../alt';
import ChatActions from '../actions/ChatActions';


class ChatStore {

    constructor() {

        this.bindListeners({
            handleUpdateMsg: ChatActions.UPDATE_MSG
        });
    }



    handleUpdateMsg(msg) {
        this.newMessage = msg;
        
    }

}

export default alt.createStore(ChatStore, 'ChatStore');
