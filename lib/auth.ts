// Client-side authentication utilities

// Mock user data
const MOCK_USERS: { email: string; password: string }[] = [];

// Store token in localStorage
export const setToken = (token: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token);
  }
};

// Get token from localStorage
export const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

// Remove token from localStorage
export const removeToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
  }
};

// Register a new user
export const registerUser = (email: string, password: string) => {
  try {
    // Check if user already exists
    const existingUser = MOCK_USERS.find((user) => user.email === email);
    if (existingUser) {
      return { success: false, message: "User already exists" };
    }

    // Add user to mock database
    MOCK_USERS.push({ email, password });

    // For debugging
    console.log("Registered user:", email);
    console.log("Current users:", MOCK_USERS);

    return { success: true, message: "User registered successfully" };
  } catch (error) {
    console.error("Registration error:", error);
    return { success: false, message: "Failed to register" };
  }
};

// Login a user
export const loginUser = (email: string, password: string) => {
  try {
    // For debugging
    console.log("Login attempt:", email);
    console.log("Current users:", MOCK_USERS);

    // Check if user exists and password matches
    const user = MOCK_USERS.find(
      (user) => user.email === email && user.password === password
    );

    // For testing purposes, allow any login if no users exist
    if (MOCK_USERS.length === 0 || user) {
      // Generate a simple token
      const token = btoa(`${email}:${Date.now()}`);
      setToken(token);

      return {
        success: true,
        message: "Login successful",
        token,
        user: { email },
      };
    }

    return { success: false, message: "Invalid credentials" };
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, message: "Failed to login" };
  }
};
