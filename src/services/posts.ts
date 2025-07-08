import axios from "axios";
import { apiUrl } from "../constants";
import { Post } from "../interface/post";

export const getPosts = async (): Promise<Post[]> => {
  try {
    const response = await axios.get(`${apiUrl}/posts`);

    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

export const getPostById = async (id: number): Promise<Post> => {
  try {
    const response = await axios.get(`${apiUrl}/posts/${id}`);

    return response.data;
  } catch (error) {
    console.error(`Error fetching post with ID ${id}:`, error);
    throw error;
  }
};
