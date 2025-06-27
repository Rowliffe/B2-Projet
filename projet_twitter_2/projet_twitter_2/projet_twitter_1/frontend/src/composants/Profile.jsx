import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Heart, MessageSquare, Repeat2, X, ArrowLeft, LogOut } from 'lucide-react';
import '../styles/profile.css';
import '../styles/home.css';

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [userTweets, setUserTweets] = useState([]);
    const [userLikes, setUserLikes] = useState([]);
    const [userRetweets, setUserRetweets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [tweetsLoading, setTweetsLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('tweets'); // tweets, likes, retweets
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const navigate = useNavigate();

    // Fonction de déconnexion
    const handleLogout = () => {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        navigate('/login');
    };

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }

        // Récupérer les informations du profil
        const fetchProfile = fetch('http://localhost:8000/api/profile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        // Récupérer les tweets de l'utilisateur
        const fetchTweets = fetch('http://localhost:8000/api/my-tweets', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        // Récupérer les likes de l'utilisateur
        const fetchLikes = fetch('http://localhost:8000/api/my-likes', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        // Récupérer les retweets de l'utilisateur
        const fetchRetweets = fetch('http://localhost:8000/api/my-retweets', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        // Exécuter toutes les requêtes en parallèle
        Promise.all([fetchProfile, fetchTweets, fetchLikes, fetchRetweets])
            .then(async ([profileRes, tweetsRes, likesRes, retweetsRes]) => {
                // Traiter la réponse du profil
                if (!profileRes.ok) {
                    if (profileRes.status === 401) {
                        localStorage.removeItem('token');
                        sessionStorage.removeItem('token');
                        navigate('/login');
                        throw new Error('Token invalide');
                    }
                    throw new Error('Erreur chargement profil');
                }

                const profileData = await profileRes.json();
                const tweetsData = tweetsRes.ok ? await tweetsRes.json() : { tweets: [], count: 0 };
                const likesData = likesRes.ok ? await likesRes.json() : { likes: [], count: 0 };
                const retweetsData = retweetsRes.ok ? await retweetsRes.json() : { retweets: [], count: 0 };

                setUserData(profileData.user);
                setUserTweets(tweetsData.tweets || []);
                setUserLikes(likesData.likes || []);
                setUserRetweets(retweetsData.retweets || []);
                setLoading(false);
                setTweetsLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
                setTweetsLoading(false);
            });
    }, [token, navigate]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Fonction pour supprimer un tweet
    const handleDeleteTweet = async (tweetId) => {
        console.log('=== SUPPRESSION TWEET ===');
        console.log('Tweet ID:', tweetId);
        console.log('Token:', token ? 'Présent' : 'Absent');
        
        if (!confirm("Êtes-vous sûr de vouloir supprimer ce tweet ?")) {
            return;
        }

        try {
            console.log('URL appelée:', `http://localhost:8000/api/tweet/delete/${tweetId}`);
            
            const response = await fetch(`http://localhost:8000/api/tweet/delete/${tweetId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            console.log('Status de la réponse:', response.status);
            console.log('Headers de la réponse:', [...response.headers.entries()]);
            
            const responseText = await response.text();
            console.log('Contenu de la réponse:', responseText);

            if (response.ok) {
                console.log('Suppression réussie');
                // Supprimer le tweet de la liste locale
                setUserTweets(prevTweets => {
                    const newTweets = prevTweets.filter(tweet => tweet.id !== tweetId);
                    console.log('Tweets avant:', prevTweets.length, 'après:', newTweets.length);
                    return newTweets;
                });
                alert("Tweet supprimé avec succès !");
            } else {
                console.error('Erreur HTTP:', response.status, response.statusText);
                alert(`Erreur lors de la suppression: ${response.status} - ${responseText}`);
            }
        } catch (error) {
            console.error('Erreur de réseau:', error);
            alert("Erreur de connexion lors de la suppression du tweet");
        }
    };

    const TweetCard = ({ tweet }) => {
        const handleLike = (tweetId) => {
            fetch(`http://localhost:8000/api/tweet/like/${tweetId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => res.json())
                .then(() => {
                    // Mise à jour optimiste des tweets
                    setUserTweets(prevTweets =>
                        prevTweets.map(t => {
                            if (t.id === tweetId) {
                                const wasLiked = t.isLiked || false;
                                const newLikesCount = wasLiked 
                                    ? Math.max(0, (t.likesCount || 0) - 1) 
                                    : (t.likesCount || 0) + 1;
                                return { 
                                    ...t, 
                                    likesCount: newLikesCount, 
                                    isLiked: !wasLiked 
                                };
                            }
                            return t;
                        })
                    );
                })
                .catch((err) => console.error('Erreur lors du like :', err));
        };

        const handleRetweet = (tweetId) => {
            fetch(`http://localhost:8000/api/tweet/retweet/${tweetId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(res => res.json())
                .then(() => {
                    // Mise à jour optimiste des tweets
                    setUserTweets(prevTweets =>
                        prevTweets.map(t => {
                            if (t.id === tweetId) {
                                const wasRetweeted = t.isRetweeted || false;
                                const newRetweetsCount = wasRetweeted 
                                    ? Math.max(0, (t.retweetsCount || 0) - 1)
                                    : (t.retweetsCount || 0) + 1;
                                return { 
                                    ...t, 
                                    retweetsCount: newRetweetsCount, 
                                    isRetweeted: !wasRetweeted 
                                };
                            }
                            return t;
                        })
                    );
                })
                .catch((err) => console.error('Erreur lors du retweet :', err));
        };

    return (
            <div className="tweet-card" style={{ position: 'relative' }}>
                {/* Croix de suppression en haut à droite */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteTweet(tweet.id);
                    }}
                    style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '4px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'background-color 0.2s',
                        opacity: 0.7,
                        zIndex: 10
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.backgroundColor = 'rgba(224, 36, 94, 0.15)';
                        e.target.style.opacity = '1';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'transparent';
                        e.target.style.opacity = '0.7';
                    }}
                    title="Supprimer ce tweet"
                >
                    <X size={18} color="white" />
                </button>
                
                <div className="tweet-header">
                    <div className="tweet-author">
                        {tweet.author?.photo ? (
                            <img src={tweet.author.photo} alt="Avatar" className="tweet-avatar" />
                        ) : (
                            <div className="tweet-avatar-placeholder">
                                {tweet.author?.name?.charAt(0)}{tweet.author?.lastname?.charAt(0)}
                            </div>
                        )}
                        <div className="tweet-author-info">
                            <span className="tweet-author-name">
                                {tweet.author?.name} {tweet.author?.lastname}
                            </span>
                            <span className="tweet-author-pseudo">@{tweet.author?.pseudo}</span>
                            <span className="tweet-date">{formatDate(tweet.createdAt)}</span>
                        </div>
                    </div>
                </div>
                <div className="tweet-content">
                    <h4 className="tweet-title">{tweet.title}</h4>
                    <p className="tweet-text">{tweet.content}</p>
                                            {tweet.picture && (
                            <img 
                                src={
                                    tweet.picture.startsWith('http') 
                                        ? tweet.picture 
                                        : `http://localhost:8000/api/image/tweets/${tweet.picture.split('/').pop()}`
                                } 
                                alt="Image du tweet" 
                                className="tweet-image"
                                onError={(e) => {
                                    console.error('Erreur de chargement image:', tweet.picture);
                                    console.error('URL tentée:', e.target.src);
                                    if (!tweet.picture.startsWith('http')) {
                                        console.error('Nom du fichier extrait:', tweet.picture.split('/').pop());
                                    }
                                    e.target.style.display = 'none';
                                }}
                            />
                        )}
                </div>
                <div className="tweet-actions" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    maxWidth: '300px',
                    marginTop: '12px'
                }}>
                    <div 
                        className="action-item"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            cursor: 'pointer',
                            padding: '6px',
                            borderRadius: '15px',
                            transition: 'background-color 0.2s',
                            color: '#8899a6'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(29, 155, 240, 0.1)'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                    >
                        <MessageSquare size={16} />
                        <span style={{ fontSize: '12px' }}>{tweet.commentsCount || 0}</span>
                    </div>
                    
                    <div 
                        className="action-item"
                        onClick={() => handleRetweet(tweet.id)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            cursor: 'pointer',
                            padding: '6px',
                            borderRadius: '15px',
                            transition: 'background-color 0.2s',
                            color: tweet.isRetweeted ? '#00ba7c' : '#8899a6'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(0, 186, 124, 0.1)'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                    >
                        <Repeat2 size={16} color={tweet.isRetweeted ? '#00ba7c' : '#8899a6'} />
                        <span style={{ fontSize: '12px' }}>{tweet.retweetsCount || 0}</span>
                    </div>
                    
                    <div 
                        className="action-item"
                        onClick={() => handleLike(tweet.id)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            cursor: 'pointer',
                            padding: '6px',
                            borderRadius: '15px',
                            transition: 'background-color 0.2s',
                            color: tweet.isLiked ? '#e0245e' : '#8899a6'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(224, 36, 94, 0.1)'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                    >
                        <Heart size={16} fill={tweet.isLiked ? '#e0245e' : 'none'} color={tweet.isLiked ? '#e0245e' : '#8899a6'} />
                        <span style={{ fontSize: '12px' }}>{tweet.likesCount || 0}</span>
                    </div>
                </div>
            </div>
        );
    };

    const LikedTweetCard = ({ likedTweet }) => (
        <div className="tweet-card">
            <div className="tweet-header">
                <div className="tweet-author">
                    {likedTweet.author?.photo ? (
                        <img src={likedTweet.author.photo} alt="Avatar" className="tweet-avatar" />
                    ) : (
                        <div className="tweet-avatar-placeholder">
                            {likedTweet.author?.name?.charAt(0)}{likedTweet.author?.lastname?.charAt(0)}
                        </div>
                    )}
                    <div className="tweet-author-info">
                        <span className="tweet-author-name">
                            {likedTweet.author?.name} {likedTweet.author?.lastname}
                        </span>
                        <span className="tweet-author-pseudo">@{likedTweet.author?.pseudo}</span>
                        <span className="tweet-date">{formatDate(likedTweet.createdAt)}</span>
                    </div>
                </div>
            </div>
            <div className="tweet-content">
                {likedTweet.title && <h4 className="tweet-title">{likedTweet.title}</h4>}
                <p className="tweet-text">{likedTweet.content}</p>
                {likedTweet.picture && (
                    <img 
                        src={
                            likedTweet.picture.startsWith('http') 
                                ? likedTweet.picture 
                                : `http://localhost:8000/api/image/tweets/${likedTweet.picture.split('/').pop()}`
                        } 
                        alt="Image du tweet"
                        className="tweet-image"
                        onError={(e) => {
                            console.error('Erreur de chargement image:', likedTweet.picture);
                            console.error('URL tentée:', e.target.src);
                            if (!likedTweet.picture.startsWith('http')) {
                                console.error('Nom du fichier extrait:', likedTweet.picture.split('/').pop());
                            }
                            e.target.style.display = 'none';
                        }}
                    />
                )}
                <div style={{ 
                    fontSize: '13px', 
                    color: '#e0245e', 
                    marginTop: '8px',
                    fontStyle: 'italic',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                }}>
                    <Heart size={12} fill="#e0245e" />
                    Vous avez aimé ce tweet
                    {likedTweet.likedAt && (
                        <span style={{ color: '#8899a6' }}>
                            • {formatDate(likedTweet.likedAt)}
                        </span>
                    )}
                </div>
            </div>
            <div className="tweet-actions" style={{
                display: 'flex',
                justifyContent: 'space-between',
                maxWidth: '300px',
                marginTop: '12px'
            }}>
                <div 
                    className="action-item"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        cursor: 'pointer',
                        padding: '6px',
                        borderRadius: '15px',
                        transition: 'background-color 0.2s',
                        color: '#8899a6'
                    }}
                >
                    <MessageSquare size={16} />
                    <span style={{ fontSize: '12px' }}>{likedTweet.commentsCount || 0}</span>
                </div>
                
                <div 
                    className="action-item"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        cursor: 'pointer',
                        padding: '6px',
                        borderRadius: '15px',
                        transition: 'background-color 0.2s',
                        color: likedTweet.isRetweeted ? '#00ba7c' : '#8899a6'
                    }}
                >
                    <Repeat2 size={16} color={likedTweet.isRetweeted ? '#00ba7c' : '#8899a6'} />
                    <span style={{ fontSize: '12px' }}>{likedTweet.retweetsCount || 0}</span>
                </div>
                
                <div 
                    className="action-item"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        cursor: 'pointer',
                        padding: '6px',
                        borderRadius: '15px',
                        transition: 'background-color 0.2s',
                        color: '#e0245e'
                    }}
                >
                    <Heart size={16} fill="#e0245e" color="#e0245e" />
                    <span style={{ fontSize: '12px' }}>{likedTweet.likesCount || 0}</span>
                </div>
            </div>
        </div>
    );

    const getCurrentContent = () => {
        if (tweetsLoading) return <div className="tweets-loading">Chargement...</div>;

        let content = [];
        let emptyMessage = '';

        switch (activeTab) {
            case 'tweets':
                content = userTweets;
                emptyMessage = 'Aucun tweet pour le moment...';
                break;
            case 'likes':
                content = userLikes;
                emptyMessage = 'Aucun tweet liké pour le moment...';
                break;
            case 'retweets':
                content = userRetweets;
                emptyMessage = 'Aucun retweet pour le moment...';
                break;
            default:
                content = userTweets;
                emptyMessage = 'Aucun contenu pour le moment...';
        }

        if (content.length === 0) {
            return (
                <div className="tweets-placeholder">
                    <p>{emptyMessage}</p>
                    {activeTab === 'tweets' && (
                        <Link to="/add-tweet" className="add-tweet-link">
                            Créer votre premier tweet !
                        </Link>
                    )}
                </div>
            );
        }

        return (
            <div className="tweets-list">
                {content.map(item => {
                    if (activeTab === 'likes') {
                        return <LikedTweetCard key={item.id} likedTweet={item} />;
                    } else {
                        return <TweetCard key={item.id} tweet={item} />;
                    }
                })}
            </div>
        );
    };

    if (loading) return (
        <div style={{
            backgroundColor: '#15202b',
            minHeight: '100vh',
            paddingTop: '80px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white'
        }}>
            Chargement...
        </div>
    );
    
    if (error) return (
        <div style={{
            backgroundColor: '#15202b',
            minHeight: '100vh',
            paddingTop: '80px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white'
        }}>
            <div className="error">{error}</div>
        </div>
    );
    
    if (!userData) return (
        <div style={{
            backgroundColor: '#15202b',
            minHeight: '100vh',
            paddingTop: '80px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white'
        }}>
            Aucune donnée utilisateur trouvée
        </div>
    );

    return (
        <div style={{
            backgroundColor: '#15202b',
            minHeight: '100vh',
            paddingTop: '20px'
        }}>
            {/* Boutons de navigation */}
            <div style={{
                position: 'fixed',
                top: '0',
                left: '0',
                right: '0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                zIndex: 1000,
                backgroundColor: 'rgba(21, 32, 43, 0.98)',
                padding: '15px 30px',
                borderBottom: '1px solid #38444d',
                backdropFilter: 'blur(15px)',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
            }}>
                <button
                    onClick={() => navigate('/home')}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        backgroundColor: 'transparent',
                        border: '1px solid #1da1f2',
                        color: '#1da1f2',
                        padding: '8px 16px',
                        borderRadius: '20px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '500',
                        transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => {
                        e.target.style.backgroundColor = 'rgba(29, 161, 242, 0.1)';
                    }}
                    onMouseOut={(e) => {
                        e.target.style.backgroundColor = 'transparent';
                    }}
                >
                    <ArrowLeft size={16} />
                    Retour
                </button>

                <button
                    onClick={handleLogout}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        backgroundColor: 'transparent',
                        border: '1px solid #e0245e',
                        color: '#e0245e',
                        padding: '8px 16px',
                        borderRadius: '20px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '500',
                        transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => {
                        e.target.style.backgroundColor = 'rgba(224, 36, 94, 0.1)';
                    }}
                    onMouseOut={(e) => {
                        e.target.style.backgroundColor = 'transparent';
                    }}
                >
                    <LogOut size={16} />
                    Déconnexion
                </button>
            </div>

            <div className="profile-container" style={{ margin: '0 auto', maxWidth: '800px', paddingTop: '100px' }}>
                <div className="profile-header">
                    <div className="profile-photo">
                        {userData.photo ? (
                            <img src={userData.photo} alt="Photo de profil" className="profile-image" />
                        ) : (
                            <div className="profile-placeholder">
                                {userData.name?.charAt(0)}{userData.lastname?.charAt(0)}
                            </div>
                        )}
                    </div>
                    <div className="profile-info">
                        <h1 className="profile-name">{userData.name} {userData.lastname}</h1>
                        <p className="profile-pseudo">@{userData.pseudo}</p>
                        {userData.bio && <p className="profile-bio">{userData.bio}</p>}
                    </div>
                    <div className="profile-actions">
                        <Link to="/profile/edit" className="edit-profile-btn">
                            Modifier le profil
                        </Link>
                    </div>
                </div>

                <div className="profile-details">
                    <div className="profile-stats">
                        <div className="stat-item">
                            <span className="stat-number">{userTweets.length}</span>
                            <span className="stat-label">Tweets</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">0</span>
                            <span className="stat-label">Abonnements</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">0</span>
                            <span className="stat-label">Abonnés</span>
                        </div>
                    </div>

                    <div className="profile-metadata">
                        <div className="metadata-item">
                            <span className="metadata-label">Email:</span>
                            <span className="metadata-value">{userData.email}</span>
                        </div>
                        {userData.phone && (
                            <div className="metadata-item">
                                <span className="metadata-label">Téléphone:</span>
                                <span className="metadata-value">{userData.phone}</span>
                            </div>
                        )}
                        <div className="metadata-item">
                            <span className="metadata-label">Pays:</span>
                            <span className="metadata-value">{userData.country}</span>
                        </div>
                        {userData.birthday && (
                            <div className="metadata-item">
                                <span className="metadata-label">Date de naissance:</span>
                                <span className="metadata-value">
                                    {new Date(userData.birthday).toLocaleDateString('fr-FR')}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Onglets de navigation */}
                <div className="profile-tabs" style={{
                    display: 'flex',
                    borderBottom: '1px solid #38444d',
                    marginBottom: '20px',
                    backgroundColor: '#192734'
                }}>
                    <button
                        className={`profile-tab ${activeTab === 'tweets' ? 'active' : ''}`}
                        onClick={() => setActiveTab('tweets')}
                        style={{
                            flex: 1,
                            padding: '15px 20px',
                            background: 'transparent',
                            border: 'none',
                            color: activeTab === 'tweets' ? '#1da1f2' : '#8899a6',
                            fontWeight: activeTab === 'tweets' ? 'bold' : 'normal',
                            borderBottom: activeTab === 'tweets' ? '2px solid #1da1f2' : '2px solid transparent',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        Tweets ({userTweets.length})
                    </button>
                    <button
                        className={`profile-tab ${activeTab === 'likes' ? 'active' : ''}`}
                        onClick={() => setActiveTab('likes')}
                        style={{
                            flex: 1,
                            padding: '15px 20px',
                            background: 'transparent',
                            border: 'none',
                            color: activeTab === 'likes' ? '#1da1f2' : '#8899a6',
                            fontWeight: activeTab === 'likes' ? 'bold' : 'normal',
                            borderBottom: activeTab === 'likes' ? '2px solid #1da1f2' : '2px solid transparent',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        Likes ({userLikes.length})
                    </button>
                    <button
                        className={`profile-tab ${activeTab === 'retweets' ? 'active' : ''}`}
                        onClick={() => setActiveTab('retweets')}
                        style={{
                            flex: 1,
                            padding: '15px 20px',
                            background: 'transparent',
                            border: 'none',
                            color: activeTab === 'retweets' ? '#1da1f2' : '#8899a6',
                            fontWeight: activeTab === 'retweets' ? 'bold' : 'normal',
                            borderBottom: activeTab === 'retweets' ? '2px solid #1da1f2' : '2px solid transparent',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        Retweets ({userRetweets.length})
                    </button>
                </div>

                {/* Contenu de l'onglet actif */}
                <div className="profile-tweets">
                    {getCurrentContent()}
                </div>
                </div>
        </div>
    );
};

export default Profile;
