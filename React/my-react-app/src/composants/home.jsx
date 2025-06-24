import React, { useState, useEffect } from 'react';
import { Heart, MessageSquare, Repeat2 } from 'lucide-react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import SharedSidebar from './SharedSidebar.jsx';
import SharedRightSidebar from './SharedRightSidebar.jsx';
import '../styles/home.css';
import '../styles/responsiveSidebar.css';
import ResponsiveSidebar from './ResponsiveSidebar.jsx';

export default function TwitterLikeInterface() {
    const [activeTab, setActiveTab] = useState('home');
    const location = useLocation();

    const posts = [
        { id: 1, username: 'User  1', handle: '@newuser', description: 'Description du Post', time: '5m', stats: { likes: '520', retweets: '200' } },
        { id: 2, username: 'User  1', handle: '@newuser', description: 'Description du Post', time: '5m', contentExtra: "Description d'un post avec un contenu intéressant" },
        { id: 3, username: 'User  1', handle: '@newuser', description: 'Description du Post', time: '5m', contentExtra: "Description d'un post avec un contenu intéressant" }
    ];

    // trends moved to SharedRightSidebar

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
            <SharedSidebar />

            {/* Main Content */}
            <div className="main-content-home">
                <div className="header">
                    <Link to="/decouvrir" className={`header-tab ${activeTab === 'decouvrir' ? 'active' : ''}`}>
                        Découvrir
                    </Link>
                    <Link to="/home" className={`header-tab ${activeTab === 'home' ? 'active' : ''}`}>
                        Home
                    </Link>
                    <Link to="/suivis" className={`header-tab ${activeTab === 'suivis' ? 'active' : ''}`}>
                        Suivis
                    </Link>
                </div>

                {/* Render posts based on the active tab */}
                <div className="main-content-body">
                    <Outlet />
                </div>

            </div>

            {/* Right Sidebar - Trends */}
            <SharedRightSidebar />
            {/* Responsive Bottom Navigation */}
            <ResponsiveSidebar activeTab={activeTab} />
        </div>
    );
}