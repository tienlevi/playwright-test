import { useQuery } from "@tanstack/react-query";
import { getPostById, getPosts } from "../services/posts";

function usePost(id?: number) {
  return useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      if (id) {
        return await getPostById(id);
      } else {
        return await getPosts();
      }
    },
  });
}

export default usePost;
