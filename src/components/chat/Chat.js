import React, {useEffect} from 'react'
import Char from '../charScreen/char_screen'
import status from '../../helpers/transfer'

import Movebar from '../movebar/Movements'
import Chatkit from '@pusher/chatkit'
// import { ChatManager, Chatkit, ChatkitProvider, TokenProvider } from '@pusher/chatkit-client-react'
// import ChatComponent from '../chat/Chat.js'
import {tokenUrl, instanceLocator} from './config'
import Axios from 'axios'
function Chat(props) {


    useEffect(() =>{
        const chatManager = new Chatkit.ChatManager({
            instanceLocator,
            userId: "Petros",
            tokenProvider: new Chatkit.TokenProvider({
                url: tokenUrl
            })
        })
        // chatManager.connect()
        Axios.get(`https://us1.pusherplatform.io/services/chatkit/v6/3de585a4-c057-4f4d-8b05-af6f70b4850a/rooms/2f649141-2449-42cd-bc13-2d8f7476f05d/messages?token`)
        .then(res => console.log(res))
        // .then(currentUser => {
        //     currentUser.subscribeToRoom({
        //         roomId: "2f649141-2449-42cd-bc13-2d8f7476f05d",
        //         hooks: {
        //             onNewMessage: message => {
        //                 console.log('message.text: ');
        //             }
        //         }
        //     })
        // })
    },[])


    return (
        <div className="chat">
         
         
        </div>
    )
}

export default Chat