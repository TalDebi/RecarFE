import { CredentialResponse } from "@react-oauth/google";
import {
  AuthorizedUser,
  SecuredUser,
  Tokens,
  User,
  UserCredentials,
} from "./types";

const uri = "http://localhost:3000";

export const registerUser = async (user: User): Promise<AuthorizedUser> => {
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
};

export const googleSignin = async (
  credentialResponse: CredentialResponse
): Promise<AuthorizedUser> => {
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
};

export const login = async (user: UserCredentials): Promise<AuthorizedUser> => {
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
};

export const logout = async (): Promise<void> => {
  const tokens: Tokens = JSON.parse(localStorage.getItem("tokens") ?? "{}");
  const response = await fetch(`${uri}/auth/logout`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${tokens?.refreshToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
};

export const editUser = async (user: User): Promise<SecuredUser> => {
  const tokens: Tokens = JSON.parse(localStorage.getItem("tokens") ?? "{}");
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
};

export const fetchLikedPostsInfo = async (userID: string): Promise<[]> => {
  const tokens: Tokens = JSON.parse(localStorage.getItem("tokens") ?? "{}");

  const response = await fetch(`${uri}/user/likedPosts/${userID}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${tokens?.accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("cannot get user liked posts!");
  }

  return response.json()?.likedPosts;
};
