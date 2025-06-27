import React, { useEffect, useState } from 'react';
import { Heart, MessageSquare, Repeat2, ArrowUpDown, Send, X } from 'lucide-react';
import '../styles/home.css';


const bannedWords = [
    "merde", "putain", "con", "connard", "enculé", "salaud", "salopard", "pute", "salope",
    "connasse", "crétin", "débile", "stupide", "abruti", "imbecile", "ordure", "fumier",
    "chier", "foutre", "bordel", "fait chier", "ta gueule", "ferme ta gueule", "casse toi",
    "va te faire", "enfoiré", "connerie", "batard", "bâtard", "encule", "enculer",
    "nique", "niquer", "baise", "baiser", "bite", "queue", "couilles", "couillon",
    "cul", "chatte", "con", "pussy", "pénis", "conne", "salaud", "saloperie",
    "dégueulasse", "dégueu", "cochon", "porc", "fils de pute", "fdp", "ta mère",
    "pd", "pédé", "tapette", "tantouze", "gouine", "garce", "pouffiasse",
    
    "fuck", "shit", "bitch", "asshole", "damn", "crap", "bastard", "whore",
    "slut", "cunt", "dick", "cock", "pussy", "motherfucker", "bullshit",
    "piss", "jackass", "dumbass", "retard", "idiot", "moron", "stupid",
    "hell", "bloody", "damn it", "shut up", "screw you", "go to hell",
    "son of a bitch", "piece of shit", "get lost", "prick", "douche",
    "wanker", "bollocks", "bugger", "twat", "tosser", "git", "pillock",

    "nazi", "fasciste", "raciste", "hitler", "genocide", "kys", "kill yourself",
    "go die", "suicide", "terrorist", "cancer", "aids", "sida", "handicap",
    "autiste", "mongol", "trisomique", "malade mental", "psychopathe",
    "pervers", "violeur", "pédophile", "inceste", "viol", "violer",
    
    "m3rd3", "put41n", "f*ck", "sh*t", "b*tch", "a$$hole", "cr@p",
    "fvck", "shlt", "btch", "merda", "putaln", "fukc", "shjt",
    "m3rde", "put4in", "c0n", "conn4rd", "3nculé", "sal4ud"
];


const containsBannedWords = (text) => {
    const lower = text.toLowerCase();
    return bannedWords.some(word => lower.includes(word));
};

const HomePosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showComments, setShowComments] = useState({});
    const [commentText, setCommentText] = useState({});
    const [comments, setComments] = useState({}); 
    const [loadingComments, setLoadingComments] = useState({});
    const [commentErrors, setCommentErrors] = useState({}); 

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
                setPosts(prevPosts =>
                    prevPosts.map(post => {
                        if (post.id === id) {
                            const wasLiked = post.isLiked || false;
                            const newLikesCount = wasLiked 
                                ? Math.max(0, (post.likesCount || 0) - 1) 
                                : (post.likesCount || 0) + 1;
                            return { 
                                ...post, 
                                likesCount: newLikesCount, 
                                isLiked: !wasLiked 
                            };
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
                setPosts(prevPosts =>
                    prevPosts.map(post => {
                        if (post.id === id) {
                            const wasRetweeted = post.isRetweeted || false;
                            const newRetweetsCount = wasRetweeted 
                                ? Math.max(0, (post.retweetsCount || 0) - 1)
                                : (post.retweetsCount || 0) + 1;
                            return { 
                                ...post, 
                                retweetsCount: newRetweetsCount, 
                                isRetweeted: !wasRetweeted 
                            };
                        }
                        return post;
                    })
                );
            })
            .catch((err) => console.error('Erreur lors du retweet :', err));
    };

    
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
        const diffInDays = Math.floor(diffInHours / 24);

        if (diffInHours < 1) {
            const diffInMinutes = Math.floor((now - date) / (1000 * 60));
            return diffInMinutes < 1 ? 'maintenant' : `${diffInMinutes}m`;
        } else if (diffInHours < 24) {
            return `${diffInHours}h`;
        } else if (diffInDays < 7) {
            return `${diffInDays}j`;
        } else {
            return date.toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'short'
            });
        }
    };


    const loadComments = async (postId) => {
        if (comments[postId]) return;

        setLoadingComments(prev => ({ ...prev, [postId]: true }));
        
        try {
            const response = await fetch(`http://localhost:8000/api/tweet/${postId}/comments`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                setComments(prev => ({ ...prev, [postId]: data.comments }));
            }
        } catch (error) {
            console.error('Erreur lors du chargement des commentaires:', error);
        } finally {
            setLoadingComments(prev => ({ ...prev, [postId]: false }));
        }
    };


    const toggleComments = (postId) => {
        const isShowing = showComments[postId];
        
        if (!isShowing) {
            loadComments(postId);
        }
        
        setShowComments(prev => ({ ...prev, [postId]: !isShowing }));
    };


    const submitComment = async (postId) => {
        const content = commentText[postId];
        if (!content?.trim()) return;

        setCommentErrors(prev => ({ ...prev, [postId]: '' }));

        if (containsBannedWords(content)) {
            setCommentErrors(prev => ({ 
                ...prev, 
                [postId]: "Votre commentaire contient un mot interdit. Merci de respecter la communauté" 
            }));
            return;
        }

        try {
            const response = await fetch(`http://localhost:8000/api/tweet/${postId}/comment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ content: content.trim() })
            });

            if (response.ok) {
                const data = await response.json();
                setComments(prev => ({
                    ...prev,
                    [postId]: [...(prev[postId] || []), data.comment]
                }));
       
                setCommentText(prev => ({ ...prev, [postId]: '' }));
                
    
                setPosts(prevPosts =>
                    prevPosts.map(post =>
                        post.id === postId
                            ? { ...post, commentsCount: (post.commentsCount || 0) + 1 }
                            : post
                    )
                );
            }
        } catch (error) {
            console.error('Erreur lors de l\'ajout du commentaire:', error);
        }
    };

    if (loading) return <p>Chargement des tweets...</p>;
    if (error) return <p>Erreur : {error}</p>;

    return (
        <div className="home-posts">
            {posts.map((post) => (
                <div key={post.id} className="post">
                    <div className="post-header">
                        <div className="post-user">
                            {post.author?.photo ? (
                                <img 
                                    src={post.author.photo} 
                                    alt={`${post.author?.name || ''} ${post.author?.lastname || ''}`}
                                    className="avatar"
                                    style={{
                                        width: '48px',
                                        height: '48px',
                                        borderRadius: '50%',
                                        objectFit: 'cover',
                                        border: '2px solid #38444d'
                                    }}
                                />
                            ) : (
                                <div 
                                    className="avatar" 
                                    style={{
                                        width: '48px',
                                        height: '48px',
                                        borderRadius: '50%',
                                        backgroundColor: '#1da1f2',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                        fontWeight: 'bold',
                                        fontSize: '18px'
                                    }}
                                >
                                    {post.author?.name?.charAt(0)?.toUpperCase() || '?'}
                                    {post.author?.lastname?.charAt(0)?.toUpperCase() || ''}
                                </div>
                            )}
                            <div className="user-info">
                                <span className="username">
                                    {post.author?.name && post.author?.lastname 
                                        ? `${post.author.name} ${post.author.lastname}`
                                        : post.author?.pseudo || "Utilisateur"
                                    }
                                </span>
                                <span className="handle">@{post.author?.pseudo || "utilisateur"}</span>
                            </div>
                        </div>
                        <span className="post-time">{formatDate(post.createdAt)}</span>
                    </div>

                    <div className="post-content">
                        {post.title && (
                            <h4 style={{
                                color: 'white',
                                margin: '10px 0 5px 0',
                                fontSize: '16px',
                                fontWeight: '600'
                            }}>
                                {post.title}
                            </h4>
                        )}
                        
                        {post.content && (
                            <p style={{
                                color: '#e1e8ed',
                                margin: '5px 0 15px 0',
                                lineHeight: '1.5',
                                fontSize: '15px'
                            }}>
                                {post.content}
                            </p>
                        )}
                        
                        {post.picture && (
                            <img
                                src={
                                    post.picture.startsWith('http') 
                                        ? post.picture 
                                        : `http://localhost:8000/api/image/tweets/${post.picture.split('/').pop()}`
                                }
                                alt="Image du tweet"
                                className="tweet-media"
                                onError={(e) => {
                                    console.error('Erreur de chargement image:', post.picture);
                                    console.error('URL tentée:', e.target.src);
                                    if (!post.picture.startsWith('http')) {
                                        console.error('Nom du fichier extrait:', post.picture.split('/').pop());
                                    }
                                    e.target.style.display = 'none';
                                }}
                            />
                        )}
                        
                        <div className="post-actions" style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            maxWidth: '425px',
                            marginTop: '12px'
                        }}>
                            <div 
                                className="action-item"
                                onClick={() => toggleComments(post.id)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    cursor: 'pointer',
                                    padding: '8px',
                                    borderRadius: '20px',
                                    transition: 'background-color 0.2s',
                                    color: showComments[post.id] ? '#1da1f2' : '#8899a6'
                                }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(29, 155, 240, 0.1)'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                            >
                                <MessageSquare size={18} fill={showComments[post.id] ? '#1da1f2' : 'none'} />
                                <span style={{ fontSize: '13px' }}>{post.commentsCount || 0}</span>
                            </div>
                            
                            <div 
                                className="action-item"
                                onClick={() => handleRetweet(post.id)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    cursor: 'pointer',
                                    padding: '8px',
                                    borderRadius: '20px',
                                    transition: 'background-color 0.2s',
                                    color: post.isRetweeted ? '#00ba7c' : '#8899a6'
                                }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(0, 186, 124, 0.1)'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                            >
                                <Repeat2 size={18} color={post.isRetweeted ? '#00ba7c' : '#8899a6'} />
                                <span style={{ fontSize: '13px' }}>{post.retweetsCount || 0}</span>
                            </div>
                            
                            <div 
                                className="action-item"
                                onClick={() => handleLike(post.id)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    cursor: 'pointer',
                                    padding: '8px',
                                    borderRadius: '20px',
                                    transition: 'background-color 0.2s',
                                    color: post.isLiked ? '#e0245e' : '#8899a6'
                                }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(224, 36, 94, 0.1)'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                            >
                                <Heart size={18} fill={post.isLiked ? '#e0245e' : 'none'} color={post.isLiked ? '#e0245e' : '#8899a6'} />
                                <span style={{ fontSize: '13px' }}>{post.likesCount || 0}</span>
                            </div>
                        </div>

                        {/* Section de commentaires */}
                        {showComments[post.id] && (
                            <div style={{
                                marginTop: '15px',
                                borderTop: '1px solid #38444d',
                                paddingTop: '15px'
                            }}>
                                <div style={{
                                    display: 'flex',
                                    gap: '12px',
                                    marginBottom: '15px'
                                }}>
                                    <div style={{
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '50%',
                                        backgroundColor: '#1da1f2',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                        fontSize: '14px',
                                        fontWeight: 'bold'
                                    }}>
                                        U
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <textarea
                                            value={commentText[post.id] || ''}
                                            onChange={(e) => {
                                                setCommentText(prev => ({ 
                                                    ...prev, 
                                                    [post.id]: e.target.value 
                                                }));
                                                if (commentErrors[post.id]) {
                                                    setCommentErrors(prev => ({ ...prev, [post.id]: '' }));
                                                }
                                            }}
                                            placeholder={commentErrors[post.id] ? "Exprimez-vous dans le respect" : "Écrivez votre commentaire..."}
                                            style={{
                                                width: '100%',
                                                backgroundColor: 'transparent',
                                                border: 'none',
                                                color: 'white',
                                                fontSize: '15px',
                                                resize: 'none',
                                                outline: 'none',
                                                minHeight: '60px',
                                                padding: '8px'
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                                                    submitComment(post.id);
                                                }
                                            }}
                                        />
                                        
                                        {commentErrors[post.id] && (
                                            <div style={{
                                                color: '#f91880',
                                                fontSize: '14px',
                                                marginTop: '8px',
                                                padding: '8px 12px',
                                                backgroundColor: 'rgba(249, 24, 128, 0.1)',
                                                borderRadius: '8px',
                                                border: '1px solid rgba(249, 24, 128, 0.3)'
                                            }}>
                                                {commentErrors[post.id]}
                                            </div>
                                        )}

                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            marginTop: '8px'
                                        }}>
                                            <span style={{
                                                color: '#8899a6',
                                                fontSize: '12px'
                                            }}>
                                                Ctrl+Entrée pour publier
                                            </span>
                                            <button
                                                onClick={() => submitComment(post.id)}
                                                disabled={!commentText[post.id]?.trim() || commentErrors[post.id]}
                                                style={{
                                                    backgroundColor: commentErrors[post.id] 
                                                        ? '#f91880' 
                                                        : commentText[post.id]?.trim() 
                                                            ? '#1da1f2' 
                                                            : '#1d3951',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '20px',
                                                    padding: '6px 16px',
                                                    fontSize: '14px',
                                                    fontWeight: 'bold',
                                                    cursor: (!commentText[post.id]?.trim() || commentErrors[post.id]) ? 'default' : 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '6px',
                                                    opacity: (!commentText[post.id]?.trim() || commentErrors[post.id]) ? 0.6 : 1
                                                }}
                                            >
                                                <Send size={14} />
                                                {commentErrors[post.id] ? 'Contenu interdit' : 'Publier'}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Liste des commentaires */}
                                {loadingComments[post.id] ? (
                                    <div style={{ color: '#8899a6', textAlign: 'center', padding: '20px' }}>
                                        Chargement des commentaires...
                                    </div>
                                ) : (
                                    <div>
                                        {(comments[post.id] || []).map((comment) => (
                                            <div key={comment.id} style={{
                                                display: 'flex',
                                                gap: '12px',
                                                marginBottom: '12px',
                                                padding: '12px',
                                                backgroundColor: '#192734',
                                                borderRadius: '12px'
                                            }}>
                                                {comment.author?.photo ? (
                                                    <img 
                                                        src={comment.author.photo}
                                                        alt="Avatar"
                                                        style={{
                                                            width: '32px',
                                                            height: '32px',
                                                            borderRadius: '50%',
                                                            objectFit: 'cover'
                                                        }}
                                                    />
                                                ) : (
                                                    <div style={{
                                                        width: '32px',
                                                        height: '32px',
                                                        borderRadius: '50%',
                                                        backgroundColor: '#1da1f2',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        color: 'white',
                                                        fontSize: '12px',
                                                        fontWeight: 'bold'
                                                    }}>
                                                        {comment.author?.name?.charAt(0) || '?'}
                                                    </div>
                                                )}
                                                <div style={{ flex: 1 }}>
                                                    <div style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '8px',
                                                        marginBottom: '4px'
                                                    }}>
                                                        <span style={{
                                                            color: 'white',
                                                            fontWeight: 'bold',
                                                            fontSize: '14px'
                                                        }}>
                                                            {comment.author?.name && comment.author?.lastname 
                                                                ? `${comment.author.name} ${comment.author.lastname}`
                                                                : comment.author?.pseudo || "Utilisateur"
                                                            }
                                                        </span>
                                                        <span style={{
                                                            color: '#8899a6',
                                                            fontSize: '13px'
                                                        }}>
                                                            @{comment.author?.pseudo || "utilisateur"}
                                                        </span>
                                                        <span style={{
                                                            color: '#8899a6',
                                                            fontSize: '13px'
                                                        }}>
                                                            {formatDate(comment.createdAt)}
                                                        </span>
                                                    </div>
                                                    <p style={{
                                                        color: '#e1e8ed',
                                                        margin: 0,
                                                        fontSize: '14px',
                                                        lineHeight: '1.4'
                                                    }}>
                                                        {comment.content}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                        
                                        {comments[post.id]?.length === 0 && (
                                            <div style={{
                                                color: '#8899a6',
                                                textAlign: 'center',
                                                padding: '20px',
                                                fontStyle: 'italic'
                                            }}>
                                                Aucun commentaire pour le moment
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default HomePosts;
