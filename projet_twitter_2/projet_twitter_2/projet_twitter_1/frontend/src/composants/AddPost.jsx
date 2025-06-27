import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, MessageCircle, Search, Settings, User, X } from "lucide-react";
import '../styles/addpost.css';
import ResponsiveSidebar from "./ResponsiveSidebar";


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

const CreationPost = ({ setText, text, setTitle, title, onPublish, isPublishing, imageUrl, setImageUrl, moderationError }) => {
    const maxChars = 128;



    const removeImageUrl = () => {
        setImageUrl("");
    };

    return (
        <div className="creation-post-card">
            <div className="creation-post-header">
                <span>Créer un post</span>
                <i className="bi bi-calendar ms-2"></i>
                <button 
                    className="creation-post-publish-btn" 
                    onClick={onPublish}
                    disabled={isPublishing || moderationError}
                    style={{
                        opacity: (isPublishing || moderationError) ? 0.6 : 1,
                        cursor: (isPublishing || moderationError) ? 'not-allowed' : 'pointer',
                        backgroundColor: moderationError ? '#e0245e' : '#1da1f2'
                    }}
                >
                    {isPublishing ? 'Publication...' : moderationError ? 'Contenu interdit' : 'Publier'}
                </button>
            </div>
            <div className="creation-post-body">
                <div className="creation-post-avatar"></div>
                <div className="creation-post-content">
                    <div className="creation-post-username">User 1</div>
                    <input
                        type="text"
                        className="creation-post-title"
                        placeholder="Titre de votre post (max 15 caractères)"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        maxLength={15}
                        required
                    />
                    <textarea
                        className="creation-post-textarea"
                        placeholder="Que voulez-vous partager ? (Exprimez-vous dans le respect)"
                        maxLength={maxChars}
                        value={text}
                        onChange={e => setText(e.target.value)}
                        required
                    />
                    
                    
                    {moderationError && (
                        <div style={{
                            background: 'rgba(224, 36, 94, 0.1)',
                            border: '1px solid rgba(224, 36, 94, 0.3)',
                            borderRadius: '8px',
                            padding: '12px',
                            marginTop: '10px',
                            color: '#e0245e',
                            fontSize: '14px',
                            fontWeight: '500'
                        }}>
                            {moderationError}
                        </div>
                    )}
                    
                
                    <input
                        type="url"
                        className="creation-post-image-url"
                        placeholder="URL d'une image (optionnel)"
                        value={imageUrl}
                        onChange={e => setImageUrl(e.target.value)}
                        style={{
                            background: '#22303c',
                            border: '1px solid #38444d',
                            borderRadius: '8px',
                            padding: '8px 12px',
                            color: '#fff',
                            fontSize: '14px',
                            marginTop: '10px',
                            width: '100%'
                        }}
                    />
                    

                    {imageUrl && (
                        <div style={{
                            position: 'relative',
                            marginTop: '10px',
                            borderRadius: '10px',
                            overflow: 'hidden',
                            border: '1px solid #38444d'
                        }}>
                            <img 
                                src={imageUrl} 
                                alt="Aperçu depuis URL" 
                                style={{
                                    width: '100%',
                                    maxWidth: '500px',
                                    maxHeight: '250px',
                                    objectFit: 'cover'
                                }}
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                }}
                            />
                            <button
                                onClick={removeImageUrl}
                                style={{
                                    position: 'absolute',
                                    top: '10px',
                                    right: '10px',
                                    background: 'rgba(0,0,0,0.7)',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: '30px',
                                    height: '30px',
                                    color: 'white',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <X size={16} />
                            </button>
                        </div>
                    )}
                    

                </div>
            </div>
            <hr className="creation-post-separator" />
            <div className="creation-post-footer">
                <div className="creation-post-icons">
                    <i className="bi bi-camera"></i>
                    <i className="bi bi-emoji-smile"></i>
                    <i className="bi bi-geo-alt"></i>
                </div>
                <span className="creation-post-counter">{text.length} / {maxChars}</span>
            </div>
        </div>
    );
};

