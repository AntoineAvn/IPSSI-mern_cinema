import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const UserMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem('userId');
  const userToken = localStorage.getItem('userToken');

  // Récupérez la liste des films de l'utilisateur
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/v1/movies/user/${userId}`, {
          headers: {
            Authorization: `${userToken}`,
          },
        });
        const data = await response.json();

        // Stockez les films dans le state
        setMovies(data.message);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [userId, userToken]);

  if (loading) {
    return <p>Chargement...</p>;
  }

  return (
    <div>
      <h2>Mes Films</h2>
      <Link to="/create/movie">Ajouter un nouveau film</Link>
      {movies.length > 0 ? (
        movies.map((movie) => (
          <div key={movie._id}>
            <h3>
              <Link to={`/user/movie/${movie._id}`}>{movie.name}</Link>
            </h3>
            <p>Catégorie : {movie.category}</p>
            <p>Regardé : {movie.watched ? 'Oui' : 'Non'}</p>
            <img src={movie.pictureUrl} alt={movie.name} style={{ width: '100px' }} />
          </div>
        ))
      ) : (
        <p>Pas de films trouvés</p>
      )}
    </div>
  );
};

export default UserMovies;
