const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

/* =========================================================
   TOKEN
========================================================= */

const getToken = () => {
  return localStorage.getItem("adminToken");
};

/* =========================================================
   REQUEST HELPER
========================================================= */

const request = async (endpoint, options = {}) => {
  const token = getToken();

  const isFormData =
    options.body instanceof FormData;

  const headers = {
    ...(options.headers || {}),
  };

  /*
   IMPORTANT:
   Do NOT manually set Content-Type for FormData.
   The browser creates the multipart boundary.
  */
  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  let response;

  try {
    response = await fetch(
      `${API_URL}${endpoint}`,
      {
        ...options,
        headers,
      }
    );
  } catch (error) {
    console.error("API connection error:", error);

    throw new Error(
      `Cannot connect to the backend server at ${API_URL}.`
    );
  }

  /*
   Handle empty responses safely.
  */

  const contentType =
    response.headers.get("content-type") || "";

  let data;

  try {
    if (
      contentType.includes("application/json")
    ) {
      data = await response.json();
    } else {
      const text = await response.text();

      data = text
        ? { message: text }
        : {};
    }
  } catch (error) {
    console.error(
      "Response parsing error:",
      error
    );

    throw new Error(
      "The server returned an invalid response."
    );
  }

  if (!response.ok) {
    throw new Error(
      data?.message ||
        `Request failed with status ${response.status}`
    );
  }

  return data;
};

/* =========================================================
   AUTH
========================================================= */

export const adminLogin = async (
  email,
  password
) => {
  return request(
    "/auth/login",
    {
      method: "POST",

      body: JSON.stringify({
        email,
        password,
      }),
    }
  );
};

/* =========================================================
   MENU
========================================================= */

/* GET ALL MENU ITEMS */

export const getMenuItems = async (
  params = {}
) => {
  const query =
    new URLSearchParams();

  if (
    params.category &&
    params.category !== "all"
  ) {
    query.set(
      "category",
      params.category
    );
  }

  if (
    params.availability &&
    params.availability !== "all"
  ) {
    query.set(
      "availability",
      params.availability
    );
  }

  if (params.search) {
    query.set(
      "search",
      params.search
    );
  }

  const queryString =
    query.toString();

  return request(
    `/menu${
      queryString
        ? `?${queryString}`
        : ""
    }`
  );
};

/* GET SINGLE MENU ITEM */

export const getMenuItem = async (
  id
) => {
  return request(
    `/menu/${id}`
  );
};

/* CREATE MENU ITEM */

export const createMenuItem = async (
  item
) => {
  return request(
    "/menu",
    {
      method: "POST",

      body: JSON.stringify(item),
    }
  );
};

/* UPDATE MENU ITEM */

export const updateMenuItem = async (
  id,
  item
) => {
  return request(
    `/menu/${id}`,
    {
      method: "PUT",

      body: JSON.stringify(item),
    }
  );
};

/* DELETE MENU ITEM */

export const deleteMenuItem = async (
  id
) => {
  return request(
    `/menu/${id}`,
    {
      method: "DELETE",
    }
  );
};

/* =========================================================
   EXPORT API URL
========================================================= */

export { API_URL };