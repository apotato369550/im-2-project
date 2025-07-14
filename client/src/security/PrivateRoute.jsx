import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const isAuthenticated = () => {
  const userData = localStorage.getItem('user_data');

  if (!userData) return false;

  try {
    const parsed = JSON.parse(userData);
    const token = parsed.token;

    if (!token) return false;

    const decodedToken = jwtDecode(token);

    // Check if the token has expired
    if (decodedToken.exp * 1000 < Date.now()) {
      console.log("Token expired");
      localStorage.removeItem('user_data'); 
      return false;
    }

    return true;
  } catch (err) {
    console.error("Invalid token or malformed user data", err);
    return false;
  }
};

const PrivateRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
