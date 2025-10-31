import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import logo from '../assets/images/logo.png'; // adjust path if needed

const Forget = () => {
  const navigate = useNavigate();
  const [codeCooldown, setCodeCooldown] = useState(0);
    // new handler for code request
    const handleGetCode = async (email) => {
      if (!email) return alert("Enter email first");
      try {
        await fetch("https://reactnodebackend-tsrl.vercel.app/api/send-code", {
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

  const handleUpdatePassword = async (values, { setSubmitting, setErrors }) => {
  try {
    const response = await fetch("https://reactnodebackend-tsrl.vercel.app/api/update-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: values.email,
        code: values.code,
        password: values.password
      })
    });
    const data = await response.json();
    if (response.ok) {
      alert("Password updated successfully!");
      navigate("/signin");
    } else {
      setErrors({ email: data.message || "Update failed" });
    }
  } catch (err) {
    setErrors({ email: "Server error" });
  } finally {
    setSubmitting(false);
  }
};


  return (
    <div style={{ backgroundColor: 'black', minHeight: '100vh', color: 'white' }}>
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <img src={logo} alt="Logo" style={{ width: 300, height: 200, marginBottom: -20 }} />
        <h2>Reset Your Password</h2>

        <Formik
          initialValues={{
            email: '',
            code: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={Yup.object({
            email: Yup.string().email('Invalid email').required('Email is required'),
            code: Yup.string().required('Verification code is required'),
            password: Yup.string().min(6, 'Password too short').required('Password is required'),
            confirmPassword: Yup.string()
              .oneOf([Yup.ref('password'), null], 'Passwords must match')
              .required('Confirm password is required'),
          })}
          onSubmit={handleUpdatePassword}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => {
            const isFormValid =
              values.email &&
              values.code &&
              values.password &&
              values.confirmPassword &&
              values.password === values.confirmPassword;

            return (
              <form
                onSubmit={handleSubmit}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '20px',
                  marginTop: '20px',
                }}
              >
                {/* Email */}
                <div style={{ width: '75%' }}>
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '10px',
                      border: '1px solid #888',
                      backgroundColor: '#1e1e1e',
                      color: 'white',
                    }}
                  />
                  {touched.email && errors.email && (
                    <p style={{ color: 'red', fontSize: '14px' }}>{errors.email}</p>
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

                {/* New Password */}
                <div style={{ width: '75%' }}>
                  <label>New Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter new password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '10px',
                      border: '1px solid #888',
                      backgroundColor: '#1e1e1e',
                      color: 'white',
                    }}
                  />
                  {touched.password && errors.password && (
                    <p style={{ color: 'red', fontSize: '14px' }}>{errors.password}</p>
                  )}
                </div>

                {/* Confirm Password */}
                <div style={{ width: '75%' }}>
                  <label>Retype Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.confirmPassword}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '10px',
                      border: '1px solid #888',
                      backgroundColor: '#1e1e1e',
                      color: 'white',
                    }}
                  />
                  {touched.confirmPassword && errors.confirmPassword && (
                    <p style={{ color: 'red', fontSize: '14px' }}>{errors.confirmPassword}</p>
                  )}
                </div>

                {/* Update Password Button */}
                <button
                  type="submit"
                  disabled={!isFormValid}
                  style={{
                    width: '75%',
                    padding: '16px',
                    borderRadius: '12px',
                    backgroundColor: isFormValid ? 'yellow' : '#555',
                    color: 'black',
                    border: 'none',
                    fontWeight: '600',
                    fontSize: '18px',
                    cursor: isFormValid ? 'pointer' : 'not-allowed',
                    marginTop: '10px',
                  }}
                >
                  Update Password
                </button>
              </form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default Forget;
