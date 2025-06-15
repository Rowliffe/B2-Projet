import React, { useState } from 'react';
import { Home, MessageCircle, Search, Settings, User, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../styles/settings.css';

const SettingsPage = () => {
    const [activeTab, setActiveTab] = useState('settings');
    const [darkMode, setDarkMode] = useState(true);
    const [emailNotif, setEmailNotif] = useState(true);
    const [privateAccount, setPrivateAccount] = useState(false);

    return (
        <div className="twitter-app responsive">
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

            <div className="settings-page">
                <h2>Paramètres du compte</h2>

                <div className="setting-section">
                    <h3>Informations personnelles</h3>
                    <div className="setting-item">
                        <label>Nom complet</label>
                        <input type="text" placeholder="Ton nom" defaultValue="John Doe" />
                    </div>
                    <div className="setting-item">
                        <label>Nom d'utilisateur</label>
                        <input type="text" placeholder="@pseudo" defaultValue="@johndoe" />
                    </div>
                    <div className="setting-item">
                        <label>Email</label>
                        <input type="email" placeholder="email@exemple.com" defaultValue="johndoe@email.com" />
                    </div>
                </div>

                <div className="setting-section">
                    <h3>Apparence</h3>
                    <div className="setting-item switch">
                        <label>Mode sombre</label>
                        <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
                    </div>
                </div>

                <div className="setting-section danger-zone">
                    <Link to="/login" className={`sidebar-item${activeTab === 'login' ? ' active' : ''}`}>
                        <button className="logout-btn">
                            <LogOut size={18} /> Se déconnecter
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
