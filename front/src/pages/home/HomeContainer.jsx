import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const HomeContainer = () => {
    /**
     * @description loading api
     * @return boolean
     */
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Fonction pour envoyer les données du formulaire de connexion
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (email.length === 0 || password.length === 0) return setError("Email ou Password vide")
            const req = await fetch('http://localhost:3001/api/v1/login',
                {
                    method: "POST",
                    headers: {
                        Accept: 'application/json',
                        'Content-Type':  'application/json'
                    },
                    body: JSON.stringify({
                        password: password,
                        email: email
                    })
                })
            const res = await req.json()
            if (!req.ok) return setError("Mauvaise combinaison")
            
            // On stocke le token et l'ID de l'utilisateur dans le localStorage
            localStorage.setItem('userToken', res.message.token);
            localStorage.setItem('userId', res.message.user._id);

            // Puis on redirige l'utilisateur vers la page de ses films
            navigate('/user/movies');
        } catch (e) {
            console.error(e.message)
        } finally {
            setTimeout(() => {
                setError("")
            }, 2000)
        }
    }

    return (
      <div>
        <h1>Connexion</h1>
        <form onSubmit={handleSubmit}>
          <input
            value={email}
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type={"submit"}>Se connecter</button>
        </form>
        {error.length > 0 && <p>{error}</p>}
        <Link to="/registration">Pas de compte ? S'inscrire</Link>
      </div>
    );
};



export default HomeContainer;