const Apercu = ({ title, text, image }) => (
    <div className="apercu-col">
        <span className="apercu-title">Aperçu</span>
        <div className="apercu-card">
            <div className="apercu-card-header">
                <div className="apercu-avatar"></div>
                <div>
                    <div className="apercu-username">User  1</div>
                    <div className="apercu-time">À l’instant</div>
                </div>
            </div>
            <div className="apercu-card-body">
                <h3>{title ? title : "Titre de votre post"}</h3>
                <p>{text ? text : "Voici votre post"}</p>

            </div>
        </div>
    </div>
);

const Sidebar = ({ activeTab }) => (
    <div className="sidebar">
        <div className="sidebar-logo">
            <span>L</span>
        </div>
        <Link to="/home" className={`sidebar-item${activeTab === 'home' ? ' active' : ''}`}>
            <Home size={24} />
            <span>Home</span>
        </Link>
        <Link to="/messages" className={`sidebar-item${activeTab === 'messages' ? ' active' : ''}`}>
            <MessageCircle size={24} />
            <span>Messages</span>
        </Link>
        <Link to="/search" className={`sidebar-item${activeTab === 'search' ? ' active' : ''}`}>
            <Search size={24} />
            <span>Search</span>
        </Link>
        <Link to="/settings" className={`sidebar-item${activeTab === 'settings' ? ' active' : ''}`}>
            <Settings size={24} />
            <span>Settings</span>
        </Link>
        <Link to="/profile" className={`sidebar-item${activeTab === 'profile' ? ' active' : ''}`}>
            <User  size={24} />
            <span>Profile</span>
        </Link>
        <button className="add-post-btn">ADD A POST</button>
    </div>
);


const containsBannedWords = (text) => {
    const lower = text.toLowerCase();
    return bannedWords.some(word => lower.includes(word));
};

const CreatePost = () => {
    const [text, setText] = useState("");
    const [title, setTitle] = useState("");

    const [imageUrl, setImageUrl] = useState("");
    const [isPublishing, setIsPublishing] = useState(false);
    const [moderationError, setModerationError] = useState("");

    const activeTab = "home";
    const navigate = useNavigate();



    const handlePublish = async () => {
        setModerationError("");

        if (!title.trim() || !text.trim()) {
            alert("Le titre et le contenu sont obligatoires.");
            return;
        }

        if (containsBannedWords(title) || containsBannedWords(text)) {
            setModerationError("Votre message contient un mot interdit. Merci de modifier votre contenu pour respecter la communauté");
            return;
        }

        let token = localStorage.getItem("token") || sessionStorage.getItem("token");
        console.log(token);

        if (!token) {
            alert("Vous devez être connecté pour publier.");
            return;
        }

        setIsPublishing(true);

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", text);
        if (imageUrl.trim()) {
            formData.append("imageUrl", imageUrl);
        }

        try {
            const response = await fetch("http://localhost:8000/api/tweets", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Erreur de la réponse:", errorText);
                
                try {
                    const errorJson = JSON.parse(errorText);
                    alert(errorJson.error || `Erreur ${response.status}`);
                } catch {
                    alert(`Erreur ${response.status}: ${errorText}`);
                }
                return;
            }

            const result = await response.json();
            console.log("Tweet créé avec succès:", result);

            setText("");
            setTitle("");
            setImageUrl("");
            
            navigate("/home");
        } catch (error) {
            console.error("Erreur :", error);
            alert("Erreur réseau. Vérifiez que le serveur est en cours d'exécution.");
        } finally {
            setIsPublishing(false);
        }
    };

    return (
        <div className="twitter-app" style={{ display: "flex" }}>
            <Sidebar activeTab={activeTab} />
            <main className="post-main" style={{ display: "flex", flexDirection: "row", gap: "2rem", padding: "2rem" }}>
                <CreationPost
                    setText={(value) => {
                        setText(value);
                        if (moderationError) setModerationError("");
                    }}
                    text={text}
                    setTitle={(value) => {
                        setTitle(value);
                        if (moderationError) setModerationError("");
                    }}
                    title={title}
                    onPublish={handlePublish}
                    isPublishing={isPublishing}
                    imageUrl={imageUrl}
                    setImageUrl={setImageUrl}
                    moderationError={moderationError}
                />
                <Apercu title={title} text={text} />
            </main>
            <ResponsiveSidebar activeTab={activeTab} />

        </div>
    );
};

export default CreatePost;