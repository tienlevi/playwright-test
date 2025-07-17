import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import usePost from "../hooks/usePost";

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const postId = id ? parseInt(id, 10) : undefined;

  const { data: post, isLoading, error } = usePost(postId);

  const handleGoBack = (): void => {
    navigate("/");
  };

  const handleKeyDown = (event: React.KeyboardEvent): void => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleGoBack();
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="size-12 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading post details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="text-red-700 border border-red-400 bg-red-100 rounded-lg px-6 py-4 mb-4">
            <h2 className="text-lg font-semibold mb-2">Error Loading Post</h2>
            <p>Unable to load the post details. Please try again later.</p>
          </div>
          <button
            onClick={handleGoBack}
            onKeyDown={handleKeyDown}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            tabIndex={0}
            aria-label="Go back to posts list"
          >
            Back to Posts
          </button>
        </div>
      </div>
    );
  }

  if (!post || (!Array.isArray(post) && typeof post === "object" && !post.id)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="text-yellow-700 border border-yellow-400 bg-yellow-100 rounded-lg px-6 py-4 mb-4">
            <h2 className="text-lg font-semibold mb-2">Post Not Found</h2>
            <p>The requested post could not be found.</p>
          </div>
          <button
            onClick={handleGoBack}
            onKeyDown={handleKeyDown}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            tabIndex={0}
            aria-label="Go back to posts list"
          >
            Back to Posts
          </button>
        </div>
      </div>
    );
  }

  // Handle case where usePost returns array (shouldn't happen with ID, but defensive programming)
  const currentPost = Array.isArray(post) ? post[0] : post;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Navigation */}
        <nav className="mb-6">
          <button
            onClick={handleGoBack}
            onKeyDown={handleKeyDown}
            className="text-blue-600 hover:text-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md px-2 py-1"
            tabIndex={0}
            aria-label="Go back to posts list"
          >
            Back to Posts
          </button>
        </nav>

        {/* Post Content */}
        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Post Header */}
          <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="bg-white bg-opacity-20 rounded-full px-3 py-1 text-sm">
                  Post #{currentPost.id}
                </div>
                <div className="bg-white bg-opacity-20 rounded-full px-3 py-1 text-sm">
                  User #{currentPost.userId}
                </div>
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight">
              {currentPost.title}
            </h1>
          </header>

          {/* Post Body */}
          <div className="px-6 py-8">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed text-lg">
                {currentPost.body}
              </p>
            </div>

            {/* Post Metadata */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <div>Post ID: {currentPost.id}</div>
                <div>Author ID: {currentPost.userId}</div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default PostDetail;
