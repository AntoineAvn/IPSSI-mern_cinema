import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // Fonction pour envoyer les données du formulaire d'inscription
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const requestBody = {
        username,
        email,
        password,
        firstname,
        lastname,
      };

      const response = await fetch('http://localhost:3001/api/v1/registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        setError('Erreur lors de l\'inscription');
        return;
      }

      // Si l'inscription est réussie, on affiche un message de succès
      setSuccess(true);

      // Puis on redirige l'utilisateur vers la page de connexion
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (e) {
      console.error(e);
      setError('Une erreur s\'est produite lors de l\'inscription');
    }
  };

  return (
    <div>
      <h1>Inscription</h1>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Nom d'utilisateur" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="text" placeholder="Prénom" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
        <input type="text" placeholder="Nom" value={lastname} onChange={(e) => setLastname(e.target.value)} />
        <button type="submit">S'inscrire</button>
      </form>
      {error && <p>{error}</p>}
      {success && (
        <p>
          Inscription réussie! Vous serez redirigé vers la page de connexion.
        </p>
      )}
    </div>
  );
};

export default RegistrationForm;
