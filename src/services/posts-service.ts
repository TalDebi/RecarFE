import { AxiosResponse } from "axios";
import { Comment } from "../pages/Car/CommentsTree";
import apiClient, { CanceledError } from "./api-client";

export interface SearchQuery {
  make?: string | string[];
  model?: string | string[];
  color?: string | string[];
  city?: string | string[];
  hand?: string | string[];
  year?: {
    max?: number;
    min?: number;
  };
  price?: {
    max?: number;
    min?: number;
  };
  mileage?: {
    max?: number;
    min?: number;
  };
}

export { CanceledError };
export const getAllPosts = (query: SearchQuery) => {
  const abortController = new AbortController();
  const req = apiClient.get("post", {
    signal: abortController.signal,
    params: query,
  });
  return { req, abort: () => abortController.abort() };
};

export const getAllColors = () => {
  const abortController = new AbortController();
  const req = apiClient.get("car/colors", {
    signal: abortController.signal,

  });
  return { req, abort: () => abortController.abort() };
};

export const getAllCities = () => {
  const abortController = new AbortController();
  const req = apiClient.get("car/cities", {
    signal: abortController.signal,
  });
  return { req, abort: () => abortController.abort() };
};

export const getPost = (id: string) => {
  const abortController = new AbortController();
  const req = apiClient.get("post/" + id + "/populated", {
    signal: abortController.signal,
  });
  return { req, abort: () => abortController.abort() };
};

export const getPostsByUser = (id: string) => {
  const abortController = new AbortController();
  const req: Promise<AxiosResponse<string[], any>> = apiClient.get(
    "post/user/" + id,
    {
      signal: abortController.signal,
    }
  );
  return { req, abort: () => abortController.abort() };
};

export const addComment = (postId: string, comment: Comment) => {
  const abortController = new AbortController();
  const req = apiClient.post("post/" + postId + "/comment", comment, {
    signal: abortController.signal,
  });
  return { req, abort: () => abortController.abort() };
};

export const addReply = (postId: string, commentId: string, reply: Comment) => {
  const abortController = new AbortController();
  const req = apiClient.post(
    "post/" + postId + "/comment/" + commentId + "/reply",
    reply,
    {
      signal: abortController.signal,
    }
  );
  return { req, abort: () => abortController.abort() };
};

export const editComment = (
  postId: string,
  commentId: string,
  comment: Object
) => {
  const abortController = new AbortController();
  const req = apiClient.put(
    "post/" + postId + "/comment/" + commentId,
    comment,
    {
      signal: abortController.signal,
    }
  );
  return { req, abort: () => abortController.abort() };
};
export const editReply = (
  postId: string,
  commentId: string,
  replyId: string,
  reply: Object
) => {
  const abortController = new AbortController();
  const req = apiClient.put(
    "post/" + postId + "/comment/" + commentId + "/reply/" + replyId,
    reply,
    {
      signal: abortController.signal,
    }
  );
  return { req, abort: () => abortController.abort() };
};
export const deleteComment = (postId: string, commentId: string) => {
  const abortController = new AbortController();
  const req = apiClient.delete("post/" + postId + "/comment/" + commentId, {
    signal: abortController.signal,
  });
  return { req, abort: () => abortController.abort() };
};

export const deleteReply = (
  postId: string,
  commentId: string,
  replyId: string
) => {
  const abortController = new AbortController();
  const req = apiClient.delete(
    "post/" + postId + "/comment/" + commentId + "/reply/" + replyId,
    {
      signal: abortController.signal,
    }
  );
  return { req, abort: () => abortController.abort() };
};

export const createPost = (post: any) => {
  const abortController = new AbortController();
  const req = apiClient.post("post/", post, {
    signal: abortController.signal,
  });
  return { req, abort: () => abortController.abort() };
};

export const deletePost = (postId: string) => {
  const abortController = new AbortController();
  const req = apiClient.delete("post/" + postId, {
    signal: abortController.signal,
  });
  return { req, abort: () => abortController.abort() };
};