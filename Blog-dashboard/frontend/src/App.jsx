import RootLayout from './Components/RootLayout'
import Login from './Components/Login'
import Signup from './Components/Signup'
import CreatePost from './Components/CreatePost'
import Posts from './Components/Posts'
import { store } from "../store/store"
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient , QueryClientProvider } from '@tanstack/react-query'
import PostDetailes from './Components/PostDetailes'
import Dashboard from './Components/Dashboard'

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <Login />,
        },
        {
          path: "signup",
          element: <Signup />,
        },
        {
          path: "create-post",
          element: <CreatePost />,
        },
        {
          path: "posts",
          element: <Posts />,
        },
        {
          path: "posts/:postId",
          element: <PostDetailes />,
        },
        {
          path: "/dashboard",
          element: <Dashboard />
        }

      ]
    }
  ])
 
  const queryClient = new QueryClient();

  return (
    <>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </Provider>
    </>
  )
}

export default App
