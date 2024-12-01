import { useState } from "react";
import "../Styles/singUp.css";
import { signUp } from "../api/SingUp";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";

function SignUpForm() {
  const [formData, setFormData] = useState({
    userName: "",
    Email: "",
    Password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(formData.Email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const response = await signUp(formData);
      console.log(response);
      if (response.status === 201) {
        navigate("/login");
      } else {
        setError("Failed to create account. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="SignUpPage">
      <div className="form-container">
        <h1 id="signUpTitle">Create Account</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="Email"
              value={formData.Email}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="Password"
                value={formData.Password}
                onChange={handleChange}
                className="input-field"
                required
              />
              <span
                onClick={togglePasswordVisibility}
                className="password-toggle"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>
          </div>

          <button type="submit" className="loginButton" disabled={loading}>
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <div className="redirect-to-login">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="redirect-link">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;
