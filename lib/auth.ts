// Store token in localStorage
export const setToken = (token: string) => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem("token", token);
  }
};

// Get token from localStorage
export const getToken = (): string | null => {
  try {
    if (typeof window === "undefined") return null;

    const token = sessionStorage.getItem("token");
    if (!token) return null;

    // Validate token format
    if (!token.match(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/)) {
      sessionStorage.removeItem("token");
      return null;
    }

    const [header, payload, signature] = token.split(".");

    // Validate header and payload are valid base64
    try {
      const decodedHeader = JSON.parse(atob(header));
      const decodedPayload = JSON.parse(atob(payload));

      // Check token algorithm
      if (!decodedHeader.alg) throw new Error("Invalid token algorithm");

      // Check required claims
      if (!decodedPayload.exp || !decodedPayload.iat) {
        throw new Error("Missing required claims");
      }

      // Check token expiration with 5 second buffer
      if (Date.now() >= decodedPayload.exp * 1000 - 5000) {
        throw new Error("Token expired");
      }

      return token;
    } catch (error) {
      console.error("Token validation failed:", error);
      sessionStorage.removeItem("token");
      return null;
    }
  } catch (error) {
    console.error("Token retrieval failed:", error);
    return null;
  }
};

// Remove token from localStorage
export const removeToken = () => {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem("token");
  }
};

// Register a new user
export const registerUser = async (
  email: string,
  password: string,
  username: string
) => {
  try {
    const response = await fetch("https://team42.incredmoney.com/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, username }),
    });

    const data = await response.json();

    if (!data.success) {
      return { success: false, message: data.message || "Registration failed" };
    }

    return { success: true, message: "User registered successfully" };
  } catch (error) {
    console.error("Registration error:", error);
    return { success: false, message: "Failed to register" };
  }
};

// Login a user
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await fetch("https://team42.incredmoney.com/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!data.success) {
      return {
        success: false,
        message: data.message || "Login failed invalid credentials",
      };
    }

    setToken(data.data);
    return { success: true, message: "Login successful", token: data.token };
  } catch (error) {
    return { success: false, message: "Failed to login" };
  }
};

export const updatePostMeta = async (postId: string, meta: any) => {
  try {
    const response = await fetch(
      `https://team42.incredmoney.com/api/users/posts/${postId}/update`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ payload: meta }),
      }
    );

    const data = await response.json();

    if (data.success) {
      return { success: true, message: "Post updated successfully" };
    } else {
      return { success: false, message: "Failed update post" };
    }
  } catch (error) {
    console.error("Failed to update post meta:", error);
  }
};

export const getAllPosts = async () => {
  try {
    const response = await fetch("https://team42.incredmoney.com/api/users/posts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });

    const data = await response.json();

    if (data.success) {
      return { success: true, posts: data.data };
    } else {
      return { success: false, message: "Failed to fetch posts" };
    }
  } catch (error) {
    console.error("Failed to fetch posts:", error);
  }
};
