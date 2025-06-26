import React, { useEffect, useState } from 'react';
import { Heart, MessageSquare, Repeat2 } from 'lucide-react';

const HomePosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    console.log(token);
    useEffect(() => {
        if (!token) {
            setError("Non connecté");
            setLoading(false);
            return;
        }

        fetch('http://localhost:8000/api/tweets', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                if (!res.ok) throw new Error("Erreur lors du chargement");
                return res.json();
            })
            .then((data) => {
                setPosts(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [token]);

    const handleLike = (id) => {
        fetch(`http://localhost:8000/api/tweet/like/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => res.json())
            .then(() => {
                // on met à jour le compteur
                setPosts(prevPosts =>
                    prevPosts.map(post => {
                        if (post.id === id) {
                            const isLiked = post.isLiked || false;
                            const newLikes = isLiked ? post.likesCount - 1 : post.likesCount + 1;
                            return { ...post, likesCount: newLikes, isLiked: !isLiked };
                        }
                        return post;
                    })
                );
            })
            .catch((err) => console.error('Erreur lors du like :', err));
    };

    const handleRetweet = (id) => {
        fetch(`http://localhost:8000/api/tweet/retweet/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(() => {
                // Mise à jour locale (ex: incrémenter le compteur ou marquer comme retweeté)
                setPosts(posts.map(post =>
                    post.id === id
                        ? { ...post, retweetsCount: (post.retweetsCount || 0) + 1 }
                        : post
                ));
            })
            .catch((err) => console.error('Erreur lors du retweet :', err));
    };


    if (loading) return <p>Chargement des tweets...</p>;
    if (error) return <p>Erreur : {error}</p>;

    return (
        <div className="home-posts">
            {posts.map((post) => (
                <div key={post.id} className="post">
                    <div className="post-header">
                        <div className="post-user">
                            <div className="avatar" />
                            <div className="user-info">
                                <span className="username">{post.author?.pseudo || "Utilisateur"}</span>
                                <span className="handle">@{post.author?.username || "handle"}</span>
                            </div>
                        </div>
                        <span className="post-time">{new Date(post.createdAt).toLocaleString()}</span>
                    </div>


                    <div className="post-content">
                        {post.content && <p>{post.content}</p>}
                        {post.picture && (
                            <img
                                src={post.picture}
                                alt="media"
                                className="tweet-media"
                                style={{ width: '50%', height: 'auto' }}
                            />
                        )}
                        <div className="post-actions">
                            <div onClick={() => handleLike(post.id)} style={{ cursor: 'pointer' }}>
                                <Heart size={20} color={post.isLiked ? '#e0245e' : '#8899a6'} />
                                <span>{post.likesCount}</span>
                            </div>
                            <div>
                                <Repeat2 size={20} color="#8899a6" onClick={() => handleRetweet(post.id)} />

                                <span>{post.retweetsCount}</span>
                            </div>
                            <div>
                                <MessageSquare size={20} color="#8899a6" />
                            </div>
                        </div>

                    </div>
                </div>
            ))}
        </div>
    );
};

export default HomePosts;
