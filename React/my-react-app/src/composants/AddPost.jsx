import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Home, MessageCircle, Search, Settings, User } from "lucide-react";
import '../styles/addpost.css';

const CreationPost = ({ setText, text }) => {
    const maxChars = 128;

    return (
        <div className="creation-post-card">
            <div className="creation-post-header">
                <span>Créer un post</span>
                <i className="bi bi-calendar ms-2"></i>
                <button className="creation-post-publish-btn">Publier</button>
            </div>
            <div className="creation-post-body">
                <div className="creation-post-avatar"></div>
                <div className="creation-post-content">
                    <div className="creation-post-username">User 1</div>
                    <textarea
                        className="creation-post-textarea"
                        placeholder="Que voulez-vous partager ?"
                        maxLength={maxChars}
                        value={text}
                        onChange={e => setText(e.target.value)}
                    />
                </div>
            </div>
            <hr className="creation-post-separator" />
            <div className="creation-post-footer">
                <div className="creation-post-icons">
                    <i className="bi bi-image"></i>
                    <i className="bi bi-camera"></i>
                    <i className="bi bi-emoji-smile"></i>
                    <i className="bi bi-geo-alt"></i>
                </div>
                <span className="creation-post-counter">{text.length} / {maxChars}</span>
            </div>
        </div>
    );
};

const Apercu = ({ text }) => (
    <div className="apercu-col">
        <span className="apercu-title">Aperçu</span>
        <div className="apercu-card">
            <div className="apercu-card-header">
                <div className="apercu-avatar"></div>
                <div>
                    <div className="apercu-username">User 1</div>
                    <div className="apercu-time">À l’instant</div>
                </div>
            </div>
            <div className="apercu-card-body">
                {text ? text : "Voici votre post"}
            </div>
        </div>
    </div>
);

const Sidebar = ({ activeTab }) => (
    <div className="sidebar">
        <div className="sidebar-logo">
            <span>L</span>
        </div>
        <Link to="/home" className={`sidebar-item${activeTab === 'home' ? ' active' : ''}`}>
            <Home size={24} />
            <span>Home</span>
        </Link>
        <Link to="/messages" className={`sidebar-item${activeTab === 'messages' ? ' active' : ''}`}>
            <MessageCircle size={24} />
            <span>Messages</span>
        </Link>
        <Link to="/search" className={`sidebar-item${activeTab === 'search' ? ' active' : ''}`}>
            <Search size={24} />
            <span>Search</span>
        </Link>
        <Link to="/settings" className={`sidebar-item${activeTab === 'settings' ? ' active' : ''}`}>
            <Settings size={24} />
            <span>Settings</span>
        </Link>
        <Link to="/profile" className={`sidebar-item${activeTab === 'profile' ? ' active' : ''}`}>
            <User size={24} />
            <span>Profile</span>
        </Link>
        <button className="add-post-btn">ADD A POST</button>
    </div>
);

const CreatePost = () => {
    const [text, setText] = useState("");
    const activeTab = "home"; // Change si besoin

    return (
        <div className="twitter-app" style={{ display: "flex" }}>
            <Sidebar activeTab={activeTab} />
            <main className="post-main" style={{ display: "flex", flexDirection: "row", gap: "2rem", padding: "2rem" }}>
                <CreationPost setText={setText} text={text} />
                <Apercu text={text} />
            </main>
        </div>
    );
};

export default CreatePost;