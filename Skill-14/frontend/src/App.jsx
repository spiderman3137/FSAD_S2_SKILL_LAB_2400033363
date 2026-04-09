import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ProtectedRoute from "./routes/ProtectedRoute";
import { hasStoredUser } from "./utils/session";

function App() {
  const isLoggedIn = hasStoredUser();

  return (
    <Routes>
      <Route path="/" element={<Navigate to={isLoggedIn ? "/home" : "/login"} replace />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;

