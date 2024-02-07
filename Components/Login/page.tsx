"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import "../../public/css/Login.css";
import EmailOutlined from "@mui/icons-material/EmailOutlined";
import LockOutlined from "@mui/icons-material/LockOutlined";
import CloseIcon from "@mui/icons-material/Close";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import {
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";

const Login: React.FC<{}> = (props: any) => {
  const { error } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isTCModalOpen, setTCModalOpen] = useState(false);
  const [isPrivacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const [isChecked, setIsChecked] = useState(false);

  const callback = (data: any) => {
    console.log("Inside callback after login");
  };

  const handleEmailChange = (event: any) => {
    const newEmail = event.target.value;
    setEmail(newEmail);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(newEmail)) {
      setEmailError("Please enter Valid Email Address");
    } else {
      setEmailError("");
    }
    setIsEmailValid(emailRegex.test(newEmail));
  };

  const handlePasswordChange = (event: any) => {
    const newPassword = event.target.value;
    setPassword(newPassword);

    // const passwordRegex = /^(?=.*[A-Z]).{6,}$/;

    // if (newPassword && !passwordRegex.test(newPassword)) {
    //   setPasswordError("Password must be at least 6 characters long and contain at least one uppercase letter.")
    // } else {
    //   setPasswordError('');
    // }
    // setIsPasswordValid(passwordRegex.test(newPassword));
  };

  const login = () => {
    setIsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          let data: any = {
            values: {
              email: email,
              password: password,
              latitude: latitude,
              longitude: longitude,
            },
            callback,
          };
          await props.login(data);
          setIsLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    if (error && error.data && error.data.status === 400) {
      setIsEmailValid(false);
      setIsPasswordValid(false);
      setEmailError(error.data.message);
      setPasswordError(error.data.message);
    }
  }, [error]);

  return (
    <div className="login-page">
      <div className="div-2">
        <div className="column">
          <div className="left-banner">
            <Image
              loading="eager"
              src="/assets/images/Illustration.png"
              className="Illustration"
              alt="ezi"
              width={100}
              height={100}
              unoptimized
            />
            <span className="left-banner__desc">
              <div className="div-4">Heading Text</div>
              <div className="div-5">
                Lorem ipsum dolor sit amet consectetur. Urna adipiscing
                adipiscing sed pellentesque libero pretium donec et. Non enim
                aliquet purus nisl natoque diam eu id in.{" "}
              </div>
            </span>
          </div>
        </div>
        <div className="column-2">
          <div className="div-6">
            <span className="span-2">
              <span className="span-3">
                <Image
                  loading="lazy"
                  src="/assets/images/ezi-logo.png"
                  className="img-2"
                  alt="ezi"
                  width={100}
                  height={100}
                />
                <div>
                  Don’t have an account?{" "}
                  <Link className="link" href={"/sign-up"}>
                    Sign Up
                  </Link>
                </div>
              </span>
              <div className="div-8">Welcome to the Ezi</div>
              <div className="div-9">
                Please enter the below provided details to login into platform.
              </div>
              <div className="div-10">Email address</div>
              <TextField
                placeholder="Enter Email"
                variant="outlined"
                type="email"
                fullWidth
                margin="normal"
                className="form-input"
                error={!isEmailValid}
                value={email}
                onChange={handleEmailChange}
                helperText={emailError}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlined />
                    </InputAdornment>
                  ),
                }}
              />
              <div className="div-12">Password</div>
              <TextField
                placeholder="Enter Password"
                variant="outlined"
                type={showPassword ? "text" : "password"}
                fullWidth
                value={password}
                error={!isPasswordValid}
                helperText={passwordError}
                margin="normal"
                className="form-input"
                onChange={handlePasswordChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlined />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword((show) => !show)}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <span className="span-6">
                <Checkbox
                  checked={isChecked}
                  onChange={() => setIsChecked(!isChecked)}
                  color="primary"
                  inputProps={{
                    "aria-label":
                      "I agree to the Terms and Conditions and Privacy Policy",
                  }}
                  style={{
                    padding: 0,
                  }}
                />
                <div className="terms-policy">
                  <span
                    onClick={() => setIsChecked(!isChecked)}
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    I agree to the &nbsp;
                  </span>
                  <Typography
                    className="terms-policy-text"
                    color="rgba(134,25,143,1)"
                    onClick={() => setTCModalOpen(true)}
                  >
                    Terms and Conditions
                  </Typography>{" "}
                  &nbsp; & &nbsp;
                  <Typography
                    className="terms-policy-text"
                    color="rgba(134,25,143,1)"
                    onClick={() => setPrivacyModalOpen(true)}
                  >
                    Privacy Policy.
                  </Typography>
                </div>
                <Link className="link" href={"/forgot-password"}>
                  Forgot Password?
                </Link>
              </span>
              <div className="div-16">
                <Button
                  className="submit"
                  variant="contained"
                  onClick={login}
                  disabled={!(email && password && isChecked)}
                >
                  Login{" "}
                  {isLoading && <CircularProgress size={24} color="inherit" />}
                </Button>
              </div>
              {/* <span className="span-9">
                  <div className="div-18">© All copyright reserved by ezi.</div>
                  <div className="div-19" onClick={() => setPrivacyModalOpen(true)} style={{
                    cursor: "pointer"
                  }}>Privacy Policy</div>
                </span> */}
            </span>
          </div>
        </div>
      </div>
      <Dialog
        open={isTCModalOpen}
        onClose={() => setTCModalOpen(false)}
        style={{
          border: 0,
        }}
        className="tc-popup"
      >
        <div className="popup">
          <span className="popup-heading">
            <div className="popup-title">Terms and Conditions</div>
            <IconButton
              className="popup-close"
              onClick={() => setTCModalOpen(false)}
            >
              <CloseIcon />
            </IconButton>
          </span>
          <div className="popup-content">
            <span className="popup-body">
              <div className="item-title">Topic 1</div>
              <div className="item-desc">
                Lorem ipsum dolor sit amet consectetur. Tincidunt in condimentum
                adipiscing elit augue tristique ut adipiscing. Rhoncus vulputate
                aliquet commodo proin vitae nulla dui at nisi. Ac elit porttitor
                ultricies magna curabitur condimentum lorem tempor. Nibh posuere
                ornare neque nulla nibh. Habitant porta eget ut sit. Suspendisse
                quam viverra ullamcorper pharetra. Netus lectus volutpat sed
                accumsan ullamcorper. Aliquam eu vestibulum eget condimentum.
                Scelerisque sit elementum scelerisque lectus sodales vitae.
              </div>
            </span>
          </div>
        </div>
      </Dialog>
      <Dialog
        open={isPrivacyModalOpen}
        onClose={() => setPrivacyModalOpen(false)}
        style={{
          border: 0,
        }}
        className="tc-popup"
      >
        <div className="popup">
          <span className="popup-heading">
            <div className="popup-title">Privacy Policy</div>
            <IconButton
              className="popup-close"
              onClick={() => setPrivacyModalOpen(false)}
            >
              <CloseIcon />
            </IconButton>
          </span>
          <div className="popup-content">
            <span className="popup-body">
              <div className="item-title">Topic 1</div>
              <div className="item-desc">
                Lorem ipsum dolor sit amet consectetur. Tincidunt in condimentum
                adipiscing elit augue tristique ut adipiscing. Rhoncus vulputate
                aliquet commodo proin vitae nulla dui at nisi. Ac elit porttitor
                ultricies magna curabitur condimentum lorem tempor. Nibh posuere
                ornare neque nulla nibh. Habitant porta eget ut sit. Suspendisse
                quam viverra ullamcorper pharetra. Netus lectus volutpat sed
                accumsan ullamcorper. Aliquam eu vestibulum eget condimentum.
                Scelerisque sit elementum scelerisque lectus sodales vitae.
              </div>
            </span>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default Login;
