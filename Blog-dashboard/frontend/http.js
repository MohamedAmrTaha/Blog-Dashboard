export function signupUser(userData) {
  return fetch("http://localhost:8080/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then(async (response) => {
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Can't signup user.");
        
      }
      console.log("User signed up successfully:", response);
      return response.json();
    })
    .catch((error) => {
      throw error;
      console.error("There was a problem with the fetch operation:", error);
    });
}

export function loginUser(userData) {
  return fetch("http://localhost:8080/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then(async (response) => {
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Can't login user.");
      }
      console.log("User logged in successfully:", response);
      return response.json();
    })
    .catch((error) => {
      throw error;
      console.error("There was a problem with the fetch operation:", error);
    });
}

export function createPost(data) {

  return fetch("http://localhost:8080/new-post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${data.token}`,
    },
    body: JSON.stringify(data.postData),
  })
    .then(async(response) => {
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Can't create post.");
      }
      console.log("Post created successfully:", response);
      return response.json();
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

export function getPosts(token) {
  return fetch("http://localhost:8080/posts", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`

    },
  })
    .then(async (response) => {
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Can't get posts.");
      }
      console.log("Posts fetched successfully:", response);
      return response.json();
    })
    .catch((error) => {
      throw error;
      console.error("There was a problem with the fetch operation:", error);
    });
}

export function deletePost(data) {
  return fetch(`http://localhost:8080/delete-post/${data.postId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${data.token}`
    },
  })
    .then(async (response) => {
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Can't delete post.");
      }
      console.log("Post deleted successfully:", response);
      return response.json();
    })
    .catch((error) => {
      throw error;
      console.error("There was a problem with the fetch operation:", error);
    });
}

export function getPostById(data) {
  return fetch(`http://localhost:8080/posts/${data.postId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${data.token}`
    },
  })
    .then(async (response) => {
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Can't get post by ID.");
      }
      console.log("Post fetched successfully:", response);
      return response.json();
    })
    .catch((error) => {
      throw error;
      console.error("There was a problem with the fetch operation:", error);
    });
}

export function getUserPosts(token) {
  return fetch("http://localhost:8080/user-posts", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`
    },
  })
    .then(async (response) => {
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Can't get user posts.");
      }
      console.log("User posts fetched successfully:", response);
      return response.json();
    })
    .catch((error) => {
      throw error;
      console.error("There was a problem with the fetch operation:", error);
    });
}
