import { useEffect, useState } from "react";
import PageLayout from "../components/PageLayout";
import { fetchUserProfile } from "../api/authApi";
import { getStoredUser } from "../utils/session";

function Profile() {
  const sessionUser = getStoredUser();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadProfile() {
      try {
        const response = await fetchUserProfile({
          userId: sessionUser?.userId,
          username: sessionUser?.username
        });

        if (isMounted) {
          setProfile(response);
        }
      } catch (loadError) {
        if (isMounted) {
          setError(loadError.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadProfile();

    return () => {
      isMounted = false;
    };
  }, [sessionUser?.userId, sessionUser?.username]);

  return (
    <PageLayout
      title="Profile Details"
      description="This page reads the stored session, fetches your full user record from the backend database, and displays it here."
    >
      {loading ? (
        <section className="card">
          <p>Loading profile...</p>
        </section>
      ) : null}

      {error ? (
        <section className="card">
          <div className="status-message error">{error}</div>
        </section>
      ) : null}

      {!loading && !error && profile ? (
        <section className="profile-grid">
          <article className="card profile-card">
            <span className="profile-label">Full Name</span>
            <strong>{profile.fullName}</strong>
          </article>
          <article className="card profile-card">
            <span className="profile-label">Username</span>
            <strong>{profile.username}</strong>
          </article>
          <article className="card profile-card">
            <span className="profile-label">Email</span>
            <strong>{profile.email}</strong>
          </article>
          <article className="card profile-card">
            <span className="profile-label">Phone</span>
            <strong>{profile.phone}</strong>
          </article>
          <article className="card profile-card">
            <span className="profile-label">User ID</span>
            <strong>{profile.id}</strong>
          </article>
          <article className="card profile-card">
            <span className="profile-label">Created At</span>
            <strong>{new Date(profile.createdAt).toLocaleString()}</strong>
          </article>
        </section>
      ) : null}
    </PageLayout>
  );
}

export default Profile;

