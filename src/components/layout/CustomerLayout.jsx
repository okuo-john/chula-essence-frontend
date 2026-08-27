import Navbar from "./Navbar";

function CustomerLayout({ children }) {
  return (
    <>
      <Navbar />

      <main>
        {children}
      </main>
    </>
  );
}

export default CustomerLayout;