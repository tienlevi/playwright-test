import axios from "axios";
import { BASE_URL } from "../constants";

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const getPosts = async (): Promise<Post[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/posts`);

    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

export const getPostById = async (id: number): Promise<Post> => {
  try {
    const response = await axios.get(`${BASE_URL}/posts/${id}`);

    return response.data;
  } catch (error) {
    console.error(`Error fetching post with ID ${id}:`, error);
    throw error;
  }
};
