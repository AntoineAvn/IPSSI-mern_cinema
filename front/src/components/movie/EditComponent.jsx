import React, { useState } from 'react';

const EditMovie = ({ movie, onUpdate }) => {
  const [name, setName] = useState(movie.name);
  const [description, setDescription] = useState(movie.description);
  const [category, setCategory] = useState(movie.category);
  const [watched, setWatched] = useState(movie.watched);
  const [pictureUrl, setPictureUrl] = useState(movie.pictureUrl);

  // Met à jour le film
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const updatedMovie = { name, description, category, watched, pictureUrl};

      const response = await fetch(`http://localhost:3001/api/v1/movie/${movie._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('userToken'),
        },
        body: JSON.stringify(updatedMovie),
      });

      if (response.ok) {
        // Appel la fonction onUpdate pour mettre à jour le film dans la liste
        onUpdate(updatedMovie);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form onSubmit={handleUpdate}>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
      <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
      <input
        type="text"
        placeholder="Lien de la pochette"
        value={pictureUrl}
        onChange={(e) => setPictureUrl(e.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={watched}
          onChange={(e) => setWatched(e.target.checked)}
        />
        Vu
      </label>
      <button type="submit">Mettre à jour</button>
    </form>
  );
};

export default EditMovie;
