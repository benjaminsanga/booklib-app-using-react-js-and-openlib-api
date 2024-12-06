import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { supabase } from "../../lib/supabase";
import "./Auth.css";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) toast.error(error.message);
    else toast.success("Sign-up successful!");
  };

  const handleSignIn = async () => {
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
        {isLogin ? (
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
                type="button"
                className="auth-button"
                onClick={handleSignIn}
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
        <div
          className="auth-switch"
          onClick={() => setIsLogin(!isLogin)}
        >
          Or {isLogin ? "Sign up" : "Login"} instead
        </div>
      </div>
    </div>
  );
}

export default Auth