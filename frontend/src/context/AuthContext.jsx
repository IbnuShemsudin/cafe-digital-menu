import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext(null);

/* =========================================================
   API CONFIG
========================================================= */

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

/* =========================================================
   STORAGE KEYS
========================================================= */

const TOKEN_KEY = "cafe_token";
const ADMIN_KEY = "cafe_admin";

/* =========================================================
   AUTH PROVIDER
========================================================= */

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  /* =========================================================
     RESTORE LOGIN SESSION
  ========================================================= */

  useEffect(() => {
    const storedAdmin =
      localStorage.getItem(ADMIN_KEY);

    const token =
      localStorage.getItem(TOKEN_KEY);

    if (storedAdmin && token) {
      try {
        const parsedAdmin =
          JSON.parse(storedAdmin);

        setAdmin(parsedAdmin);
      } catch (error) {
        console.error(
          "Failed to restore admin session:",
          error
        );

        localStorage.removeItem(
          ADMIN_KEY
        );

        localStorage.removeItem(
          TOKEN_KEY
        );
      }
    }

    setLoading(false);
  }, []);

  /* =========================================================
     SAVE AUTH SESSION
  ========================================================= */

  const saveSession = (
    token,
    adminData
  ) => {
    if (!token || !adminData) {
      throw new Error(
        "Invalid authentication response."
      );
    }

    localStorage.setItem(
      TOKEN_KEY,
      token
    );

    localStorage.setItem(
      ADMIN_KEY,
      JSON.stringify(adminData)
    );

    setAdmin(adminData);
  };

  /* =========================================================
     LOGIN
  ========================================================= */

  const login = async (
    email,
    password
  ) => {
    try {
      const response = await fetch(
        `${API_URL}/auth/login`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            email: email.trim().toLowerCase(),
            password,
          }),
        }
      );

      let data;

      try {
        data = await response.json();
      } catch {
        throw new Error(
          "The server returned an invalid response."
        );
      }

      if (!response.ok) {
        throw new Error(
          data?.message ||
            "Invalid email or password."
        );
      }

      if (
        !data?.token ||
        !data?.admin
      ) {
        throw new Error(
          "Invalid login response from server."
        );
      }

      saveSession(
        data.token,
        data.admin
      );

      return data;
    } catch (error) {
      console.error(
        "Login error:",
        error
      );

      if (
        error instanceof TypeError
      ) {
        throw new Error(
          `Cannot connect to the backend server at ${API_URL}.`
        );
      }

      throw error;
    }
  };

  /* =========================================================
     REGISTER
  ========================================================= */

  const register = async (
    name,
    email,
    password
  ) => {
    try {
      const response = await fetch(
        `${API_URL}/auth/register`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            name: name.trim(),
            email: email.trim().toLowerCase(),
            password,
          }),
        }
      );

      let data;

      try {
        data = await response.json();
      } catch {
        throw new Error(
          "The server returned an invalid response."
        );
      }

      if (!response.ok) {
        throw new Error(
          data?.message ||
            "Unable to create admin account."
        );
      }

      if (
        !data?.token ||
        !data?.admin
      ) {
        throw new Error(
          "Invalid registration response from server."
        );
      }

      /*
       * The backend returns a JWT immediately
       * after successful registration.
       *
       * Therefore the new admin is automatically
       * logged in.
       */

      saveSession(
        data.token,
        data.admin
      );

      return data;
    } catch (error) {
      console.error(
        "Registration error:",
        error
      );

      if (
        error instanceof TypeError
      ) {
        throw new Error(
          `Cannot connect to the backend server at ${API_URL}.`
        );
      }

      throw error;
    }
  };

  /* =========================================================
     LOGOUT
  ========================================================= */

  const logout = () => {
    localStorage.removeItem(
      TOKEN_KEY
    );

    localStorage.removeItem(
      ADMIN_KEY
    );

    setAdmin(null);
  };

  /* =========================================================
     AUTH CONTEXT
  ========================================================= */

  return (
    <AuthContext.Provider
      value={{
        admin,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/* =========================================================
   USE AUTH
========================================================= */

export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}
