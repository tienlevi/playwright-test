import { useQuery } from "@tanstack/react-query";
import { getPostById, getPosts } from "../services/posts";

/**
 * React hook that fetches and caches the list of posts.
 *
 * Always retrieves all posts, regardless of the optional `id` parameter.
 * Returns the result of the `useQuery` hook for posts data.
 */
function usePost(id?: number) {
  return useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      return await getPosts();
    },
  });
}

export default usePost;
