import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import logo from '../assets/images/logo.png'; // Adjust path if needed

const Signin = () => {
  const navigate = useNavigate();

  const handleSignin = async (values, { setSubmitting, setErrors }) => {
  try {
    const response = await fetch("http://localhost:5000/api/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    });

    const data = await response.json();
    if (response.ok) {
      navigate("/home");
    } else {
      setErrors({ email: data.message || "Signin failed" });
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
        <img src={logo} alt="Logo" style={{ width: 300, height: 300, marginBottom: -20 }} />
        <h2>Welcome back!</h2>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={Yup.object({
            email: Yup.string().email('Invalid email').required('Email is required'),
            password: Yup.string().min(6, 'Password too short').required('Password is required'),
          })}
          onSubmit={handleSignin}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => {
            const isFormValid = values.email && values.password;

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
                {/* Email Field */}
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

                {/* Password Field */}
                <div style={{ width: '75%' }}>
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
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

                {/* Signin Button */}
                <button
                  type="submit"
                  disabled={!isFormValid}
                  style={{
                    width: '75%',
                    padding: '15px',
                    borderRadius: '12px',
                    backgroundColor: isFormValid ? 'yellow' : '#555',
                    color: 'black',
                    border: 'none',
                    fontWeight: '600',
                    fontSize: '18px',
                    cursor: isFormValid ? 'pointer' : 'not-allowed',
                  }}
                >
                  Signin
                </button>

                {/* Forgot Password */}
                <button
                  type="button"
                  onClick={() => navigate('/forgetpassword')}
                  style={{
                    width: '75%',
                    padding: '15px',
                    borderRadius: '12px',
                    backgroundColor: '#2b2b2b',
                    color: 'white',
                    border: 'none',
                    fontWeight: '600',
                    fontSize: '16px',
                    cursor: 'pointer',
                    marginTop: '10px',
                  }}
                >
                  Forgot Password?
                </button>
              </form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default Signin;
