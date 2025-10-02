import React, { useState } from 'react';
import { FaUser, FaLock, FaSignInAlt, FaCut } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // 👈 Importar useAuth
import fondoSVG from "../assets/fondo.svg";
import "../styles/login.css"; 

   

// --- INTERFACES DE TIPADO ---
interface LoginFormData {
    user: string;
    password: string;
}

interface HandleSubmitEvent extends React.FormEvent<HTMLFormElement> {}
// ----------------------------


export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth(); // 👈 Usar el contexto
  
  const [formData, setFormData] = useState<LoginFormData>({ user: '', password: '' });
  const [error, setError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: HandleSubmitEvent): void => {
      e.preventDefault();
      setError('');

      // Lógica de autenticación (Hardcodeado para la demostración)
      if (formData.user === 'admin' && formData.password === '123') {
           //  Usar el login del contexto en lugar de navegar directamente
          login('token-simulado'); // Puedes pasar un token real aquí
      navigate('/dashboard', { replace: true }); // 👈 replace: true evita que pueda retroceder
    } else {
      setError('Credenciales inválidas. Inténtalo de nuevo.');
    }
  };

  return (
    // Se pasa la imagen de fondo al contenedor principal.
    <div 
      className="login-container"
      style={{ backgroundImage: `url(${fondoSVG})` }}
    >
      <div className="login-box">
        
        <div className="login-header">
          {/* Icono de tijeras */}
          <FaCut className="header-icon" /> 
          <h1>Panel Peluquería</h1>
        </div>
        
        <p className="login-subtitle">Inicia sesión para acceder al panel de administración.</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          
          {/* Campo de Usuario/Email */}
          <div className="input-group">
            <FaUser className="input-icon" />
            <input
              type="text"
              name="user"
              placeholder=" Usuario o Email"
              value={formData.user}
              onChange={handleChange}
              required
            />
          </div>
          
          {/* Campo de Contraseña */}
          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={ handleChange}
              required
            />
          </div>

          {/* Botón de Submit */}
          <button type="submit" className="login-btn">
            <FaSignInAlt className="btn-icon" />
            Iniciar Sesión
          </button>
        </form>
        
        <a href="#" className="forgot-password">¿Olvidaste tu contraseña?</a>
      </div>
    </div>
  );
}