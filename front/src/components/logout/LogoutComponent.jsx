import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // On supprime le token et l'ID de l'utilisateur du localStorage
    localStorage.removeItem('userToken');
    localStorage.removeItem('userId');

    // Puis on redirige l'utilisateur vers la page d'accueil
    navigate('/');
  };

  return <button id="btnLogout" onClick={handleLogout}>Déconnexion</button>;
};

export default LogoutButton;
