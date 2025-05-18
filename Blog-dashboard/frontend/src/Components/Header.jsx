import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/authSlice";
import { use } from "react";


const Header = () => {
  const dispatch = useDispatch();
  
  let token = useSelector((state) => state.auth.token);
  if (!token) {
    token = localStorage.getItem("token"); 
  }
   
  const handleLogout = () => {
    
    dispatch(logout()); // Clear user data from Redux store
  }
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Blog Dashboard</h1>
        <nav className="flex gap-6">
          {token && (
            <div className="flex gap-6">
              <Link to="/dashboard" className="hover:text-gray-300">
                Dashboard
              </Link>
              <Link to="/posts" className="hover:text-gray-300">
                Posts
              </Link>
              <Link to="/create-post" className="hover:text-gray-300">
                New Post
              </Link>
              <Link to="/" onClick={handleLogout} className="hover:text-gray-300">
                Logout
              </Link>
            </div>
          )}
          {!token && (
            <Link to="/signup" className="hover:text-gray-300">
              Signup
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
