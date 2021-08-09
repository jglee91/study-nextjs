import AppLink from '../components/AppLink';
import Layout from '../components/Layout';
import { Container } from '../styles/Containers';
import { Paragraph, Title } from '../styles/TextElements';

export default function NotFound() {
  return (
    <Layout pageTitle="Not Found">
      <Container>
        <Title>Not Found 404</Title>
        <Paragraph>Sorry! Not fond page!</Paragraph>
        <AppLink href="/" label="Go to home." />
      </Container>
    </Layout>
  );
}
