import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';

const PrivateRoute = ({ allowedRoles }) => {
  const [authorized, setAuthorized] = useState(null);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('user_data');
    if (!userData) {
      alert("You are not logged in.");
      setShouldRedirect(true);
      return;
    }

    try {
      const parsed = JSON.parse(userData);
      const token = parsed.token;
      if (!token) {
        alert("Missing token.");
        setShouldRedirect(true);
        return;
      }

      const decoded = jwtDecode(token);

      if (decoded.exp * 1000 < Date.now()) {
        alert("Session expired. Please log in again.");
        localStorage.removeItem('user_data');
        setShouldRedirect(true);
        return;
      }

      if (!allowedRoles.includes(parsed.user_type)) {
        alert("You are not authorized to access this page.");
        setShouldRedirect(true);
        return;
      }

      setAuthorized(true);
    } catch (err) {
      console.error("Auth error:", err);
      alert("Invalid token or session.");
      setShouldRedirect(true);
    }
  }, [allowedRoles]);

  if (authorized === null && !shouldRedirect) return null;

  if (shouldRedirect) return <Navigate to="/" />;

  return <Outlet />;
};

export default PrivateRoute;
