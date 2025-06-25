// composants/HomePosts.jsx
import React from 'react';
import { Heart, MessageSquare, Repeat2 } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function HomePosts() {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        fetch('/api/tweets')
            .then(response => response.json())
            .then(data => setPosts(data))
            .then(() => setIsLoading(false))
            .catch(error => console.error('Error fetching tweets:', error));
    }, []);

    const handleLike = (id) => {
        fetch(`/api/tweet/like/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(data => {
                setPosts(posts.map(post => post.id === id ? { ...post, likes: post.likes + 1, isLiked: true } : post));
            })
            .catch(error => console.error('Error liking tweet:', error));
    };



    if (isLoading) {
        return <div>Loading...</div>;
    }


    return (
        <div>
            {posts.map(post => (
                <div key={post.id} className="post">
                    <div className="post-header">
                        <div className="post-user">
                            <div className="avatar"></div>
                            <div className="user-info">
                                <span className="username">{post.author.pseudo}</span>
                                <span className="handle">{post.handle}</span>
                            </div>
                        </div>
                        <span className="post-time">{post.createdAt}</span>
                    </div>
                    <div className="post-content">
                        {post.content && <div style={{ marginTop: '5px' }}>{post.content}</div>}
                        <div>
                        {post.picture && <img src={post.picture} alt="Tweet media" className="tweet-media" style={{ width: '50%', height: 'auto' }} />}
                        </div>
                        {post.stats && (
                            <div className="post-stats">
                                <div>{post.stats.likesCount}</div>
                                <div>{post.stats.retweetsCount}</div>
                            </div>
                        )}
                        <div className="post-actions">
                            <Heart size={20} color="#8899a6" onClick={() => handleLike(post.id)} />
                            <Repeat2 size={20} color="#8899a6" />
                            <MessageSquare size={20} color="#8899a6" />
                        </div>

                    </div>
                </div>
            ))}
        </div>
    );
}
