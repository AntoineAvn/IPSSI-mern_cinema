const DeleteMovie = ({ movieId, onDelete }) => {
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/v1/movie/${movieId}`, {
        method: 'DELETE',
        headers: {
          Authorization: localStorage.getItem('userToken'),
        },
      });

      if (response.ok) {
        // Appel la fonction onDelete pour mettre à jour la liste des films
        onDelete();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return <button onClick={handleDelete}>Supprimer</button>;
};

export default DeleteMovie;
