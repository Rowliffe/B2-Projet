import React, { useState } from 'react';
import '../styles/register.css';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        lastname: '',
        pseudo: '',
        phone: '',
        bio: '',
        birthday: '',
        country: '',
        photo: null
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Les mots de passe ne correspondent pas !");
            return;
        }
        const submissionData = { ...formData };
        delete submissionData.confirmPassword;
        console.log('Inscription :', submissionData);
        // Envoyer submissionData au backend ici
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
                    {[
                        { label: "Pseudo", name: "pseudo", type: "text" },
                        { label: "Adresse e-mail", name: "email", type: "email" },
                        { label: "Nom", name: "name", type: "text" },
                        { label: "Prénom", name: "lastname", type: "text" },
                        { label: "Téléphone", name: "phone", type: "tel" },
                        { label: "Date de naissance", name: "birthday", type: "date" },
                        { label: "Pays", name: "country", type: "text" },
                        // Les champs mot de passe sont déplacés ici
                        { label: "Mot de passe", name: "password", type: "password" },
                        { label: "Confirmer le mot de passe", name: "confirmPassword", type: "password" },
                    ].map(({ label, name, type }) => (
                        <div className="field-group" key={name}>
                            <div className="field-label">{label}</div>
                            <input
                                type={type}
                                name={name}
                                value={formData[name] || ''}
                                onChange={handleChange}
                                className="form-input"
                            />
                        </div>
                    ))}

                    <div className="field-group">
                        <div className="field-label">Bio</div>
                        <textarea
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            className="form-input"
                        />
                    </div>

                    <div className="field-group">
                        <div className="field-label">Photo de profil</div>
                        <input
                            type="file"
                            name="photo"
                            onChange={handleChange}
                            className="form-input"
                        />
                    </div>

                    <button type="submit" className="submit-btn">S'inscrire</button>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
