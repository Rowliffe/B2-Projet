import React, { useState, useRef, useEffect } from 'react';
import { Home, MessageCircle, Search, Send, Settings, User, Plus } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/message.css';

const MessagePage = () => {
    const location = useLocation(); // Ajouté
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
    const messageEndRef = useRef(null);

    const handleSendMessage = () => {
        if (inputMessage.trim() && selectedUser) {
            setMessages(prev => ({
                ...prev,
                [selectedUser]: [
                    ...prev[selectedUser],
                    { from: 'me', text: inputMessage.trim() }
                ]
            }));
            setInputMessage('');
        }
    };

    useEffect(() => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, selectedUser]);

    const userList = Object.keys(messages);

    return (
        <div className="sidebar-message">
            {/* Barre latérale */}
            <div className="sidebar">
                <div className="sidebar-logo">
                    <span>L</span>
                </div>
                <Link to="/home" className={`sidebar-item${location.pathname === '/home' ? ' active' : ''}`}>
                    <Home className="m-1"  size={28} />
                </Link>
                <Link to="/messages" className={`sidebar-item${location.pathname === '/messages' ? ' active' : ''}`}>
                    <MessageCircle className="m-1"  size={24} />
                </Link>
                <Link to="/search" className={`sidebar-item${location.pathname === '/search' ? ' active' : ''}`}>
                    <Search className="m-1" size={24} />
                </Link>
                <Link to="/settings" className={`sidebar-item${location.pathname === '/settings' ? ' active' : ''}`}>
                    <Settings className="m-1" size={24} />
                </Link>
                <Link to="/profile" className={`sidebar-item${location.pathname === '/profile' ? ' active' : ''}`}>
                    <User className="m-1" size={24} />
                </Link>
                <Link to="/addpost" className="mt-4 w-100">
                    <button className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2">
                        <Plus size={20} />
                        <span className="d-none d-md-inline">Ajouter un post</span>
                    </button>
                </Link>
            </div>
            {/* Contenu principal */}
            <div className="message-app container me-5 p-3 d-flex flex-column flex-grow-1">
                <div className="row flex-grow-1">
                    {/* Liste des utilisateurs */}
                    <div className="col-12 col-md-4 p-3 border-end overflow-auto">
                        <h4 className=" mb-3">Messages</h4>
                        {userList.map(user => (
                            <div
                                key={user}
                                className={`p-2 rounded mb-2 ${user === selectedUser ? 'bg-primary text-dark' : 'bg-light text-dark'}`}
                                style={{ cursor: 'pointer' }}
                                onClick={() => setSelectedUser(user)}
                            >
                                {user}
                            </div>
                        ))}
                    </div>

                    {/* Zone de chat */}
                    <div className="p-3 col-12 col-md-8 d-flex flex-column">
                        {selectedUser ? (
                            <>
                                <div className="border-bottom pb-2 mb-2">
                                    <h5>{selectedUser}</h5>
                                </div>

                                <div className="flex-grow-1 overflow-auto mb-3 px-2" style={{ maxHeight: '60vh' }}>
                                    {messages[selectedUser].map((msg, index) => (
                                        <div
                                            key={index}
                                            className={`mb-2 d-flex ${msg.from === 'me' ? 'justify-content-end' : 'justify-content-start'}`}
                                        >
                                            <div
                                                className={`px-3 py-2 rounded-4 shadow-sm
                                                    ${msg.from === 'me' ? 'bg-primary text-white' : 'bg-light border text-dark'}`}
                                                style={{ maxWidth: '75%' }}
                                            >
                                                {msg.text}
                                            </div>
                                        </div>
                                    ))}
                                    <div ref={messageEndRef} />
                                </div>

                                {/* Champ de saisie */}
                                <div className="d-flex text-white align-items-center gap-2">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Écris un message..."
                                        value={inputMessage}
                                        onChange={(e) => setInputMessage(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                    />
                                    <button onClick={handleSendMessage} className="btn btn-primary">
                                        <Send size={20} />
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="d-flex align-items-center justify-content-center flex-grow-1 text-muted">
                                <p>Sélectionne une conversation</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MessagePage;