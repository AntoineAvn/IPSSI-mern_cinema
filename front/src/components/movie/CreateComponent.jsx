import React, { useState } from 'react';

const CreateMovie = ({ onCreate }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [watched, setWatched] = useState(false);
  const [pictureUrl, setPictureUrl] = useState('');

  // ID de l'utilisateur récupéré du localStorage (creatorId)
  const creatorId = localStorage.getItem('userId');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const movie = { name, description, category, watched, pictureUrl, creatorId };

    try {
      const response = await fetch('http://localhost:3001/api/v1/movie', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('userToken'),
        },
        body: JSON.stringify(movie),
      });

      const data = await response.json();
      if (response.ok) {
        // Appel la fonction onCreate pour mettre à jour la liste des films
        onCreate(data.message);
        setName('');
        setDescription('');
        setCategory('');
        setWatched(false);
        setPictureUrl('');
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Nom" value={name} onChange={(e) => setName(e.target.value)} />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="Catégorie"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
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
      <button type="submit">Ajouter le film</button>
    </form>
  );
};


export default CreateMovie;
