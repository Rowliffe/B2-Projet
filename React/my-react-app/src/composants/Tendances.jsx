import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import SharedSidebar from './SharedSidebar.jsx';
import SharedRightSidebar from './SharedRightSidebar.jsx';
import '../styles/tendances.css'; // Import your new CSS file
import ResponsiveSidebar from "./ResponsiveSidebar.jsx";
export default function Tendances() {
    const [activeTab, setActiveTab] = useState('principale');
    const location = useLocation();

    // Mock data for trends
    const trends = [
        { id: 1, tag: '#Technologies' },
        { id: 2, tag: '#Technologies' },
        { id: 3, tag: '#Technologies' },
        { id: 4, tag: '#Technologies' },
        { id: 5, tag: '#Technologies' },
    ];

    useEffect(() => {
        // Update active tab based on the current location if needed for navigation
        // For this page, activeTab will be managed internally for tabs like 'Principale', 'Plus récent' etc.
    }, [location]);

    return (
        <div className="twitter-app">
            <div className="row">
                <div className="col-md-3 col-lg-2">
                    <SharedSidebar />
                </div>

                <div className="col-md-6 col-lg-7">
                    {/* Main Content for Tendances Page */}
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
                </div>

                <div className="col-md-3 col-lg-3 d-none d-md-block"> {/* Hide on small screens, show on medium and larger */}
                    <SharedRightSidebar />
                </div>
                <ResponsiveSidebar activeTab={activeTab} />
            </div>
        </div>
    );
}
