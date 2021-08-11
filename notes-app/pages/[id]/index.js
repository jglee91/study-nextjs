import fetch from 'isomorphic-unfetch';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Confirm, Button, Loader } from 'semantic-ui-react';

const Note = ({ note }) => {
  const [confirm, setConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isDeleting) {
      deleteNote();
    }
  }, [isDeleting]);

  const deleteNote = async () => {
    const noteId = router.query.id;

    try {
      await fetch(`http://localhost:3000/api/notes/${noteId}`, {
        method: 'DELETE',
      });

      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = () => {
    setIsDeleting(true);
    setConfirm(false);
  };

  return (
    <div className="note-container">
      {isDeleting ? (
        <Loader active />
      ) : (
        <>
          <h1>{note.title}</h1>
          <p>{note.description}</p>
          <Button color="red" onClick={() => setConfirm(true)}>
            Delete
          </Button>
        </>
      )}
      <Confirm open={confirm} onCancel={() => setConfirm(false)} onConfirm={handleDelete} />
    </div>
  );
};

Note.getInitialProps = async (ctx) => {
  const {
    query: { id },
  } = ctx;
  const res = await fetch(`http://localhost:3000/api/notes/${id}`);
  const { note } = await res.json();

  return { note };
};

export default Note;
