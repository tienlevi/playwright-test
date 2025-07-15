import usePost from "../hooks/usePost";
import { Post } from "../interface/post";

/**
 * Displays a list of up to five posts, showing a loading spinner while fetching and an error message if loading fails.
 *
 * Fetches posts using a custom hook and renders each post's title, body, and metadata in a styled card layout.
 *
 * @returns The rendered posts list, a loading indicator, or an error message.
 */
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

  return (
    <div className="lists space-y-4">
      {data?.slice(0, 5).map((post: Post) => (
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
