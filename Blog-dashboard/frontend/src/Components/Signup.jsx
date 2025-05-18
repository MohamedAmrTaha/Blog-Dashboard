import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {login} from "../../store/authSlice"; // Import the login action from your auth slice
import { useMutation } from "@tanstack/react-query";
import { signupUser } from "../../http"; 
import { Link } from "react-router-dom";

function Signup(){
      const [name, setName] = useState("");
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [didEdit,setDidEdit] = useState({
        name: false,
        email: false,
        password: false,
      });
      const dispatch = useDispatch();
      const navigate = useNavigate();
      
      const { mutate, isPending, error } = useMutation({
        mutationFn: signupUser,
        onSuccess: (data) => {
          navigate("/"); 
        }
      });

      const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !password) {
          setDidEdit({
            name: true,
            email: true,
            password: true,
          });
          return;
        }
        if (!email.includes("@")) {
          setDidEdit((prev) => ({ ...prev, email: true }));
          return;
        }
        if (password.length < 6) {
          setDidEdit((prev) => ({ ...prev, password: true }));
          return;
        }
        
        mutate({ name, email, password });
      };

      const handleBlur = (identifier) => {
        setDidEdit((prev) => ({ ...prev, [identifier]: true }));
      }
      
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <form
            onSubmit={handleSubmit}
            className="p-6 bg-white rounded shadow-md w-80"
          >
            <h2 className="text-2xl mb-4 text-center">Sign Up</h2>
            {error && <p className="text-red-500 mb-3">{error.message}</p>}
            <input
              type="text"
              placeholder="Name"
              className="w-full p-2 mb-3 border rounded"
              value={name}
              onChange={(e) => {setName(e.target.value)
              setDidEdit((prev) => ({ ...prev, name: false }))}}
              onBlur={() => handleBlur("name")}
              required
            />
            {didEdit.name && !name && <p className="text-red-500 mb-3">Enter your name</p>}
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 mb-3 border rounded"
              value={email}
              onChange={(e) => {setEmail(e.target.value)
              setDidEdit((prev) => ({ ...prev, email: false }))}
              }
              onBlur={() => handleBlur("email")}
              required
            />
            {didEdit.email && !email.includes('@') &&<p className="text-red-500 mb-3">Enter a valid email</p>}
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 mb-3 border rounded"
              value={password}
              onChange={(e) => {setPassword(e.target.value)
              setDidEdit((prev) => ({ ...prev, password: false }))}
              }
              onBlur={() => handleBlur("password")}
              minLength={6}
              required
            />
            {didEdit.password && password.length<6 && <p className="text-red-500 mb-3">Password must be at least 6 charachters</p>}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded cursor-pointer hover:bg-blue-600"
              disabled={isPending}
            >
              {isPending ? "Signing Up..." : "Sign Up"}
            </button>
            <p className="mt-3 text-center text-sm">
              Already have an account?{" "}
              <Link to="/" className="text-blue-500 hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      );
    };
export default Signup;
