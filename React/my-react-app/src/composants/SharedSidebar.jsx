import React from 'react';
import { Home, MessageCircle, Search, Settings, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function SharedSidebar() {
    const location = useLocation();
    return (
        <div className="sidebar">
            <div className="sidebar-logo">
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
            <Link to="/addpost">
                <button className="add-post-btn">ADD A POST</button>
            </Link>
        </div>
    );
} 