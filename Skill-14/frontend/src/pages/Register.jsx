import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { registerUser } from "../api/authApi";
import { getStoredUser } from "../utils/session";

const initialForm = {
  fullName: "",
  username: "",
  email: "",
  phone: "",
  password: ""
};

function Register() {
  const navigate = useNavigate();
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
      await registerUser(form);
      navigate("/login", {
        replace: true,
        state: { successMessage: "Registration successful. Please log in." }
      });
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: value
    }));
  }

  return (
    <div className="auth-shell">
      <section className="auth-card">
        <p className="eyebrow">User Registration</p>
        <h1>Create Account</h1>
        <p className="auth-copy">
          Submit this form to create a user in the backend database, then continue to the Login
          page.
        </p>

        {error ? <div className="status-message error">{error}</div> : null}

        <form className="form-stack" onSubmit={handleSubmit}>
          <div className="input-grid">
            <label className="field">
              <span>Full Name</span>
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </label>

            <label className="field">
              <span>Username</span>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Choose a username"
                required
              />
            </label>

            <label className="field">
              <span>Email</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </label>

            <label className="field">
              <span>Phone</span>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
              />
            </label>
          </div>

          <label className="field">
            <span>Password</span>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Create a password"
              required
            />
          </label>

          <button type="submit" className="primary-button" disabled={loading}>
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="auth-footer">
          Already registered? <Link to="/login">Go to Login</Link>
        </p>
      </section>
    </div>
  );
}

export default Register;

