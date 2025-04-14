import axios from "axios";

const API_URL = "http://localhost:3010/my-u-library/auth/";

interface AuthResponse {
  token: string;
  message: string;
}

const login = (email: string, password: string): Promise<AuthResponse> => {
  return axios
    .post<AuthResponse>(API_URL + "login", { email, password })
    .then((response) => {
      if (response.data.token) {
        // Save the token and email in sessionStorage
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("email", email);
        console.log("sessionStorage set:", {
          token: response.data.token,
          email: email,
        });
      } else {
        console.error("Login response did not include a token.");
      }
      return response.data;
    })
    .catch((err) => {
      console.error("Error in authService.login:", err);
      throw err;
    });
};

const logout = (): void => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("email");
  console.log("sessionStorage cleared: token & email removed.");
};

const getToken = (): string | null => {
  return sessionStorage.getItem("token");
};

const getCurrentEmail = (): string | null => {
  return sessionStorage.getItem("email");
};

const authService = {
  login,
  logout,
  getToken,
  getCurrentEmail,
};

export default authService;
