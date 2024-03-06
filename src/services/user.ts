import { CredentialResponse } from "@react-oauth/google";
import { User } from "./types";

export const register = async (user: User): Promise<User> => {
  try {
    const response = await fetch(`http://localhost:3000/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json();
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};

export const googleSignin = async (
  credentialResponse: CredentialResponse
): Promise<User> => {
  try {
    const response = await fetch(`http://localhost:3000/auth/google`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentialResponse),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json();
  } catch (error) {
    console.error("Error during Google Signin:", error);
    throw error;
  }
};

export const loginUser = async (user: User): Promise<void> => {
  try {
    const response = await fetch(`http://localhost:3000/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};

export const logout = async (refreshToken: string): Promise<void> => {
  try {
    const response = await fetch(`http://localhost:3000/auth/logout`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  } catch (error) {
    console.error("Error logging out user:", error);
    throw error;
  }
};
