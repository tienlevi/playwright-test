import usePost from "../hooks/usePost";
import { Post } from "../services/posts";

function Posts() {
  const { data, isLoading, error } = usePost();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-40">
        <div className="size-12 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-700 border border-red-400 bg-red-100 rounded px-4 py-3">
        <p>Error loading posts. Please try again later.</p>
      </div>
    );
  }

  // Ensure data is treated as an array of valid Post objects
  const posts = Array.isArray(data) ? data : data ? [data] : [];

  return (
    <div className="lists space-y-4">
      {posts.slice(0, 20).map((post: Post) => (
        <div
          key={post.id}
          className="bg-white rounded-lg p-4 shadow transition-shadow hover:shadow-md"
          role="listitem"
          aria-label={post.title}
        >
          <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
          <p className="text-gray-700">{post.body}</p>
          <div className="mt-2 text-sm text-gray-500">
            Post ID: {post.id} • User ID: {post.userId}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Posts;
