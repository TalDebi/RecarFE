import apiClient from "../services/api-client";
import { CredentialResponse } from "@react-oauth/google";
import {
  AuthorizedUser,
  SecuredUser,
  Tokens,
  User,
  UserCredentials,
} from "./types";

export const registerUser = async (user: User): Promise<AuthorizedUser> => {
  const response = await apiClient.post("/auth/register", user);
  return response.data;
};

export const googleSignin = async (
  credentialResponse: CredentialResponse
): Promise<AuthorizedUser> => {
  const response = await apiClient.post("/auth/google", credentialResponse);
  return response.data;
};

export const login = async (user: UserCredentials): Promise<AuthorizedUser> => {
  const response = await apiClient.post("/auth/login", user);
  return response.data;
};

export const logout = async (): Promise<void> => {
  const tokens: Tokens = JSON.parse(localStorage.getItem("tokens") ?? "{}");
  await apiClient.get("/auth/logout", {
    headers: {
      Authorization: `Bearer ${tokens?.refreshToken}`,
    },
  });
};

export const refreshTokens = async (): Promise<Tokens> => {
  const tokens: Tokens = JSON.parse(localStorage.getItem("tokens") ?? "{}");
  console.log(tokens);
  const response = await apiClient.get("/auth/refresh", {
    headers: {
      Authorization: `Bearer ${tokens?.refreshToken}`,
    },
  });
  return response.data;
};

export const editUser = async (user: User): Promise<SecuredUser> => {
  const tokens: Tokens = JSON.parse(localStorage.getItem("tokens") ?? "{}");
  console.log(tokens);
  const response = await apiClient.put(`/auth/${user._id}`, user, {
    headers: {
      Authorization: `Bearer ${tokens?.accessToken}`,
    },
  });
  return response.data;
};

export const fetchLikedPostsInfo = async (userID: string): Promise<[]> => {
  const tokens: Tokens = JSON.parse(localStorage.getItem("tokens") ?? "{}");
  const response = await apiClient.get(`/user/likedPosts/${userID}`, {
    headers: {
      Authorization: `Bearer ${tokens?.accessToken}`,
    },
  });
  return response.data?.likedPosts;
};
