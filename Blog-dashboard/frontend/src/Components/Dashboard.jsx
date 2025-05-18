import { getUserPosts } from "../../http";
import { useQuery } from "@tanstack/react-query";
import { redirect, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Dashboard() {
    const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/"); 
    }
  }, []);
    
  const { data: posts, isPending, error } = useQuery({
    queryKey: ["user-posts"],
    queryFn: () => getUserPosts(token),
  });
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold text-blue-600">Dashboard</h2>

      {user ? (
        <div className="mt-4">
          <p className="text-gray-700">
            Username: <span className="font-semibold">{user.name}</span>
          </p>
          <p className="text-gray-700">
            Email:{" "}
            <span className="font-semibold">
              {user.email ?? "Not provided"}
            </span>
          </p>
        </div>
      ) : (
        <p className="text-gray-500">No user information available.</p>
      )}

      <h3 className="text-xl font-semibold text-gray-800 mt-6">
        Your Blog Posts:
      </h3>

      {isPending && <p className="text-gray-500">Loading posts...</p>}
      {error && <p className="text-red-500">{error.message}</p>}

      {posts?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-gray-100 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-800">
                {post.title}
              </h3>
              <p className="text-gray-600">{post.body.slice(0, 100)}...</p>
              <button
                className="mt-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
                onClick={() => navigate(`/posts/${post.id}`)}
              >
                View Post
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mt-4">
          No posts found.{" "}
          <button
            onClick={() => navigate("/create-post")}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            Create one?
          </button>
        </p>
      )}
    </div>
  );
}

export default Dashboard;
