import React, { useState, useEffect } from 'react';
import { Home, MessageCircle, Search, Settings, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/search.css';

export default function Tendances() {
    const [activeTab, setActiveTab] = useState('principale');
    const location = useLocation();


    const trends = [
        { id: 1, tag: '#Technologies' },
        { id: 2, tag: '#Technologies' },
        { id: 3, tag: '#Technologies' },
        { id: 4, tag: '#Technologies' },
        { id: 5, tag: '#Technologies' },
    ];

    useEffect(() => {
        
    }, [location]);

    return (
        <div className="twitter-app">
           
            <div className="tendances-sidebar">
                <div className="tendances-sidebar-logo">
                    <span>L</span>
                </div>
                <Link to="/home" className={`sidebar-item${location.pathname === '/home' ? ' active' : ''}`}>
                    <Home size={24} />
                    <span>Home</span>
                </Link>
                <Link to="/messages" className={`sidebar-item${location.pathname === '/messages' ? ' active' : ''}`}>
                    <MessageCircle size={24} />
                    <span>Messages</span>
                </Link>
                <Link to="/search" className={`sidebar-item${location.pathname === '/search' ? ' active' : ''}`}>
                    <Search size={24} />
                    <span>Search</span>
                </Link>
                <Link to="/settings" className={`sidebar-item${location.pathname === '/settings' ? ' active' : ''}`}>
                    <Settings size={24} />
                    <span>Settings</span>
                </Link>
                <Link to="/profile" className={`sidebar-item${location.pathname === '/profile' ? ' active' : ''}`}>
                    <User size={24} />
                    <span>Profile</span>
                </Link>
                <button className="add-post-btn">ADD A POST</button>
            </div>

           
            <div className="main-content-tendances">
                <div className="tendances-search-header">
                    <div className="search-bar">
                        <Search size={20} color="#8899a6" />
                        <input className="search-input" placeholder="Search something" />
                    </div>
                    <div className="tendances-tabs">
                        <button
                            className={`tendances-tab ${activeTab === 'principale' ? 'active' : ''}`}
                            onClick={() => setActiveTab('principale')}
                        >
                            Principale
                        </button>
                        <button
                            className={`tendances-tab ${activeTab === 'recent' ? 'active' : ''}`}
                            onClick={() => setActiveTab('recent')}
                        >
                            Plus récent
                        </button>
                        <button
                            className={`tendances-tab ${activeTab === 'personnes' ? 'active' : ''}`}
                            onClick={() => setActiveTab('personnes')}
                        >
                            Personnes
                        </button>
                        <button
                            className={`tendances-tab ${activeTab === 'medias' ? 'active' : ''}`}
                            onClick={() => setActiveTab('medias')}
                        >
                            Médias
                        </button>
                    </div>
                </div>

                <div className="tendances-body">
                    <div className="trends-section">
                        <h2>Tendances Pour Vous</h2>
                        {trends.map(trend => (
                            <div key={trend.id} className="trend-item-tendances">
                                <h3>{trend.tag}</h3>
                            </div>
                        ))}
                    </div>

               
                    <div className="filters-section">
                        <h2>Filtres</h2>
                        <div className="filter-group">
                            <h3>Types de contenu :</h3>
                            <label><input type="checkbox" /> Publications</label>
                            <label><input type="checkbox" /> Utilisateurs</label>
                            <label><input type="checkbox" /> Images</label>
                        </div>
                        <div className="filter-group">
                            <h3>Date</h3>
                            <select>
                                <option>Tout moment</option>
                            </select>
                        </div>
                        <div className="filter-group">
                            <h3>Langue</h3>
                            <select>
                                <option>Toutes langues</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
