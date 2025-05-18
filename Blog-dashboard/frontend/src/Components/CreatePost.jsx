import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { createPost } from "../../http";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

function CreatePost() {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    
    const token = localStorage.getItem("token"); // Get token from local storage
    const navigate = useNavigate(); // Import useNavigate from react-router-dom
    const queryClient = useQueryClient();
    useEffect(()=>{
        if (!token) {
            navigate("/"); // Redirect to login page if token is not present
        }
    },[])

    const { mutate, isPending, error } = useMutation({
      mutationFn: createPost,
      onSuccess: (data) => {
        console.log("Post created successfully:", data);
        queryClient.invalidateQueries(["posts"]);
        navigate("/posts"); // Redirect to posts page after successful post creation
      },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !body) {
            alert("Please fill in all fields.");
            return;
        }
        const postData = { title, body };
        mutate( {postData, token} );
    };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Create Post</h1>
      <form onSubmit={handleSubmit} className="space-y-3 w-1/2 mx-auto">
        <input
          type="text"
          placeholder="Title"
          className="w-full p-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Body"
          className="w-full p-2 border rounded"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded cursor-pointer hover:bg-blue-600 w-full"
          disabled={isPending}
        >
          {isPending ? "Saving..." : "Save Post"}
        </button>
      </form>
    </div>
  );
}
export default CreatePost;