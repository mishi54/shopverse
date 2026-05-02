import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/api/auth";
import { auth_token_key } from "../../utils/apiUrls";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/User";
import { Link } from "react-router-dom";
export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginHandler] = useLoginMutation();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = async (values) => {
    setLoading(true);

    try {
      const response = await loginHandler({
        ...values,
        email: values.email.toLowerCase(),
      }).unwrap();

      if (response?.status === 200) {
        const token = response?.data?.token;

        dispatch(setUser(response?.data?.user));
        localStorage.setItem(auth_token_key, token);

        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-black text-white">
      <div className="glass p-12 rounded-3xl w-full max-w-md text-center">
        <h1 className="text-4xl font-bold mb-8 text-gradient">Login</h1>

        <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
        
          <input
            type="email"
            placeholder="Email"
            className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl focus:outline-none focus:border-white/20"
            {...register("email", {
              required: "Email is required",
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm text-left">
              {errors.email.message}
            </p>
          )}
          <input
            type="password"
            placeholder="Password"
            className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl focus:outline-none focus:border-white/20"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm text-left">
              {errors.password.message}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black font-bold py-4 rounded-2xl hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-8 text-gray-500 text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-white cursor-pointer">
            <span className="text-white cursor-pointer">Sign up</span>
          </Link>
        </p>
      </div>
    </div>
  );
}