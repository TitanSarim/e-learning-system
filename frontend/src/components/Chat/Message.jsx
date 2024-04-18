// Message.js
import React, { useEffect, useRef, useState } from 'react';
import './Message.css';
import NavBar from '../NavBar/NavBar';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { io } from "socket.io-client";
import { sendMessage, getMessages, chatClearErrors } from '../../actions/chatAction';
import { toast } from 'react-toastify';
import { IoCheckmarkDone, IoCheckmarkSharp  } from "react-icons/io5";
import { BsSendFill } from "react-icons/bs";
import { BiMessageRoundedDetail } from "react-icons/bi";

const host = 'http://localhost:3900';

const Message = () => {

    const dispatch = useDispatch();
    // const socket = useRef();
    const chatContainerRef = useRef(null);

    const { messageData, loading, chatError } = useSelector((state) => state.message);
    const { user } = useSelector((state) => state.user);
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedChat, setSelectedChat] = useState([]);
    const [message, setMessage] = useState('');
    const [arrivalMessage, setArrivalMessage] = useState(null);

    const handleChatSelect = (toUserId, fromUserId) => {
        const selectedUserMessages = messages.filter(message =>
            (message.ToUserId === toUserId && message.FromuserId === fromUserId) ||
            (message.ToUserId === fromUserId && message.FromuserId === toUserId)
        );
        const sortedMessages = selectedUserMessages.sort(
            (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
        setSelectedChat(sortedMessages);
        
    };

    const handleSendMessage = (ToUserId, ToUserName, toUserAvatar, fromuserAvatar,  FromUserName, jobId, e) => {
        e.preventDefault();
        // socket.current.emit("send-msg", {
        //     id: Math.random(),
        //     FromuserId: user.id,
        //     ToUserId: ToUserId,
        //     FromUserName: FromUserName,
        //     ToUserName: ToUserName,
        //     FromUserAvatar: fromuserAvatar,
        //     toUserAvatar: toUserAvatar,
        //     jobId: jobId,
        //     message: message,
        //     createdAt: new Date().toISOString()
        // });
        const formData = {
            id: Math.random(),
            FromuserId: user.id,
            ToUserId: ToUserId,
            FromUserName: FromUserName,
            ToUserName: ToUserName,
            FromUserAvatar: fromuserAvatar,
            toUserAvatar: toUserAvatar,
            jobId: jobId,
            message: message,
            createdAt: new Date().toISOString()
        };

        setSelectedChat(prevChat => [...prevChat, formData]);

        dispatch(sendMessage(formData));
        setMessage('')
    };

    useEffect(() => {
        if (chatError) {
            toast.error(chatError);
            dispatch(chatClearErrors());
        }
        dispatch(getMessages());
    }, [dispatch, chatError]);

    useEffect(() => {
        setMessages(messageData?.data);
        setUsers(messageData?.users);
    }, [messageData]);

    // useEffect(() => {
    //     if (user) {
    //         socket.current = io(host, {withCredentials: true});
    //         socket.current.emit("add-user", user.id);
    //     }
    // }, [user]);

    // useEffect(() => {
    //     if (socket.current) {
    //         socket.current.on("msg-recieve", (msg) => {
    //             setArrivalMessage({ fromSelf: false, message: msg });
    //         });
    //     }
    // }, []);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [selectedChat]);

    return (
        <div className='chat-message'>
            <NavBar />
            <div className='chat-message-chat-box'>
                <div className='chat-message-users'>
                    <div className='chat-message-users-header'>
                        <p>Chats</p>
                    </div>
                    {users?.map((user) => (
                        <div className='chat-message-user' onClick={() => handleChatSelect(user.ToUserId, user.FromuserId)} key={user.ToUserId}>
                            <div className='chat-message-user-info'>
                                <img src={user.toUserAvatar.url} alt='avatar' />
                                <div>
                                    <p>{user.ToUserName}</p>
                                    <span>{user.message.slice(0, 9)}...</span>
                                </div>
                            </div>
                            <div className='chat-message-user-date'>
                                {user.readStatus === "Delivered" ? <IoCheckmarkSharp size={22} /> : <IoCheckmarkDone size={22} />}
                                <span>{moment(user.createdAt).calendar()}</span>
                            </div>
                        </div>
                    ))}
                </div>
                {selectedChat?.length <= 0 ?
                    <div className='no-selected-chat'>
                        <BiMessageRoundedDetail size={150} />
                        <p>Currently No Chat Selected</p>
                    </div>
                    : (
                        <div className='chat-message-chatting'>
                            <div className='chat-message-chatting-header'>
                                <img src={selectedChat[0]?.toUserAvatar.url} alt='avatar' />
                                <p>{selectedChat[0]?.ToUserName}</p>
                            </div>
                            <div className='chat-message-chatting-chat-container' ref={chatContainerRef}>
                                {selectedChat?.map((chat) => (
                                    <div
                                        key={chat.id}
                                        className={`chat-message-message ${
                                            chat.FromuserId === user?.id ? 'chat-message-my-message' : 'chat-message-other-message'
                                        }`}
                                    >
                                        <div>
                                            <img src={chat?.toUserAvatar.url} alt='avatar' />
                                            <div>
                                                <p>{chat.message}</p>
                                                <span>{moment(chat.createdAt).calendar()}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <form className='chat-message-chatting-form' onSubmit={(e) => handleSendMessage(selectedChat[0]?.ToUserId, selectedChat[0]?.ToUserName, selectedChat[0]?.toUserAvatar, selectedChat[0]?.FromUserAvatar,  selectedChat[0]?.FromUserName, selectedChat[0]?.jobId, e)}>
                                <input placeholder='Type your message' value={message} onChange={(e) => setMessage(e.target.value)} required />
                                <button type='submit'><BsSendFill size={30} /></button>
                            </form>
                        </div>
                    )}
            </div>
        </div>
    );
};

export default Message;
