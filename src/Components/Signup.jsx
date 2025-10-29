import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import logo from "../assets/images/logo.png";

const Signup = () => {
  const navigate = useNavigate();
  const [codeCooldown, setCodeCooldown] = useState(0);
  // new handler for code request
  const handleGetCode = async (email) => {
    if (!email) return alert("Enter email first");
    try {
      await fetch("http://localhost:5000/api/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      // Optionally handle the response
      setCodeCooldown(60);
      const interval = setInterval(() => {
        setCodeCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      alert("Failed to send verification code");
    }
  };

  // Updated handleSignup: POST to backend
  const handleSignup = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if (response.ok) {
        navigate("/home");
      } else {
        setErrors({ email: data.message || "Signup failed" });
      }
    } catch (err) {
      setErrors({ email: "Server error" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ backgroundColor: "black", minHeight: "100vh", color: "white" }}>
      <div style={{ textAlign: "center", padding: "20px" }}>
        <img src={logo} alt="Logo" style={{ width: 300, height: 200, marginBottom: 10 }} />
        <h2>Let's get you started</h2>

        <Formik

          initialValues={{ name: "", email: "", password: "", code: "" }}
          validationSchema={Yup.object({
            name: Yup.string().required("Name is required"),
            email: Yup.string().email("Invalid email").required("Email is required"),
            code: Yup.string().required('Verification code is required'),
            password: Yup.string().min(6, "Password too short").required("Password is required"),
          })}
          onSubmit={handleSignup}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => {
            const isFormValid = values.name && values.email && values.password && values.code;
            return (
              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "15px",
                  marginTop: "20px",
                }}
              >
                {/* Name */}
                <div style={{ width: "75%" }}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    style={{
                      width: "100%",
                      padding: "12px",
                      borderRadius: "8px",
                      border: "1px solid #888",
                      backgroundColor: "#1e1e1e",
                      color: "white",
                    }}
                  />
                  {touched.name && errors.name && (
                    <p style={{ color: "red", fontSize: "14px" }}>{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div style={{ width: "75%" }}>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    style={{
                      width: "100%",
                      padding: "12px",
                      borderRadius: "8px",
                      border: "1px solid #888",
                      backgroundColor: "#1e1e1e",
                      color: "white",
                    }}
                  />
                  {touched.email && errors.email && (
                    <p style={{ color: "red", fontSize: "14px" }}>{errors.email}</p>
                  )}
                </div>
                {/* Verification Code */}
                <div style={{ width: '75%' }}>
                  <label>Verification Code</label>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                      type="text"
                      name="code"
                      placeholder="Enter your code"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.code}
                      style={{
                        flex: 1,
                        padding: '12px',
                        borderRadius: '10px',
                        border: '1px solid #888',
                        backgroundColor: '#1e1e1e',
                        color: 'white',
                        marginRight: '8px',
                      }}
                    />
                     {/* ...inside Formik render function...*/}
                    {/*(replace your Get Code button)*/}
                    <button
                      type="button"
                      onClick={() => handleGetCode(values.email)}
                      disabled={codeCooldown > 0}
                      style={{
                        padding: '10px 16px',
                        backgroundColor: codeCooldown > 0 ? '#888' : '#FFD700',
                        borderRadius: '10px',
                        border: 'none',
                        color: 'black',
                        fontWeight: '600',
                        cursor: codeCooldown > 0 ? 'not-allowed' : 'pointer'
                      }}
                    >
                      {codeCooldown > 0 ? `Resend in ${codeCooldown}s` : "Get Code"}
                    </button>

                  </div>
                  {touched.code && errors.code && (
                    <p style={{ color: 'red', fontSize: '14px' }}>{errors.code}</p>
                  )}
                </div>

                {/* Password */}
                <div style={{ width: "75%" }}>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    style={{
                      width: "100%",
                      padding: "12px",
                      borderRadius: "8px",
                      border: "1px solid #888",
                      backgroundColor: "#1e1e1e",
                      color: "white",
                    }}
                  />
                  {touched.password && errors.password && (
                    <p style={{ color: "red", fontSize: "14px" }}>{errors.password}</p>
                  )}
                </div>

                {/* Signup Button */}
                <button
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  style={{
                    width: "75%",
                    padding: "15px",
                    borderRadius: "12px",
                    backgroundColor: isFormValid ? "yellow" : "#555",
                    color: "black",
                    fontWeight: "600",
                    fontSize: "18px",
                    border: "none",
                    cursor: isFormValid && !isSubmitting ? "pointer" : "not-allowed",
                  }}
                >
                  {isSubmitting ? "Signing up..." : "Signup"}
                </button>

                {/* Signin Redirect */}
                <button
                  type="button"
                  onClick={() => navigate("/Signin")}
                  style={{
                    width: "75%",
                    padding: "15px",
                    borderRadius: "12px",
                    backgroundColor: "#2b2b2b",
                    color: "white",
                    fontWeight: "600",
                    fontSize: "18px",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Signin
                </button>
              </form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default Signup;
