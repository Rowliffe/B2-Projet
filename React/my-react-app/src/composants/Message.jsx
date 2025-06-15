import React, { useState } from 'react';
import { Send } from 'lucide-react';
import '../styles/message.css'; // Assure-toi que ce fichier contient le bon style

const MessagePage = () => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState({
        'John Doe': ['Salut !', 'Comment ça va ?'],
        'Jane Smith': ['Hello 👋', 'Prêt pour demain ?']
    });
    const [inputMessage, setInputMessage] = useState('');

    const handleSendMessage = () => {
        if (inputMessage.trim() && selectedUser) {
            setMessages(prev => ({
                ...prev,
                [selectedUser]: [...prev[selectedUser], inputMessage.trim()]
            }));
            setInputMessage('');
        }
    };

    const userList = Object.keys(messages);

    return (
        
        <div className="message-page">
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
                        </div>
                        <div className="chat-messages">
                            {messages[selectedUser].map((msg, index) => (
                                <div key={index} className="chat-bubble">
                                    {msg}
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
    );
};

export default MessagePage;
