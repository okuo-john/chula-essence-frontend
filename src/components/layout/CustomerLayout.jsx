import Navbar from "./Navbar";
import Footer from "./Footer";

function CustomerLayout({ children }) {
  return (
    <>
      <Navbar />

      <main>
        {children}
      </main>

      <Footer />
    </>
  );
}

export default CustomerLayout;