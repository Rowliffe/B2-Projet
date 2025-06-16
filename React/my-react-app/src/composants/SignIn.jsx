import React, { useState } from 'react';
import '../styles/register.css'; // On réutilise le même fichier de styles

const RegisterPage = () => {
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Les mots de passe ne correspondent pas !");
            return;
        }

        console.log('Inscription :', { fullName, username, email, password });
        // Tu pourras ensuite envoyer ça à ton backend
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
                        <div className="field-label">Nom complet</div>
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="form-input"
                            placeholder=""
                        />
                    </div>

                    <div className="field-group">
                        <div className="field-label">Nom d'utilisateur</div>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="form-input"
                            placeholder=""
                        />
                    </div>

                    <div className="field-group">
                        <div className="field-label">Adresse e-mail</div>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-input"
                            placeholder=""
                        />
                    </div>

                    <div className="field-group">
                        <div className="field-label">Mot de passe</div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-input"
                            placeholder=""
                        />
                    </div>

                    <div className="field-group">
                        <div className="field-label">Confirmer le mot de passe</div>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="form-input"
                            placeholder=""
                        />
                    </div>

                    <button onClick={handleSubmit} className="submit-btn">
                        S'inscrire
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
