import React from 'react';
import { Home, MessageCircle, Search, Settings, User, Plus } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/responsiveSidebar.css'; // Import your new CSS file

const navItems = [
    { to: '/home', icon: <Home size={24} />, label: 'Home' },
    { to: '/messages', icon: <MessageCircle size={24} />, label: 'Messages' },
    { to: '/search', icon: <Search size={24} />, label: 'Search' },
    { to: '/addpost', icon: <Plus size={24} />, label: 'Ajouter' },
    { to: '/settings', icon: <Settings size={24} />, label: 'Settings' },
    { to: '/profile', icon: <User size={24} />, label: 'Profile' },
];

export default function ResponsiveSidebar() {
    const location = useLocation();
    return (
        <nav className="mobile-bottom-nav d-flex d-md-none justify-content-around align-items-center py-2 px-1">
            {navItems.map(({ to, icon, label }) => (
                <Link
                    key={to}
                    to={to}
                    className={`mobile-nav-item${location.pathname === to ? ' active' : ''}`}
                    title={label}
                >
                    {icon}
                </Link>
            ))}
        </nav>
    );
}