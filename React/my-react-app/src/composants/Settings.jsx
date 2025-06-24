import React, { useState } from 'react';
import { LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import SharedSidebar from './SharedSidebar.jsx';
import SharedRightSidebar from './SharedRightSidebar.jsx';
import '../styles/settings.css';
import ResponsiveSidebar from "./ResponsiveSidebar.jsx";

const SettingsPage = () => {
    const [activeTab, setActiveTab] = useState('settings');
    const [darkMode, setDarkMode] = useState(true);
    const [emailNotif, setEmailNotif] = useState(true);
    const [privateAccount, setPrivateAccount] = useState(false);

    return (
        <div className="twitter-app">
            <div className="row">
                <div className="col-md-3 col-lg-2">
                    <SharedSidebar />
                </div>

                <div className="col-md-6 col-lg-7">
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

                <div className="col-md-3 col-lg-3 d-none d-md-block">
                    <SharedRightSidebar />
                </div>
            </div>
            <ResponsiveSidebar />
        </div>
    );
};

export default SettingsPage;