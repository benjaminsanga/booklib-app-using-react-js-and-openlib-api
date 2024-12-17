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
  const [isAdminLogin, setIsAdminLogin] = useState(false);
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

  const handleSignInAsAdmin = async (e) => {
    e.preventDefault();
    try {  
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
  
      if (authError) {
        toast.error(authError.message);
      } else {
        localStorage.setItem("nasfa-user-role", "admin")
        toast.success("Login successful!");
        window.location.href = "/";
      }
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred");
    }
  };

  const handleSignInAsStudent = async (e) => {
    e.preventDefault();
    try {
      // Verify the user's credentials against the "students" table
      const { data: student1, error: queryError1 } = await supabase
        .from("short_course_students")
        .select("id, email")
        .eq("email", email)
        .eq("password", password)
        .single();

      const { data: student2, error: queryError2 } = await supabase
        .from("long_course_students")
        .select("id, email")
        .eq("email", email)
        .eq("password", password)
        .single();
  
      if (queryError1 || !student1 || queryError2 || !student2) {
        toast.error("Invalid email or password");
        return;
      } else {
        localStorage.setItem("nasfa-user-role", "student")
        toast.success("Login successful!");
        window.location.href = "/";
      }
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred");
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
            <h1 className="auth-form-title">{isAdminLogin ? "Admin" : "Student"} Login</h1>
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
                onClick={(e) => isAdminLogin ? handleSignInAsAdmin(e) : handleSignInAsStudent(e)}
              >
                Sign In
              </button>
            </form>
            <div
              className="auth-switch"
              onClick={() => setIsAdminLogin(!isAdminLogin)}
            >
              Or {isAdminLogin ? "Login as Student" : "Login as Admin"} instead
            </div>
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