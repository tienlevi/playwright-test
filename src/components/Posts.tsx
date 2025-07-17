import { useNavigate } from "react-router-dom";
import usePost from "../hooks/usePost";
import { Post } from "../interface/post";

function Posts() {
  const { data, isLoading, error } = usePost();
  const navigate = useNavigate();

  const handlePostClick = (postId: number): void => {
    navigate(`/post/${postId}`);
  };

  const handleKeyDown = (event: React.KeyboardEvent, postId: number): void => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handlePostClick(postId);
    }
  };

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

  const posts = Array.isArray(data) ? data : data ? [data] : [];

  return (
    <div className="lists space-y-4">
      {posts.slice(0, 5).map((post: Post) => (
        <div
          key={post.id}
          onClick={() => handlePostClick(post.id)}
          onKeyDown={(e) => handleKeyDown(e, post.id)}
          className="bg-white rounded-lg p-4 shadow transition-all duration-200 hover:shadow-lg hover:scale-[1.02] cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          role="button"
          tabIndex={0}
          aria-label={`Read full post: ${post.title}`}
        >
          <h2 className="text-xl font-semibold mb-2 text-blue-900 hover:text-blue-700 transition-colors">
            {post.title}
          </h2>
          <p className="text-gray-700 line-clamp-3">{post.body}</p>
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-gray-500 flex items-center space-x-4">
              <span>Post ID: {post.id}</span>
              <span>•</span>
              <span>User ID: {post.userId}</span>
            </div>
            <div className="flex items-center text-blue-600 text-sm font-medium">
              <span>Read more</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Posts;
