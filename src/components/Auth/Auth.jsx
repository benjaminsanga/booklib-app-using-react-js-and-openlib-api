import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { supabase } from "../../lib/supabase";
import "./Auth.css";
import { useAuth } from "../../context/auth";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  // const [isLogin, setIsLogin] = useState(true);
  const {user} = useAuth()

  if (!!user?.id) {
    toast.success("You are logged in already.")
    window.location.href = "/"
  }

  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) toast.error(error.message);
    else toast.success("Sign-up successful!");
  };

  const handleSignIn = async (e) => {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) toast.error(error?.message);
    else {
      toast.success("Login successful!");
      window.location.href = "/"
    }
  };

  return (
    <div className="auth-container">
      {/* Back to Home Link */}
      <a href="/" className="auth-back-link">
        <span>← Back to Home</span>
      </a>

      {/* Auth Form */}
      <div className="auth-form">
        {true ? (
          <>
            <h1 className="auth-form-title">Login</h1>
            <form>
              <input
                type="email"
                className="auth-input"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                className="auth-input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="submit"
                className="auth-button"
                onClick={(e) => handleSignIn(e)}
              >
                Sign In
              </button>
            </form>
          </>
        ) : (
          <>
            <h1 className="auth-form-title">Sign Up</h1>
            <form>
              <input
                type="email"
                className="auth-input"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="text"
                className="auth-input"
                placeholder="Role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
              <input
                type="password"
                className="auth-input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="auth-button auth-button-alt"
                onClick={handleSignUp}
              >
                Sign Up
              </button>
            </form>
          </>
        )}

        {/* Switch Link */}
        {/* <div
          className="auth-switch"
          onClick={() => setIsLogin(!isLogin)}
        >
          Or {isLogin ? "Sign up" : "Login"} instead
        </div> */}
      </div>
    </div>
  );
}

export default Auth