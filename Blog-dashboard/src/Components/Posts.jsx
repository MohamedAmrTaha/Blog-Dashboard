import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getPosts } from "../../http";
import { Link, useNavigate } from "react-router-dom";
import { use, useEffect } from "react";
function Posts() {
    const queryClient = useQueryClient();
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();
    useEffect(() => {
      if (!token) {
        navigate("/"); 
      }
    }, []);

    const {data: posts, isPending, error} = useQuery({
      queryKey: ["posts"],
      queryFn: ()=>getPosts(token),
    });

  return(
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">All Posts</h1>
      <ul className="space-y-2 ">
        {posts?.map((post) => (
          <Link to={`${post.id}`} className="no-underline text-black" key={post.id}>  
            <li key={post.id} className="p-3 border rounded flex justify-between my-2 hover:bg-gray-200 w-4/5 mx-auto border-blue-300 hover:border-blue-500 transition duration-300 ease-in-out cursor-pointer shadow-md">
              <div>
                <h3 className="font-bold">{post.title}</h3>
                <p>{post.body}</p>
                <p className="text-sm text-gray-500">By {post.author}</p>
                <p className="text-sm text-gray-500">{new Date(post.publishedAt).toLocaleDateString()}</p>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
export default Posts;