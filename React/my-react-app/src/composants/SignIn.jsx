import React, { useState } from 'react';
import '../styles/register.css';

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [roles, setRoles] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [pseudo, setPseudo] = useState('');
    const [phone, setPhone] = useState('');
    const [bio, setBio] = useState('');
    const [birthday, setBirthday] = useState('');
    const [country, setCountry] = useState('');
    const [photo, setPhoto] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Les mots de passe ne correspondent pas !");
            return;
        }

        const formData = {
            email,
            roles,
            password,
            name,
            lastname,
            pseudo,
            phone,
            bio,
            birthday,
            country,
            photo
        };

        console.log('Inscription :', formData);
        // Tu pourras ensuite envoyer formData à ton backend
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="avatar-container">
                    <div className="avatar">
                        <span className="avatar-letter">L</span>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="form-container">
                    <div className="field-group">
                        <div className="field-label">Adresse e-mail</div>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-input" />
                    </div>

                    <div className="field-group">
                        <div className="field-label">Rôle</div>
                        <input type="text" value={roles} onChange={(e) => setRoles(e.target.value)} className="form-input" />
                    </div>

                    <div className="field-group">
                        <div className="field-label">Mot de passe</div>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-input" />
                    </div>

                    <div className="field-group">
                        <div className="field-label">Confirmer le mot de passe</div>
                        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="form-input" />
                    </div>

                    <div className="field-group">
                        <div className="field-label">Nom</div>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-input" />
                    </div>

                    <div className="field-group">
                        <div className="field-label">Prénom</div>
                        <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} className="form-input" />
                    </div>

                    <div className="field-group">
                        <div className="field-label">Pseudo</div>
                        <input type="text" value={pseudo} onChange={(e) => setPseudo(e.target.value)} className="form-input" />
                    </div>

                    <div className="field-group">
                        <div className="field-label">Téléphone</div>
                        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-input" />
                    </div>

                    <div className="field-group">
                        <div className="field-label">Bio</div>
                        <textarea value={bio} onChange={(e) => setBio(e.target.value)} className="form-input" />
                    </div>

                    <div className="field-group">
                        <div className="field-label">Date de naissance</div>
                        <input type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} className="form-input" />
                    </div>

                    <div className="field-group">
                        <div className="field-label">Pays</div>
                        <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} className="form-input" />
                    </div>

                    <div className="field-group">
                        <div className="field-label">Photo de profil</div>
                        <input type="file" onChange={(e) => setPhoto(e.target.files[0])} className="form-input" />
                    </div>

                    <button type="submit" className="submit-btn">S'inscrire</button>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
