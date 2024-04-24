import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Récupérez les détails du film
  useEffect(() => {
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
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [movieId]);

  // Supprimez le film
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/v1/movie/${movieId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `${localStorage.getItem('userToken')}`,
        },
      });

      // Après la suppression  on redirige vers la liste des films
      if (response.ok) {
        navigate('/user/movies');
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (!movie) {
    return <p>Film non trouvé</p>;
  }

  return (
    <div>
      <h2>{movie.name}</h2>
      <p>Description : {movie.description}</p>
      <p>Catégorie : {movie.category}</p>
      <p>Regardé : {movie.watched ? 'Oui' : 'Non'}</p>
      <img src={movie.pictureUrl} alt={movie.name} style={{ width: '200px' }} />
      <button onClick={() => navigate(`/edit/movie/${movie._id}`)}>Modifier</button> {/* Lien pour modifier */}
      <button onClick={handleDelete}>Supprimer</button>
    </div>
  );
};

export default MovieDetails;
