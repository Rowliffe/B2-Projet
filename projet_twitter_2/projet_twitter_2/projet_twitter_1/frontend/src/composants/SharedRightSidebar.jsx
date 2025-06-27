import React, { useState, useEffect } from 'react';
import { Search, Heart } from 'lucide-react';
import '../styles/home.css'; // Assuming right sidebar styles are in home.css or will be consolidated

export default function SharedRightSidebar() {
    const [topTweets, setTopTweets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTopTweets();
    }, []);

    const fetchTopTweets = async () => {
        try {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');
            const response = await fetch('http://localhost:8000/api/tweets', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                // Trier par nombre de likes et prendre les 3 premiers
                const sortedTweets = data.sort((a, b) => (b.likesCount || 0) - (a.likesCount || 0));
                setTopTweets(sortedTweets.slice(0, 3));
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des tweets populaires:', error);
        } finally {
            setLoading(false);
        }
    };

    const truncateText = (text, maxLength = 60) => {
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    };

    return (
        <div className="right-sidebar">
            <div className="search-bar">
                <Search size={20} color="#8899a6" />
                <input className="search-input" placeholder="Search something" />
            </div>
            <div className="trends-container">
                <div className="trends-header">Tweets populaires ⚡︎ </div>
                {loading ? (
                    <div style={{ color: '#8899a6', textAlign: 'center', padding: '20px' }}>
                        Chargement...
                    </div>
                ) : topTweets.length > 0 ? (
                    topTweets.map((tweet, index) => (
                        <div key={tweet.id} className="trend-item popular-tweet">
                            <div className="tweet-content">
                                <div className="tweet-author">
                                    {tweet.author?.name && tweet.author?.lastname 
                                        ? `${tweet.author.name} ${tweet.author.lastname}`
                                        : tweet.author?.pseudo || "Utilisateur"
                                    }
                                </div>
                                <div className="tweet-title">
                                    {truncateText(tweet.title || tweet.content)}
                                </div>
                                <div className="tweet-likes">
                                    <Heart size={14} fill="#e0245e" color="#e0245e" />
                                    <span>{tweet.likesCount || 0}</span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div style={{ color: '#8899a6', textAlign: 'center', padding: '20px' }}>
                        Aucun tweet populaire
                    </div>
                )}
            </div>
        </div>
    );
} 