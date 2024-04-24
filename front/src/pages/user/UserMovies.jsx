import React, { useState, useEffect } from 'react';
import CreateMovie from '../../components/movie/CreateComponent.jsx';
import EditMovie from '../../components/movie/EditComponent.jsx';
import DeleteMovie from '../../components/movie/DeleteComponent.jsx';
import LogoutButton from '../../components/logout/LogoutComponent.jsx';

// Page pour afficher les films de l'utilisateur connecté
const UserMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingMovie, setEditingMovie] = useState(null);

  const userId = localStorage.getItem('userId');
  const userToken = localStorage.getItem('userToken');

  // Récupère les films de l'utilisateur connecté
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/v1/movies/user/${userId}`, {
          headers: {
            Authorization: `${userToken}`,
          },
        });
        const data = await response.json();
        setMovies(data.message); // Stocke les films de l'user dans le state
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [userId, userToken]);

  // Ajoute le film dans le state
  const handleCreateMovie = (newMovie) => {
    setMovies([...movies, newMovie]);
  };

  // Met à jour le film dans le state
  const handleUpdateMovie = (updatedMovie) => {
    setMovies(movies.map((movie) => (movie._id === updatedMovie._id ? updatedMovie : movie)));
    setEditingMovie(null); // Après la mise à jour, on arrête l'édition
  };

  // Supprime le film du state
  const handleDeleteMovie = (movieId) => {
    setMovies(movies.filter((movie) => movie._id !== movieId));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Mes Films</h2>
      <LogoutButton />
      {editingMovie ? (
        <EditMovie movie={editingMovie} onUpdate={handleUpdateMovie} />
      ) : (
        <CreateMovie onCreate={handleCreateMovie} />
      )}
      {movies.length > 0 ? (
        movies.map((movie) => (
          <div key={movie._id}>
            <h3>{movie.name}</h3>
            <p>{movie.description}</p>
            <p>Catégorie : {movie.category}</p>
            <p>Vu : {movie.watched ? 'Oui' : 'Non'}</p>
            <img src={movie.pictureUrl} alt={movie.name} style={{ width: '100px' }} />
            <button onClick={() => setEditingMovie(movie)}>Modifier</button>
            <DeleteMovie movieId={movie._id} onDelete={() => handleDeleteMovie(movie._id)} />
          </div>
        ))
      ) : (
        <p>Vous n'avez pas encore de films, ajoutez-en un !</p>
      )}
    </div>
  );
};

export default UserMovies;
