import React from 'react';
import { Search } from 'lucide-react';
import '../styles/home.css'; // Assuming right sidebar styles are in home.css or will be consolidated

const trends = [
    { id: 1, username: 'User 1', followers: '14K' },
    { id: 2, username: 'User 2', followers: '14K' },
    { id: 3, username: 'User 3', followers: '14K' },
    { id: 4, username: 'User 4', followers: '14K' },
    { id: 5, username: 'User 5', followers: '14K' }
];

export default function SharedRightSidebar() {
    return (
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
} 