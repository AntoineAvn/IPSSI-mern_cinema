import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const MovieForm = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({
    name: '',
    description: '',
    category: '',
    watched: false,
    pictureUrl: '',
    creatorId: localStorage.getItem('userId'),
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // On charge le film si on est en mode édition
  useEffect(() => {
    if (movieId) {
      const fetchMovie = async () => {
        try {
          const response = await fetch(`http://localhost:3001/api/v1/movie/${movieId}`, {
            headers: {
              Authorization: `${localStorage.getItem('userToken')}`,
            },
          });
          const data = await response.json();
          setMovie(data.message);
        } catch (e) {
          console.error(e);
          setError('Erreur lors du chargement du film');
        } finally {
          setLoading(false);
        }
      };

      fetchMovie();
    } else {
      setLoading(false); // Si c'est une création, pas besoin de charger le film
    }
  }, [movieId]);

  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;
    const fieldValue = name === 'watched' ? checked : value;
    setMovie({ ...movie, [name]: fieldValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const method = movieId ? 'PATCH' : 'POST'; // POST pour la création, PATCH pour la modification
      const endpoint = movieId ? `/api/v1/movie/${movieId}` : '/api/v1/movie';
      const userToken = localStorage.getItem('userToken');

        // On envoie le film créer/edité avec l'ID de l'utilisateur
        const movieData = { ...movie, creatorId: localStorage.getItem('userId') };

      const response = await fetch(`http://localhost:3001${endpoint}`, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `${userToken}`,
        },
        body: JSON.stringify(movieData),
      });

      if (!response.ok) {
        setError('Erreur lors de l\'enregistrement du film');
        return;
      }

      // On redirige l'utilisateur vers la liste des films
      navigate('/user/movies');
    } catch (e) {
      console.error(e);
      setError('Erreur lors de l\'enregistrement du film');
    }
  };

  if (loading) {
    return <p>Chargement...</p>;
  }

  return (
    <div>
      <h1>{movieId ? 'Modifier le film' : 'Créer un film'}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nom du film"
          value={movie.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={movie.description}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="category"
          placeholder="Catégorie"
          value={movie.category}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="pictureUrl"
          placeholder="Lien de l'image"
          value={movie.pictureUrl}
          onChange={handleInputChange}
        />
        <label>
          <input
            type="checkbox"
            name="watched"
            checked={movie.watched}
            onChange={handleInputChange}
          />
          Regardé
        </label>
        <button type="submit">{movieId ? 'Modifier' : 'Créer'}</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default MovieForm;
