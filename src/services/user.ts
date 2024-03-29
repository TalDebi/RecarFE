import { CredentialResponse } from "@react-oauth/google";
import {
  AuthorizedUser,
  SecuredUser,
  Tokens,
  User,
  UserCredentials,
} from "./types";
import apiClient from "./api-client";

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
  const response = await apiClient.get("/auth/refresh", {
    headers: {
      Authorization: `Bearer ${tokens?.refreshToken}`,
    },
  });
  return response.data;
};

export const editUser = async (user: User): Promise<SecuredUser> => {
  const response = await apiClient.put(`/auth/${user._id}`, user);
  return response.data;
};

export const fetchLikedPostsInfo = async (userID: string): Promise<[]> => {
  const response = await apiClient.get(`user/${userID}/likedPosts`);

  if (response.status >= 300) {
    throw new Error("cannot get user liked posts!");
  }

  return response?.data.likedPosts;
};

export const likePost = (userId: string, postId: string) => {
  const abortController = new AbortController();
  const req = apiClient.post(
    `user/${userId}/likedPosts`,
    { _id: postId },
    {
      signal: abortController.signal,
    }
  );
  return { req, abort: () => abortController.abort() };
};
export const dislikePost = (userId: string, postId: string) => {
  const abortController = new AbortController();
  const req = apiClient.delete(`user/${userId}/likedPosts/${postId}`, {
    signal: abortController.signal,
  });
  return { req, abort: () => abortController.abort() };
};
