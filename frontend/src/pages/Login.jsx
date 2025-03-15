import { useState } from "react";
import { Link } from "react-router-dom";
import loginImage from "../assets/login.jpg";
import path from "../utilities/path";
import { loginUser } from "../store/slice/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(loginUser({ email, password }));
    navigate(path.HOME);

    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex">
      {/* Left */}
      <div className="flex w-full flex-col items-center justify-center p-8 md:w-1/2 md:p-12">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md rounded-lg border bg-white p-8 shadow-sm"
        >
          <div className="mb-6 flex justify-center">
            <h2 className="text-xl font-medium">Cuong Boutique</h2>
          </div>
          <h2 className="mb-6 text-center text-2xl font-bold">Hey there! 👋</h2>
          <p className="mb-6 text-center">
            Enter your email and password to login
          </p>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-semibold">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded border p-2"
              placeholder="Enter your email address"
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-semibold">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded border p-2"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-black p-2 font-semibold text-white transition hover:bg-gray-800"
          >
            Sign in
          </button>
          <p className="mt-6 text-center text-sm">
            Don't have an account?
            <Link to={path.REGISTER} className="pl-1 text-blue-500 underline">
              Register
            </Link>
          </p>

          <p className="mt-6 text-center text-sm">
            <Link to={path.HOME} className="pl-1 text-blue-500 underline">
              &lt; Home
            </Link>
          </p>
        </form>
      </div>

      {/* Right */}
      <div className="hidden w-1/2 bg-gray-800 md:block">
        <div className="flex h-full flex-col items-center justify-center">
          <img
            src={loginImage}
            alt="login"
            className="object- h-[750px] w-full object-cover object-top"
          />
        </div>
      </div>
    </div>
  );
};
export default Login;
