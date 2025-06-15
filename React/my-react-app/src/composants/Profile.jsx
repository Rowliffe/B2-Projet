import React, { useState } from "react";
import '../styles/profile.css';
import { Home, MessageCircle, Search, Settings, User } from "lucide-react";
import { Link } from "react-router-dom";

const trends = [
    { id: 1, username: 'User 1', followers: '14K' },
    { id: 2, username: 'User 2', followers: '14K' },
    { id: 3, username: 'User 3', followers: '14K' },
    { id: 4, username: 'User 4', followers: '14K' },
    { id: 5, username: 'User 5', followers: '14K' }
];

const ProfileCenter = () => {
    const [activeTab, setActiveTab] = useState("publications");

    return (
        <div className="profile-app">
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

            <div className="profile-content-custom">
                <div className="profile-header-custom">
                    <div className="profile-pic">
                        <i className="bi bi-person" />
                    </div>
                    <div className="profile-user-row">
                        <span className="profile-username">@User_1</span>

                        <Link to="/editprofile" className={`sidebar-item${activeTab === 'profile' ? ' active' : ''}`}>
                            <button className="profile-edit-btn">Modifier le profil</button>
                        </Link>
                    </div>
                    <div className="profile-stats-row">
                        <span>2 publications</span>
                        <span>150 followers</span>
                        <span>126 suivi(e)s</span>
                    </div>
                </div>

                <div className="profile-add-btn-container">
                    <button className="profile-add-btn">
                        <i className="bi bi-plus" />
                    </button>
                </div>

                <div className="profile-tabs-custom">
                    {['publications', 'like', 'retweet'].map(tab => (
                        <button
                            key={tab}
                            className={`tab-btn-custom${activeTab === tab ? ' active' : ''}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="profile-empty-msg">
                    {activeTab === "publications" && <div>Publications ici</div>}
                    {activeTab === "like" && <div>Likes ici</div>}
                    {activeTab === "retweet" && <div>Retweets ici</div>}
                </div>
            </div>
        </div>
    );
};

const RightSidebar = () => (
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
);

const VueProfileContentOnly = () => {
    const isMobile = window.innerWidth <= 768;

    return (
        <div className={`vue-profile-container${isMobile ? ' mobile' : ''}`} style={{ display: "flex" }}>
            <main className="main-content">
                <ProfileCenter />
            </main>
            {!isMobile && <RightSidebar />}
        </div>
    );
};

export default VueProfileContentOnly;