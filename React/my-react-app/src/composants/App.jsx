import { Routes, Route } from 'react-router-dom';
import TwitterLikeInterface from './home.jsx';
import TwitterLikeMessage from './Message.jsx';
import ProfileInterface from './Profile.jsx';
import HomePosts from './HomePost.jsx';
import React from 'react';
import EditionProfile from "./EditionProfile.jsx";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<TwitterLikeInterface />}>
                <Route path="home" element={<HomePosts />} />
                <Route path="decouvrir" element={<HomePosts />} />
                <Route path="suivis" element={<HomePosts />} />
                <Route index element={<div>Welcome to the app!</div>} />
            </Route>
                <Route path="messages" element={<TwitterLikeMessage />} />
                <Route path="search" element={<div>Search Content</div>} />
                <Route path="settings" element={<div>Settings Content</div>} />
                <Route path="profile" element={<ProfileInterface />} />
                <Route path="editprofile" element={<EditionProfile />} />
        </Routes>
    );
}
