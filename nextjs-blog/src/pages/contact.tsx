import Layout from '../components/Layout';
import { Container } from '../styles/Containers';

interface contactProps {}

const contact: React.FC<contactProps> = () => {
  return (
    <Layout pageTitle="Contact">
      <Container>
        <h1>Contact</h1>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
          standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
          make a type specimen book
        </p>
      </Container>
    </Layout>
  );
};

export default contact;
