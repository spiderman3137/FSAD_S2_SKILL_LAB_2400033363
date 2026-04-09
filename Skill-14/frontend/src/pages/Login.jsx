import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi";
import { getStoredUser, setStoredUser } from "../utils/session";

const initialForm = {
  username: "",
  password: "",
  remember: true
};

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (getStoredUser()) {
    return <Navigate to="/home" replace />;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await loginUser({
        username: form.username,
        password: form.password
      });

      setStoredUser(
        {
          userId: response.userId,
          username: response.username,
          fullName: response.fullName
        },
        form.remember
      );

      navigate("/home", { replace: true });
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value
    }));
  }

  return (
    <div className="auth-shell">
      <section className="auth-card">
        <p className="eyebrow">React + Spring Boot</p>
        <h1>Login</h1>
        <p className="auth-copy">
          Sign in with your registered credentials. A successful login stores your user session and
          redirects you to the Home page.
        </p>

        {location.state?.successMessage ? (
          <div className="status-message success">{location.state.successMessage}</div>
        ) : null}

        {error ? <div className="status-message error">{error}</div> : null}

        <form className="form-stack" onSubmit={handleSubmit}>
          <label className="field">
            <span>Username</span>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
            />
          </label>

          <label className="field">
            <span>Password</span>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </label>

          <label className="checkbox-row">
            <input
              type="checkbox"
              name="remember"
              checked={form.remember}
              onChange={handleChange}
            />
            <span>Keep me signed in with localStorage</span>
          </label>

          <button type="submit" className="primary-button" disabled={loading}>
            {loading ? "Checking credentials..." : "Login"}
          </button>
        </form>

        <p className="auth-footer">
          New user? <Link to="/register">Create an account</Link>
        </p>
      </section>
    </div>
  );
}

export default Login;

