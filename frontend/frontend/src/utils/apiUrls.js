export const auth_token_key = "access";
export const base_url = import.meta.env.VITE_API_URL || "http://localhost:3000/api/";
export const getAuthToken = () => {
  const token = localStorage.getItem(auth_token_key);
  return `Bearer ${token}`;
};
export const login_url = "auth/login";
export const register_url = "auth/register";
export const logout_url="auth/logout";