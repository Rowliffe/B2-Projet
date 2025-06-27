import { Routes, Route, useLocation } from 'react-router-dom';
import TwitterLikeInterface from './home.jsx';
import TwitterLikeMessage from './Message.jsx';
import ProfileInterface from './Profile.jsx';
import HomePosts from './HomePost.jsx';
import React from 'react';
import EditionProfile from "./EditionProfile.jsx";
import SettingsPage from "./Settings.jsx";
import LoginPage from "./Login.jsx";
import CreatePage from "./AddPost.jsx";
import Tendances from "./Tendances.jsx";
import RegisterPage from "./SignIn.jsx";
import ResponsiveNavbar from "./ResponsiveNavbar.jsx";

export default function App() {
    const location = useLocation();
    

    const authPages = ['/login', '/register'];
    const showNavbar = !authPages.includes(location.pathname);
    
    return (
        <>
            {showNavbar && <ResponsiveNavbar />}
            <Routes>
                <Route path="/" element={<TwitterLikeInterface />}>
                    <Route path="home" element={<HomePosts />} />
                    <Route path="decouvrir" element={<HomePosts />} />
                    <Route path="suivis" element={<HomePosts />} />
                    <Route index element={<div>Welcome to the app!</div>} />
                </Route>
                <Route path="messages" element={<TwitterLikeMessage />} />
                <Route path="search" element={<Tendances/>} />
                <Route path="settings" element={<SettingsPage/>} />
                <Route path="profile" element={<ProfileInterface />} />
                <Route path="profile/edit" element={<EditionProfile />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
                <Route path="addpost" element={<CreatePage />} />
                <Route path="add-tweet" element={<CreatePage />} />
                <Route path="notifications" element={<div style={{padding: '20px', color: 'white', backgroundColor: '#15202b', minHeight: '100vh'}}>Notifications (À venir)</div>} />
                <Route path="bookmarks" element={<div style={{padding: '20px', color: 'white', backgroundColor: '#15202b', minHeight: '100vh'}}>Signets (À venir)</div>} />
            </Routes>
        </>
    );
}