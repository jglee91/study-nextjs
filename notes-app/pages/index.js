import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import { Button, Card } from 'semantic-ui-react';

const Index = ({ notes }) => (
  <div className="note-container">
    <h1>Notes</h1>
    <div className="grid wrapper">
      {notes.map((note) => (
        <div key={note._id}>
          <Card>
            <Card.Content>
              <Card.Header>
                <Link href={`/${note._id}`}>
                  <a>{note.title}</a>
                </Link>
              </Card.Header>
            </Card.Content>
            <Card.Content extra>
              <Link href={`/${note._id}`}>
                <Button primary>View</Button>
              </Link>
              <Link href={`/${note._id}/edit`}>
                <Button primary>Edit</Button>
              </Link>
            </Card.Content>
          </Card>
        </div>
      ))}
    </div>
  </div>
);

Index.getInitialProps = async () => {
  const res = await fetch('http://localhost:3000/api/notes');
  const { notes } = await res.json();
  return { notes };
};

export default Index;
