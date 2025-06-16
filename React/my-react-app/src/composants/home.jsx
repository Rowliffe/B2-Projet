import React, { useState, useEffect } from 'react';
import { Home, MessageCircle, Search, Settings, User, Heart, MessageSquare, Repeat2 } from 'lucide-react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import '../styles/home.css';

export default function TwitterLikeInterface() {
    const location = useLocation(); // récupère le chemin actuel
    const [activeTab, setActiveTab] = useState(location.pathname.slice(1)); // initialise en fonction de l'URL

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };

    const posts = [
        { id: 1, username: 'User  1', handle: '@newuser', description: 'Description du Post', time: '5m', stats: { likes: '520', retweets: '200' } },
        { id: 2, username: 'User  1', handle: '@newuser', description: 'Description du Post', time: '5m', contentExtra: "Description d'un post avec un contenu intéressant" },
        { id: 3, username: 'User  1', handle: '@newuser', description: 'Description du Post', time: '5m', contentExtra: "Description d'un post avec un contenu intéressant" }
    ];

    const trends = [
        { id: 1, username: 'User  1', followers: '14K' },
        { id: 2, username: 'User  2', followers: '14K' },
        { id: 3, username: 'User  3', followers: '14K' },
        { id: 4, username: 'User  4', followers: '14K' },
        { id: 5, username: 'User  5', followers: '14K' }
    ];

    useEffect(() => {
        // Update active tab based on the current location
        if (location.pathname === '/home') setActiveTab('home');
        else if (location.pathname === '/messages') setActiveTab('messages');
        else if (location.pathname === '/search') setActiveTab('search');
        else if (location.pathname === '/settings') setActiveTab('settings');
        else if (location.pathname === '/profile') setActiveTab('profile');
    }, [location]);

    return (
        <div className="twitter-app">
            {/* Sidebar */}
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
                    <User  size={24} />
                    <span>Profile</span>
                </Link>
                <Link to="/addpost" className={`add-post-btn`}>
                    <button className="add-post-btn">ADD A POST</button>
                </Link>
            </div>

            {/* Main Content */}
            <div className="main-content">
                <div className="header">
                    <Link
                        to="/decouvrir"
                        className={`header-tab ${activeTab === 'decouvrir' ? 'active' : ''}`}
                        onClick={() => handleTabClick('decouvrir')}
                    >
                        Découvrir
                    </Link>
                    <Link
                        to="/home"
                        className={`header-tab ${activeTab === 'home' ? 'active' : ''}`}
                        onClick={() => handleTabClick('home')}
                    >
                        Home
                    </Link>
                    <Link
                        to="/suivis"
                        className={`header-tab ${activeTab === 'suivis' ? 'active' : ''}`}
                        onClick={() => handleTabClick('suivis')}
                    >
                        Suivis
                    </Link>
                </div>

                {/* Render posts based on the active tab */}
                <div className="main-content-body">
                    <Outlet />
                </div>

            </div>

            {/* Right Sidebar - Trends */}
            <div className="right-sidebar">
                <div className="search-bar">
                    <Search size={20} color="#8899a6" />
                    <input className="search-input" placeholder="Search something" />
                </div>
                <div className="trends-container">
                    <div className="trends-header">Trends</div>
                    {trends.map(trend => (
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
        </div>
    );
}
