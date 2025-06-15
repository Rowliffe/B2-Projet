import React, { useState } from 'react';
import '../styles/login.css';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Connexion:', { username, password, rememberMe });
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="avatar-container">
                    <div className="avatar">
                        <span className="avatar-letter">L</span>
                    </div>
                </div>
                <div className="form-container">
                    <div className="field-group">
                        <div className="field-label">
                            Nom d'utilisateur
                        </div>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="form-input"
                            placeholder=""
                        />
                    </div>
                    <div className="field-group">
                        <div className="field-label">
                            Mot de passe
                        </div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-input"
                            placeholder=""
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
                            <label htmlFor="remember-me" className="checkbox-label">
                                Se Souvenir de moi
                            </label>
                        </div>
                        <button
                            onClick={() => console.log('Mot de passe oublié')}
                            className="forgot-password-btn"
                        >
                            mot de passe oublié
                        </button>
                    </div>
                    <button
                        onClick={handleSubmit}
                        className="submit-btn"
                    >
                        Se Connecter
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;