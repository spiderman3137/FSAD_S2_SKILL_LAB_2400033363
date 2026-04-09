import PageLayout from "../components/PageLayout";
import { getStoredUser } from "../utils/session";

function Home() {
  const sessionUser = getStoredUser();

  return (
    <PageLayout
      title={`Welcome, ${sessionUser?.fullName || sessionUser?.username}`}
      description="This Home page is available only when a valid user session exists in localStorage or sessionStorage."
    >
      <section className="dashboard-grid">
        <article className="card highlight-card">
          <p className="eyebrow">Signed In As</p>
          <h3>{sessionUser?.username}</h3>
          <p>
            Your session is stored in the browser and used to unlock protected routes like Home and
            Profile.
          </p>
        </article>

        <article className="card">
          <p className="eyebrow">Next Step</p>
          <h3>Open Profile</h3>
          <p>
            The Profile page reads your stored user details and calls the backend to load the full
            database record.
          </p>
        </article>
      </section>
    </PageLayout>
  );
}

export default Home;

