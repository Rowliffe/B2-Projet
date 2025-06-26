import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/profile.css';

const EditProfile = () => {
    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        pseudo: '',
        photo: '',
        password: ''
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:8000/api/profile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                if (!res.ok) throw new Error('Erreur chargement profil');
                return res.json();
            })
            .then(data => {
                setFormData({
                    name: data.user.name || '',
                    lastname: data.user.lastname || '',
                    pseudo: data.user.pseudo || '',
                    photo: data.user.photo || '',
                    password: ''
                });
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('http://localhost:8000/api/profile/edit', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!res.ok) throw new Error('Erreur lors de la mise à jour');
            navigate('/profile');
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <div>Chargement...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="edit-profile-container">
            <h2>Modifier mon profil</h2>
            <form className="edit-profile-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Nom</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastname">Prénom</label>
                    <input
                        type="text"
                        id="lastname"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="pseudo">Pseudo</label>
                    <input
                        type="text"
                        id="pseudo"
                        name="pseudo"
                        value={formData.pseudo}
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="photo">Photo</label>
                    <input
                        type="text"
                        id="photo"
                        name="photo"
                        value={formData.photo}
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Mot de passe (laisser vide pour ne pas changer)</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>
                <button type="submit" className="submit-btn">Sauvegarder</button>
            </form>
        </div>
    );
};

export default EditProfile;
