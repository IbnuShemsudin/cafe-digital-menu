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

        /*
         * Only restore a real admin session.
         */
        if (
          parsedAdmin &&
          parsedAdmin.role === "admin"
        ) {
          setAdmin(parsedAdmin);
        } else {
          localStorage.removeItem(ADMIN_KEY);
          localStorage.removeItem(TOKEN_KEY);
        }
      } catch (error) {
        console.error(
          "Failed to restore admin session:",
          error
        );

        localStorage.removeItem(ADMIN_KEY);
        localStorage.removeItem(TOKEN_KEY);
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

    if (adminData.role !== "admin") {
      throw new Error(
        "This account does not have administrator access."
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
            email:
              email.trim().toLowerCase(),
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

      /*
       * Extra frontend protection.
       */
      if (
        data.admin.role !== "admin"
      ) {
        throw new Error(
          "This account does not have administrator access."
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
