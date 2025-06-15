import React, { useState } from 'react';
import { Send, Home, MessageCircle, Search, Settings, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../styles/message.css'; // Assure-toi que ce fichier contient le bon style

const MessagePage = () => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState({
        'John Doe': [
            { from: 'John Doe', text: 'Salut !' },
            { from: 'me', text: 'Comment ça va ?' }
        ],
        'Jane Smith': [
            { from: 'Jane Smith', text: 'Hello 👋' },
            { from: 'me', text: 'Prêt pour demain ?' }
        ]
    });

    const [inputMessage, setInputMessage] = useState('');
    const [activeTab, setActiveTab] = useState('messages');

    const handleSendMessage = () => {
        if (inputMessage.trim() && selectedUser) {
            setMessages(prev => ({
                ...prev,
                [selectedUser]: [...prev[selectedUser], { from: 'me', text: inputMessage.trim() }]
            }));
            setInputMessage('');
        }
    };


    const userList = Object.keys(messages);

    return (
        <div className="message-app responsive">
            <div className="sidebar">
                <div className="sidebar-logo">
                    <span>L</span>
                </div>
                <Link to="/home" className={`sidebar-item${activeTab === 'home' ? ' active' : ''}`} onClick={() => setActiveTab('home')}>
                    <Home size={24} />
                    <span>Home</span>
                </Link>
                <Link to="/messages" className={`sidebar-item${activeTab === 'messages' ? ' active' : ''}`} onClick={() => setActiveTab('messages')}>
                    <MessageCircle size={24} />
                    <span>Messages</span>
                </Link>
                <Link to="/search" className={`sidebar-item${activeTab === 'search' ? ' active' : ''}`} onClick={() => setActiveTab('search')}>
                    <Search size={24} />
                    <span>Search</span>
                </Link>
                <Link to="/settings" className={`sidebar-item${activeTab === 'settings' ? ' active' : ''}`} onClick={() => setActiveTab('settings')}>
                    <Settings size={24} />
                    <span>Settings</span>
                </Link>
                <Link to="/profile" className={`sidebar-item${activeTab === 'profile' ? ' active' : ''}`} onClick={() => setActiveTab('profile')}>
                    <User size={24} />
                    <span>Profile</span>
                </Link>
                <button className="add-post-btn">ADD A POST</button>
            </div>

            <div className="message-page-center">
                <div className="chat-sidebar">
                    <h2>Messages</h2>
                    {userList.map(user => (
                        <div
                            key={user}
                            className={`chat-user ${user === selectedUser ? 'active' : ''}`}
                            onClick={() => setSelectedUser(user)}
                        >
                            {user}
                        </div>
                    ))}
                </div>

                <div className="chat-window">
                    {selectedUser ? (
                        <>
                            <div className="chat-header">
                                <h3>{selectedUser}</h3>
                                <hr/>
                            </div>
                            <div className="chat-messages">
                                {messages[selectedUser].map((msg, index) => (
                                    <div
                                        key={index}
                                        className={`chat-bubble ${msg.from === 'me' ? 'from-me' : 'from-other'}`}
                                    >
                                        {msg.text}
                                    </div>
                                ))}

                            </div>
                            <div className="chat-input">
                                <input
                                    type="text"
                                    placeholder="Écris un message..."
                                    value={inputMessage}
                                    onChange={(e) => setInputMessage(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                />
                                <button onClick={handleSendMessage}>
                                    <Send size={20} />
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="no-chat-selected">
                            <p>Sélectionne une conversation</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MessagePage;