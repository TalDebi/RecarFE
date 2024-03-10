import { CredentialResponse } from "@react-oauth/google";
import {
  AuthorizedUser,
  SecuredUser,
  Tokens,
  User,
  UserCredentials,
} from "./types";

const uri = "http://localhost:3001";

export const registerUser = async (user: User): Promise<AuthorizedUser> => {
  try {
    const response = await fetch(`${uri}/auth/register`, {
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
    const response = await fetch(`${uri}/auth/google`, {
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

export const login = async (user: UserCredentials): Promise<AuthorizedUser> => {
  try {
    const response = await fetch(`${uri}/auth/login`, {
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
    console.error("Error logging in user:", error);
    throw error;
  }
};

export const logout = async (): Promise<void> => {
  const tokens: Tokens = JSON.parse(localStorage.getItem("tokens") ?? "{}");
  try {
    const response = await fetch(`${uri}/auth/logout`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${tokens?.refreshToken}`,
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

export const editUser = async (user: User): Promise<SecuredUser> => {
  const tokens: Tokens = JSON.parse(localStorage.getItem("tokens") ?? "{}");
  try {
    const response = await fetch(`${uri}/auth/${user._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokens?.accessToken}`,
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json();
  } catch (error) {
    console.error("Error during edit user details:", error);
    throw error;
  }
};
