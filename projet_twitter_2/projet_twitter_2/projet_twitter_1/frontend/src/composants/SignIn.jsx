import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Phone, Globe, Calendar, FileText, Image, ArrowLeft, Eye, EyeOff } from 'lucide-react';
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

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [step, setStep] = useState(1); // Étapes : 1 = Info de base, 2 = Détails
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
        
        // Effacer l'erreur quand l'utilisateur commence à taper
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateStep1 = () => {
        const newErrors = {};
        
        if (!formData.name.trim()) newErrors.name = 'Le nom est requis';
        if (!formData.lastname.trim()) newErrors.lastname = 'Le prénom est requis';
        if (!formData.pseudo.trim()) newErrors.pseudo = 'Le pseudo est requis';
        if (!formData.email.trim()) newErrors.email = 'L\'email est requis';
        if (!formData.email.includes('@')) newErrors.email = 'Email invalide';
        if (!formData.password) newErrors.password = 'Le mot de passe est requis';
        if (formData.password.length < 6) newErrors.password = 'Minimum 6 caractères';
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
        }
        if (!formData.country.trim()) newErrors.country = 'Le pays est requis';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNextStep = () => {
        if (validateStep1()) {
            setStep(2);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateStep1()) return;
        
        setLoading(true);
        setErrors({});

        try {
            const response = await fetch('http://localhost:8000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                    name: formData.name,
                    lastname: formData.lastname,
                    pseudo: formData.pseudo,
                    country: formData.country,
                    phone: formData.phone || null,
                    bio: formData.bio || null,
                    birthday: formData.birthday || null,
                    photo: formData.photo || null
                })
            });

            const data = await response.json();

            if (response.ok) {
                // Sauvegarder le token
                localStorage.setItem('token', data.token);
                
                // Rediriger vers la page d'accueil
                navigate('/home');
            } else {
                setErrors({ general: data.error || 'Erreur lors de l\'inscription' });
            }
        } catch (error) {
            console.error('Erreur:', error);
            setErrors({ general: 'Erreur de connexion au serveur' });
        } finally {
            setLoading(false);
        }
    };

    if (step === 1) {
        return (
            <div className="register-container">
                <div className="register-card">
                    <div className="register-header">
                        <Link to="/login" className="back-button">
                            <ArrowLeft size={20} />
                        </Link>
                        <div className="logo-container">
                            <div className="logo">
                                <span className="logo-letter">L</span>
                            </div>
                        </div>
                        <div></div>
                    </div>
                    
                    <div className="register-content">
                        <h1 className="register-title">Créer votre compte</h1>
                        <p className="register-subtitle">Rejoignez Litter dès aujourd'hui</p>
                        
                        {errors.general && (
                            <div className="error-message">{errors.general}</div>
                        )}

                        <form className="register-form">
                            <div className="form-row">
                                <div className="field-group">
                                    <div className="input-container">
                                        <User size={18} className="input-icon" />
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Nom"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className={`form-input ${errors.name ? 'error' : ''}`}
                                        />
                                    </div>
                                    {errors.name && <span className="field-error">{errors.name}</span>}
                                </div>
                                
                                <div className="field-group">
                                    <div className="input-container">
                                        <User size={18} className="input-icon" />
                                        <input
                                            type="text"
                                            name="lastname"
                                            placeholder="Prénom"
                                            value={formData.lastname}
                                            onChange={handleChange}
                                            className={`form-input ${errors.lastname ? 'error' : ''}`}
                                        />
                                    </div>
                                    {errors.lastname && <span className="field-error">{errors.lastname}</span>}
                                </div>
                            </div>

                            <div className="field-group">
                                <div className="input-container">
                                    <Mail size={18} className="input-icon" />
                                    <input
                                        type="text"
                                        name="pseudo"
                                        placeholder="Nom d'utilisateur"
                                        value={formData.pseudo}
                                        onChange={handleChange}
                                        className={`form-input ${errors.pseudo ? 'error' : ''}`}
                                    />
                                </div>
                                {errors.pseudo && <span className="field-error">{errors.pseudo}</span>}
                            </div>

                            <div className="field-group">
                                <div className="input-container">
                                    <Mail size={18} className="input-icon" />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Adresse e-mail"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`form-input ${errors.email ? 'error' : ''}`}
                                    />
                                </div>
                                {errors.email && <span className="field-error">{errors.email}</span>}
                            </div>

                            <div className="field-group">
                                <div className="input-container">
                                    <Lock size={18} className="input-icon" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="Mot de passe"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className={`form-input ${errors.password ? 'error' : ''}`}
                                    />
                                    <button
                                        type="button"
                                        className="password-toggle"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                {errors.password && <span className="field-error">{errors.password}</span>}
                            </div>

                            <div className="field-group">
                                <div className="input-container">
                                    <Lock size={18} className="input-icon" />
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        placeholder="Confirmer le mot de passe"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                                    />
                                    <button
                                        type="button"
                                        className="password-toggle"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                {errors.confirmPassword && <span className="field-error">{errors.confirmPassword}</span>}
                            </div>

                            <div className="field-group">
                                <div className="input-container">
                                    <Globe size={18} className="input-icon" />
                                    <input
                                        type="text"
                                        name="country"
                                        placeholder="Pays"
                                        value={formData.country}
                                        onChange={handleChange}
                                        className={`form-input ${errors.country ? 'error' : ''}`}
                                    />
                                </div>
                                {errors.country && <span className="field-error">{errors.country}</span>}
                            </div>

                            <button 
                                type="button" 
                                onClick={handleNextStep}
                                className="next-btn"
                            >
                                Suivant
                            </button>
                        </form>

                        <div className="login-link">
                            Vous avez déjà un compte ? <Link to="/login">Se connecter</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="register-container">
            <div className="register-card">
                <div className="register-header">
                    <button 
                        type="button" 
                        className="back-button"
                        onClick={() => setStep(1)}
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div className="logo-container">
                        <div className="logo">
                            <span className="logo-letter">L</span>
                        </div>
                    </div>
                    <div></div>
                </div>
                
                <div className="register-content">
                    <h1 className="register-title">Personnalisez votre profil</h1>
                    <p className="register-subtitle">Ces informations sont optionnelles</p>
                    
                    {errors.general && (
                        <div className="error-message">{errors.general}</div>
                    )}

                    <form onSubmit={handleSubmit} className="register-form">
                        <div className="field-group">
                            <div className="input-container">
                                <Phone size={18} className="input-icon" />
                            <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Téléphone (optionnel)"
                                    value={formData.phone}
                                onChange={handleChange}
                                className="form-input"
                            />
                            </div>
                        </div>

                    <div className="field-group">
                            <div className="input-container">
                                <Calendar size={18} className="input-icon" />
                                <input
                                    type="date"
                                    name="birthday"
                                    placeholder="Date de naissance"
                                    value={formData.birthday}
                            onChange={handleChange}
                            className="form-input"
                        />
                            </div>
                        </div>

                        <div className="field-group">
                            <div className="input-container">
                                <FileText size={18} className="input-icon" />
                                <textarea
                                    name="bio"
                                    placeholder="Bio (optionnelle)"
                                    value={formData.bio}
                                    onChange={handleChange}
                                    className="form-input bio-input"
                                    maxLength={160}
                                />
                            </div>
                            {formData.bio && (
                                <div className="bio-counter">
                                    {formData.bio.length}/160
                                </div>
                            )}
                    </div>

                    <div className="field-group">
                            <div className="input-container">
                                <Image size={18} className="input-icon" />
                                <input
                                    type="url"
                                    name="photo"
                                    placeholder="URL de votre photo de profil (optionnelle)"
                                    value={formData.photo}
                                    onChange={handleChange}
                                    className="form-input"
                                />
                            </div>
                        </div>

                        {/* Aperçu de l'image si URL fournie */}
                        {formData.photo && (
                            <div className="image-preview">
                                <img 
                                    src={formData.photo} 
                                    alt="Aperçu photo de profil"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                    }}
                                    style={{
                                        width: '80px',
                                        height: '80px',
                                        borderRadius: '50%',
                                        objectFit: 'cover',
                                        border: '2px solid #1da1f2',
                                        display: 'block',
                                        margin: '10px auto'
                                    }}
                                />
                            </div>
                        )}

                        <button 
                            type="submit" 
                            className="submit-btn"
                            disabled={loading}
                        >
                            {loading ? 'Création en cours...' : 'Créer mon compte'}
                        </button>
                    </form>

                    <div className="login-link">
                        Vous avez déjà un compte ? <Link to="/login">Se connecter</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
