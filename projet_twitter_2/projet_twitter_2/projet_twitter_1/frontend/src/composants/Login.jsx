// LoginPage.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/login.css';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Vérifie si un token est stocké
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            navigate('/home');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const csrfToken = await fetch("http://localhost:8000/api/csrf-token")
                .then(res => res.json());

            const response = await fetch('http://localhost:8000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    _email: username,
                    _password: password,
                    _csrf_token: csrfToken.csrfToken
                })
            }).then(res => res.json());

            if (response.token) {
                if (rememberMe) {
                    localStorage.setItem('token', response.token);
                } else {
                    sessionStorage.setItem('token', response.token);
                }

                navigate('/home');
            } else {
                alert("Échec de la connexion.");
            }
        } catch (error) {
            console.error("Erreur lors de la connexion:", error);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="avatar-container">
                    <div className="avatar">
                        <span className="avatar-letter">L</span>
                    </div>
                </div>
                <form className="form-container" onSubmit={handleSubmit}>
                    <div className="field-group">
                        <div className="field-label">Nom d'utilisateur</div>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="form-input"
                        />
                    </div>
                    <div className="field-group">
                        <div className="field-label">Mot de passe</div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-input"
                        />
                    </div>
                    <div className="options-row">
                        <div className="checkbox-container">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="form-checkbox"
                                id="remember-me"
                            />
                            <label htmlFor="remember-me">Se souvenir de moi</label>
                        </div>
                        <Link to="/register" className="forgot-password-btn">
                            Pas encore inscrit&nbsp;?
                        </Link>
                    </div>
                    <button type="submit" className="submit-btn">
                        Se connecter
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
