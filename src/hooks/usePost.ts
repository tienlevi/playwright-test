import { useQuery } from "@tanstack/react-query";
import { getPostById, getPosts } from "../services/posts";

function usePost(id?: number) {
  return useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      return await getPosts();
    },
  });
}

export default usePost;
