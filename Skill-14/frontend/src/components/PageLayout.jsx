import NavBar from "./NavBar";

function PageLayout({ title, description, children }) {
  return (
    <div className="app-shell">
      <NavBar />
      <main className="content-shell">
        <section className="page-intro card">
          <p className="eyebrow">Protected View</p>
          <h2>{title}</h2>
          <p>{description}</p>
        </section>
        {children}
      </main>
    </div>
  );
}

export default PageLayout;

