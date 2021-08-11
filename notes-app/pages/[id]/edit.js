import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import { Button, Form, Loader } from 'semantic-ui-react';
import { useRouter } from 'next/router';

const EditNote = ({ note }) => {
  const [form, setForm] = useState({ title: note.title, description: note.description });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  useEffect(() => {
    if (isSubmitting) {
      if (!Object.keys(errors).length) {
        updateNote();
      } else {
        setIsSubmitting(false);
      }
    }
  }, [errors]);

  const updateNote = async () => {
    try {
      await fetch(`http://localhost:3000/api/notes/${router.query.id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let errs = validate();
    setErrors(errs);
    setIsSubmitting(true);
  };

  const validate = () => {
    let err = {};

    if (!form.title) {
      err.title = 'Title is required';
    }
    if (!form.description) {
      err.description = 'Description is required';
    }

    return err;
  };

  return (
    <div className="form-container">
      <h1>Create Note</h1>
      <div>
        {isSubmitting ? (
          <Loader active inline="centered" />
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Input
              fluid="true"
              error={errors.title && { content: 'Please enter a title', pointing: 'below' }}
              label="Title"
              placeholder="Title"
              name="title"
              value={form.title}
              onChange={handleChange}
            />
            <Form.TextArea
              fluid="true"
              error={errors.description && { content: 'Please enter a description', pointing: 'below' }}
              label="Description"
              placeholder="Description"
              name="description"
              value={form.description}
              onChange={handleChange}
            />
            <Button type="submit">Update</Button>
          </Form>
        )}
      </div>
    </div>
  );
};

EditNote.getInitialProps = async (ctx) => {
  const {
    query: { id },
  } = ctx;
  const res = await fetch(`http://localhost:3000/api/notes/${id}`);
  const { note } = await res.json();

  return { note };
};

export default EditNote;
