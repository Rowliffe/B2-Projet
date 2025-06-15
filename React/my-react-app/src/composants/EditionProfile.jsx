import React, { useState } from "react";
import { Home, MessageCircle, Search, Settings, User } from "lucide-react";
import { Link } from "react-router-dom";
import '../styles/editionProfile.css';

const trends = [
    { id: 1, username: "User 1", followers: "14K" },
    { id: 2, username: "User 2", followers: "14K" },
    { id: 3, username: "User 3", followers: "14K" },
    { id: 4, username: "User 4", followers: "14K" },
    { id: 5, username: "User 5", followers: "14K" },
];

const Sidebar = () => (
    <div className="sidebar">
        <div className="sidebar-logo">
            <span>L</span>
        </div>
        <Link to="/home" className="sidebar-item">
            <Home size={24} />
            <span>Home</span>
        </Link>
        <Link to="/messages" className="sidebar-item">
            <MessageCircle size={24} />
            <span>Messages</span>
        </Link>
        <Link to="/search" className="sidebar-item">
            <Search size={24} />
            <span>Search</span>
        </Link>
        <Link to="/settings" className="sidebar-item active">
            <Settings size={24} />
            <span>Settings</span>
        </Link>
        <Link to="/profile" className="sidebar-item">
            <User size={24} />
            <span>Profile</span>
        </Link>
        <button className="add-post-btn">ADD A POST</button>
    </div>
);

const RightSidebar = () => (
    <div className="right-sidebar">
        <div className="search-bar">
            <Search size={20} color="#8899a6" />
            <input className="search-input" placeholder="Search something" />
        </div>
        <div className="trends-container">
            <div className="trends-header">Trends</div>
            {trends.map((trend) => (
                <div key={trend.id} className="trend-item">
                    <div className="trend-avatar"></div>
                    <div className="trend-user">
                        <div>{trend.username}</div>
                        <div className="followers">{trend.followers} followers</div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const ProfileEditCenter = () => {
    const [username, setUsername] = useState("@User_1");
    const [email, setEmail] = useState("user@email.com");
    const [bio, setBio] = useState("");
    const [darkMode, setDarkMode] = useState(false);
    const [notifEmail, setNotifEmail] = useState(true);

    return (
        <div className="profile-content-custom">
            <div className="profile-header-custom">
                <div className="profile-pic">
                    <i className="bi bi-person" />
                </div>
                <div className="profile-user-row">
                    <span className="profile-username">{username}</span>
                    <button className="profile-edit-btn">Changer la photo</button>
                </div>
            </div>

            <form className="edition-profile-main" style={{ margin: "2rem auto", maxWidth: 420 }}>
                <div className="edition-profile-field">
                    <label>Nom d'utilisateur</label>
                    <input
                        type="text"
                        className="edition-profile-input"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </div>
                <div className="edition-profile-field">
                    <label>Adresse email</label>
                    <input
                        type="email"
                        className="edition-profile-input"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className="edition-profile-field">
                    <label>Bio</label>
                    <textarea
                        className="edition-profile-textarea"
                        value={bio}
                        onChange={e => setBio(e.target.value)}
                    />
                </div>
                <div className="edition-profile-card">
                    <div className="edition-profile-pref-title">Préférences</div>
                    <div className="edition-profile-pref-row">
                        <div>
                            <div className="edition-profile-pref-label">Mode sombre</div>
                            <div className="edition-profile-pref-desc">Ajuster l'apparence de l'application</div>
                        </div>
                        <label className="switch">
                            <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
                            <span className="slider"></span>
                        </label>
                    </div>
                    <div className="edition-profile-pref-row">
                        <div>
                            <div className="edition-profile-pref-label">Notifications Emails</div>
                            <div className="edition-profile-pref-desc">Recevoir des notifications par email</div>
                        </div>
                        <label className="switch">
                            <input type="checkbox" checked={notifEmail} onChange={() => setNotifEmail(!notifEmail)} />
                            <span className="slider"></span>
                        </label>
                    </div>
                </div>
                <button type="submit" className="profile-edit-btn" style={{ marginTop: 24 }}>
                    Enregistrer
                </button>
            </form>
        </div>
    );
};

const EditionProfile = () => {
    const isMobile = window.innerWidth <= 768;
    return (
        <div className="edit-app" style={{ display: "flex" }}>
            <Sidebar />
            <main className="main-content">
                <ProfileEditCenter />
            </main>
            {!isMobile && <RightSidebar />}
        </div>
    );
};

export default EditionProfile;