import Header from './Header';
import Footer from './footer';
import Container from './container';

const Layout = ({ maxWidth, children }) => {
  return (
    <>
      <Header />
      <Container maxWidth={maxWidth}>{children}</Container>
      <Footer />
    </>
  );
};

export default Layout;
