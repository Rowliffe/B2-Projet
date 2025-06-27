import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, LogOut } from 'lucide-react';
import '../styles/editionProfile.css';

const EditionProfile = () => {
    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        pseudo: '',
        phone: '',
        bio: '',
        country: '',
        photo: '',
        password: ''
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const navigate = useNavigate();

    // Fonction de déconnexion
    const handleLogout = () => {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        navigate('/login');
    };

    useEffect(() => {
        console.log('EditionProfile - useEffect start');
        
        if (!token) {
            console.log('No token found, redirecting to login');
            navigate('/login');
            return;
        }

        console.log('Fetching profile data...');
        fetch('http://localhost:8000/api/profile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                console.log('Profile response status:', res.status);
                if (!res.ok) {
                    if (res.status === 401) {
                        localStorage.removeItem('token');
                        sessionStorage.removeItem('token');
                        navigate('/login');
                        throw new Error('Token invalide');
                    }
                    throw new Error('Erreur chargement profil');
                }
                return res.json();
            })
            .then(data => {
                console.log('Profile data received:', data);
                setFormData({
                    name: data.user?.name || '',
                    lastname: data.user?.lastname || '',
                    pseudo: data.user?.pseudo || '',
                    phone: data.user?.phone || '',
                    bio: data.user?.bio || '',
                    country: data.user?.country || '',
                    photo: data.user?.photo || '',
                    password: ''
                });
                setLoading(false);
            })
            .catch(err => {
                console.error('Error loading profile:', err);
                setError(err.message);
                setLoading(false);
            });
    }, [token, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        // Validation spéciale pour le champ téléphone : seuls les chiffres sont autorisés
        if (name === 'phone') {
            // Supprimer tous les caractères non-numériques
            const numericValue = value.replace(/[^0-9]/g, '');
            setFormData(prev => ({ ...prev, [name]: numericValue }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
        
        setError('');
        setSuccess('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        console.log('Submitting form data:', formData);

        try {
            const res = await fetch('http://localhost:8000/api/profile/edit', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            console.log('Update response status:', res.status);
            const data = await res.json();
            console.log('Update response data:', data);

            if (!res.ok) {
                throw new Error(data.error || 'Erreur lors de la mise à jour');
            }

            setSuccess('Profil mis à jour avec succès !');
            setTimeout(() => {
                navigate('/profile');
            }, 2000);
        } catch (err) {
            console.error('Error updating profile:', err);
            setError(err.message);
        }
    };

    console.log('EditionProfile render - loading:', loading, 'error:', error);

    if (loading) {
        return (
            <div style={{ 
                padding: '20px', 
                textAlign: 'center', 
                color: 'white', 
                backgroundColor: '#15202b',
                minHeight: '100vh'
            }}>
                Chargement...
    </div>
);
    }

    return (
        <div style={{ 
            backgroundColor: '#15202b', 
            color: 'white', 
            minHeight: '100vh',
            padding: '20px'
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
                    onClick={() => navigate('/profile')}
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
                    Retour au profil
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

            <div style={{ maxWidth: '600px', margin: '0 auto', paddingTop: '100px' }}>
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    marginBottom: '30px',
                    paddingBottom: '20px',
                    borderBottom: '1px solid #38444d'
                }}>
                    <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>
                        Modifier mon profil
                    </h2>
                </div>

                {error && (
                    <div style={{
                        backgroundColor: '#dc3545',
                        color: 'white',
                        padding: '15px',
                        borderRadius: '8px',
                        marginBottom: '20px',
                        textAlign: 'center'
                    }}>
                        {error}
        </div>
                )}
                
                {success && (
                    <div style={{
                        backgroundColor: '#28a745',
                        color: 'white',
                        padding: '15px',
                        borderRadius: '8px',
                        marginBottom: '20px',
                        textAlign: 'center'
                    }}>
                        {success}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{
                    backgroundColor: '#192734',
                    borderRadius: '15px',
                    padding: '30px',
                    border: '1px solid #38444d'
                }}>
                    <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                                Nom *
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                style={{
                                    width: '100%',
                                    padding: '12px 16px',
                                    backgroundColor: '#253341',
                                    border: '1px solid #38444d',
                                    borderRadius: '8px',
                                    color: 'white',
                                    fontSize: '16px',
                                    boxSizing: 'border-box'
                                }}
                            />
                </div>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                                Prénom *
                            </label>
                            <input
                                type="text"
                                name="lastname"
                                value={formData.lastname}
                                onChange={handleChange}
                                required
                                style={{
                                    width: '100%',
                                    padding: '12px 16px',
                                    backgroundColor: '#253341',
                                    border: '1px solid #38444d',
                                    borderRadius: '8px',
                                    color: 'white',
                                    fontSize: '16px',
                                    boxSizing: 'border-box'
                                }}
                            />
        </div>
    </div>

                    <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                                Pseudo *
                            </label>
                            <input
                                type="text"
                                name="pseudo"
                                value={formData.pseudo}
                                onChange={handleChange}
                                required
                                style={{
                                    width: '100%',
                                    padding: '12px 16px',
                                    backgroundColor: '#253341',
                                    border: '1px solid #38444d',
                                    borderRadius: '8px',
                                    color: 'white',
                                    fontSize: '16px',
                                    boxSizing: 'border-box'
                                }}
                            />
                </div>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                                Téléphone
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="0123456789"
                                pattern="[0-9]*"
                                inputMode="numeric"
                                maxLength="15"
                                style={{
                                    width: '100%',
                                    padding: '12px 16px',
                                    backgroundColor: '#253341',
                                    border: '1px solid #38444d',
                                    borderRadius: '8px',
                                    color: 'white',
                                    fontSize: '16px',
                                    boxSizing: 'border-box'
                                }}
                            />
                </div>
            </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                            Biographie
                        </label>
                        <textarea
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            maxLength="160"
                            placeholder="Parlez-nous de vous..."
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                backgroundColor: '#253341',
                                border: '1px solid #38444d',
                                borderRadius: '8px',
                                color: 'white',
                                fontSize: '16px',
                                minHeight: '80px',
                                fontFamily: 'inherit',
                                resize: 'vertical',
                                boxSizing: 'border-box'
                            }}
                        />
                        <small style={{ color: '#8899a6', fontSize: '12px' }}>
                            {formData.bio.length}/160
                        </small>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                            Pays *
                        </label>
                        <input
                            type="text"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            required
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                backgroundColor: '#253341',
                                border: '1px solid #38444d',
                                borderRadius: '8px',
                                color: 'white',
                                fontSize: '16px',
                                boxSizing: 'border-box'
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                            URL Photo de profil
                        </label>
                        <input
                            type="url"
                            name="photo"
                            value={formData.photo}
                            onChange={handleChange}
                            placeholder="https://example.com/photo.jpg"
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                backgroundColor: '#253341',
                                border: '1px solid #38444d',
                                borderRadius: '8px',
                                color: 'white',
                                fontSize: '16px',
                                boxSizing: 'border-box'
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: '30px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                            Nouveau mot de passe
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Laisser vide pour ne pas changer"
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                backgroundColor: '#253341',
                                border: '1px solid #38444d',
                                borderRadius: '8px',
                                color: 'white',
                                fontSize: '16px',
                                boxSizing: 'border-box'
                            }}
                        />
                        <small style={{ color: '#8899a6', fontSize: '12px' }}>
                            Laisser vide si vous ne souhaitez pas modifier votre mot de passe
                        </small>
                    </div>

                    <div style={{ 
                        display: 'flex', 
                        gap: '15px', 
                        justifyContent: 'flex-end',
                        paddingTop: '20px',
                        borderTop: '1px solid #38444d'
                    }}>
                        <button 
                            type="submit"
                            style={{
                                backgroundColor: '#1da1f2',
                                color: 'white',
                                border: 'none',
                                borderRadius: '25px',
                                padding: '12px 24px',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                fontSize: '16px'
                            }}
                        >
                            Sauvegarder les modifications
                        </button>
                        <button 
                            type="button" 
                            onClick={() => navigate('/profile')}
                            style={{
                                backgroundColor: 'transparent',
                                color: '#8899a6',
                                border: '1px solid #38444d',
                                borderRadius: '25px',
                                padding: '12px 24px',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                fontSize: '16px'
                            }}
                        >
                            Annuler
                        </button>
                    </div>
                </form>
                </div>
        </div>
    );
};

export default EditionProfile;