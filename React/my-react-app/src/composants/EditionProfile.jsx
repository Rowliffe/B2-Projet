import React, { useState } from "react";
import { Home, MessageCircle, Search, Settings, User } from "lucide-react";
import { Link } from "react-router-dom";
import ResponsiveSidebar from "./ResponsiveSidebar.jsx";
import '../styles/editionProfile.css';

const trends = [
    { id: 1, username: "User 1", followers: "14K" },
    { id: 2, username: "User 2", followers: "14K" },
    { id: 3, username: "User 3", followers: "14K" },
    { id: 4, username: "User 4", followers: "14K" },
    { id: 5, username: "User 5", followers: "14K" },
];

const Sidebar = () => (
    <div className="sidebar d-none d-md-flex flex-column p-3 border-end min-vh-100">
        <div className="sidebar-logo mb-4">
            <span>L</span>
        </div>
        <Link to="/home" className="sidebar-item mb-2">
            <Home size={24} />
            <span>Home</span>
        </Link>
        <Link to="/messages" className="sidebar-item mb-2">
            <MessageCircle size={24} />
            <span>Messages</span>
        </Link>
        <Link to="/search" className="sidebar-item mb-2">
            <Search size={24} />
            <span>Search</span>
        </Link>
        <Link to="/settings" className="sidebar-item mb-2 active">
            <Settings size={24} />
            <span>Settings</span>
        </Link>
        <Link to="/profile" className="sidebar-item mb-2">
            <User size={24} />
            <span>Profile</span>
        </Link>
        <button className="add-post-btn btn btn-primary mt-3">ADD A POST</button>
    </div>
);

const RightSidebar = () => (
    <div className="right-sidebar d-none d-lg-block border-start p-3 min-vh-100">
        <div className="search-bar mb-4 d-flex align-items-center">
            <Search size={20} color="#8899a6" className="me-2" />
            <input className="form-control" placeholder="Search something" />
        </div>
        <div className="trends-container">
            <div className="trends-header fw-bold mb-3">Trends</div>
            {trends.map((trend) => (
                <div key={trend.id} className="trend-item d-flex align-items-center mb-3">
                    <div className="trend-avatar rounded-circle bg-secondary me-2" style={{ width: 32, height: 32 }}></div>
                    <div className="trend-user">
                        <div>{trend.username}</div>
                        <div className="followers text-muted small">{trend.followers} followers</div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const ProfileEditCenter = () => {
    const [username, setUsername] = useState("@User_1");
    const [email, setEmail] = useState("user@email.com");
    const [bio, setBio] = useState("");
    const [darkMode, setDarkMode] = useState(false);
    const [notifEmail, setNotifEmail] = useState(true);

    return (
        <div className="profile-content-custom py-4">
            <div className="profile-header-custom text-center mb-4">
                <div className="profile-pic mx-auto mb-2">
                    <i className="bi bi-person display-4" />
                </div>
                <div className="profile-user-row d-flex flex-column align-items-center">
                    <span className="profile-username fw-bold">{username}</span>
                    <button className="profile-edit-btn btn btn-outline-secondary btn-sm mt-2">Changer la photo</button>
                </div>
            </div>

            <form className="edition-profile-main" style={{ maxWidth: 500, margin: "0 auto" }}>
                <div className="row mb-3">
                    <div className="col-12">
                        <label className="form-label">Nom d'utilisateur</label>
                        <input
                            type="text"
                            className="form-control"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-12">
                        <label className="form-label">Adresse email</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-12">
                        <label className="form-label">Bio</label>
                        <textarea
                            className="form-control"
                            value={bio}
                            onChange={e => setBio(e.target.value)}
                        />
                    </div>
                </div>
                <div className="card mb-3">
                    <div className="card-body">
                        <div className="mb-3">
                            <div className="form-check form-switch d-flex justify-content-between align-items-center">
                                <div>
                                    <div className="form-label mb-0">Mode sombre</div>
                                    <small className="text-muted">Ajuster l'apparence de l'application</small>
                                </div>
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={darkMode}
                                    onChange={() => setDarkMode(!darkMode)}
                                />
                            </div>
                        </div>
                        <div>
                            <div className="form-check form-switch d-flex justify-content-between align-items-center">
                                <div>
                                    <div className="form-label mb-0">Notifications Emails</div>
                                    <small className="text-muted">Recevoir des notifications par email</small>
                                </div>
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={notifEmail}
                                    onChange={() => setNotifEmail(!notifEmail)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary w-100">
                    Enregistrer
                </button>
            </form>
        </div>
    );
};

const EditionProfile = () => (
    <div className="container-fluid">
        <div className="row min-vh-100">
            <div className="col-md-2 p-0">
                <Sidebar />
            </div>
            <main className="col-12 col-md-8 col-lg-6 mx-auto d-flex align-items-center justify-content-center">
                <ProfileEditCenter />
            </main>
            <div className="col-lg-4 p-0">
                <RightSidebar />
            </div>
            <ResponsiveSidebar activeItem="settings" />
        </div>
    </div>
);

export default EditionProfile;