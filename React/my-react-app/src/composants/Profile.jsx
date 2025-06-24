import React, { useState } from "react";
import '../styles/profile.css';
import SharedSidebar from "./SharedSidebar.jsx";
import SharedRightSidebar from "./SharedRightSidebar.jsx";
import { Link } from "react-router-dom";
import ResponsiveSidebar from "./ResponsiveSidebar.jsx";

// trends and other data moved to SharedRightSidebar or will be managed locally

// New component for the main profile content area
const ProfileMainContent = () => {
    const [activeTab, setActiveTab] = useState("publications");

    return (
        <div className="profile-content-custom">
            <div className="profile-header-custom">
                <div className="profile-pic">
                    <i className="bi bi-person" />
                </div>
                <div className="profile-user-row">
                    <span className="profile-username">@User_1</span>
                    <Link to="/editprofile" className="profile-edit-link">
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
    );
};

// Main component for the profile page layout
const VueProfileContentOnly = () => {
    return (
        <div className="twitter-app">
            <div className="row">
                <div className="col-md-3 col-lg-2">
                    <SharedSidebar />
                </div>
                <div className="col-md-6 col-lg-7">
                    <ProfileMainContent />
                </div>
                <div className="col-md-3 col-lg-3 d-none d-md-block"> {/* Hide on small screens, show on medium and larger */}
                    <SharedRightSidebar />
                </div>
                <div className="col-12 d-md-none"> {/* Responsive sidebar for small screens */}
                    <ResponsiveSidebar />
                </div>
            </div>
        </div>
    );
};

export default VueProfileContentOnly;