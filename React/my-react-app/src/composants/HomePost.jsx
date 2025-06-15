// composants/HomePosts.jsx
import React from 'react';
import { Heart, MessageSquare, Repeat2 } from 'lucide-react';

const posts = [
    { id: 1, username: 'User 1', handle: '@newuser', description: 'Description du Post', time: '5m', stats: { likes: '520', retweets: '200' } },
    { id: 2, username: 'User 1', handle: '@newuser', description: 'Description du Post', time: '5m', contentExtra: "Description d'un post avec un contenu intéressant" },
    { id: 3, username: 'User 1', handle: '@newuser', description: 'Description du Post', time: '5m', contentExtra: "Description d'un post avec un contenu intéressant" }
];

export default function HomePosts() {
    return (
        <div>
            {posts.map(post => (
                <div key={post.id} className="post">
                    <div className="post-header">
                        <div className="post-user">
                            <div className="avatar"></div>
                            <div className="user-info">
                                <span className="username">{post.username}</span>
                                <span className="handle">{post.handle}</span>
                            </div>
                        </div>
                        <span className="post-time">{post.time}</span>
                    </div>
                    <div className="post-content">
                        <div>{post.description}</div>
                        {post.contentExtra && <div style={{ marginTop: '5px' }}>{post.contentExtra}</div>}
                        {post.stats && (
                            <div className="post-stats">
                                <div>{post.stats.likes}</div>
                                <div>{post.stats.retweets}</div>
                            </div>
                        )}
                        <div className="post-actions">
                            <Heart size={20} color="#8899a6" />
                            <Repeat2 size={20} color="#8899a6" />
                            <MessageSquare size={20} color="#8899a6" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
