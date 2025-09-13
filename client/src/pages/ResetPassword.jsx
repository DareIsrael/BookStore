import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./ResetPassword.module.css";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({ password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({ strength: 0, label: "" });

  // Check password strength
  useEffect(() => {
    const calculateStrength = () => {
      if (!form.password) return { strength: 0, label: "" };

      let strength = 0;
      let label = "";

      // Length check
      if (form.password.length >= 8) strength += 1;
      // Uppercase check
      if (/[A-Z]/.test(form.password)) strength += 1;
      // Lowercase check
      if (/[a-z]/.test(form.password)) strength += 1;
      // Number check
      if (/[0-9]/.test(form.password)) strength += 1;
      // Special character check
      if (/[^A-Za-z0-9]/.test(form.password)) strength += 1;

      if (strength <= 2) label = "Weak";
      else if (strength <= 4) label = "Medium";
      else label = "Strong";

      return { strength, label };
    };

    setPasswordStrength(calculateStrength());
  }, [form.password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 
    setMessage("");
    setIsLoading(true);

    // Client-side validation
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setIsLoading(false);
      return;
    }

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/user/reset-password/${token}`,
        { password: form.password }
      );
      setMessage(res.data.message || "Password reset successfully! Redirecting to login...");
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setError(
        err.response?.data?.message || 
        err.response?.data?.error || 
        "Something went wrong. The reset link may have expired."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>Reset Your Password</h2>
        <p className={styles.subtitle}>
          Create a new strong password for your account
        </p>

        <div className={styles.passwordRules}>
          <h4>Password Requirements:</h4>
          <ul>
            <li>At least 6 characters long</li>
            <li>Include uppercase and lowercase letters</li>
            <li>Include numbers and special characters</li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <input
              type="password"
              name="password"
              placeholder="New Password"
              value={form.password}
              onChange={handleInputChange}
              required
              className={styles.input}
              disabled={isLoading}
              minLength={6}
            />
            {form.password && (
              <div className={styles.passwordStrength}>
                <div>Strength: {passwordStrength.label}</div>
                <div className={styles.strengthBar}>
                  <div 
                    className={`${styles.strengthFill} ${
                      passwordStrength.strength <= 2 ? styles.strengthWeak :
                      passwordStrength.strength <= 4 ? styles.strengthMedium :
                      styles.strengthStrong
                    }`}
                  ></div>
                </div>
              </div>
            )}
          </div>

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm New Password"
            value={form.confirmPassword}
            onChange={handleInputChange}
            required
            className={styles.input}
            disabled={isLoading}
            minLength={6}
          />

          <button 
            type="submit" 
            className={`${styles.button} ${isLoading ? styles.loading : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className={styles.spinner}></span>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>

        {message && (
          <>
            <div className={styles.success}>{message}</div>
            <div className={styles.redirectMessage}>Redirecting to login page...</div>
          </>
        )}
        {error && <div className={styles.error}>{error}</div>}
      </div>
    </div>
  );
}