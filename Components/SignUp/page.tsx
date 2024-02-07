"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import EmailOutlined from "@mui/icons-material/EmailOutlined";
import LockOutlined from "@mui/icons-material/LockOutlined";
import PersonOutlined from "@mui/icons-material/PersonOutlined";
import CloseIcon from "@mui/icons-material/Close";
import StorefrontIconOutlined from "@mui/icons-material/StorefrontOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import "../../public/css/SignUp.css";
import {
  Alert,
  AlertColor,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  ListItemIcon,
  MenuItem,
  Select,
  Step,
  StepButton,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { allServices, allStates, allStatesAndCities } from "@/src/constants";

const steps = [
  "Login Details",
  "Shop Details",
  "Social Details",
  "Contact Details",
];

const SignUp: React.FC<{}> = (props: any) => {
  const router = useRouter();
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSignInLoading, setIsSignInLoading] = useState(false);
  const [codes, setCodes] = useState(["", "", "", ""]);

  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});
  const [isChecked, setIsChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);

  const [isTCModalOpen, setTCModalOpen] = useState(false);
  const [isPrivacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordError1, setPasswordError1] = useState("");
  const [emailVerified, setEmailVerified] = useState<boolean>();
  const [phoneNumberVerified, setPhoneNumberVerified] = useState<boolean>();
  const [phoneVerifyOpen, setPhoneVerifyOpen] = useState(false);
  const [phoneVerify1Open, setPhoneVerify1Open] = useState(false);
  const [phoneVerify2Open, setPhoneVerify2Open] = useState(false);
  const [emailVerifyOpen, setEmailVerifyOpen] = useState(false);

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");

  const [phoneOtp, setPhoneOtp] = useState<any>();
  const [emailOtp, setEmailOtp] = useState<any>();

  const [shopName, setShopName] = useState("");
  const [shopNameError, setShopNameError] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [gstNumberError, setGstNumberError] = useState("");

  const [states, setStates] = useState<any[]>(allStates);
  const [citites, setCities] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>(allServices);

  const [phoneNumber, setPhoneNumber] = useState("");

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<AlertColor>();

  const [state, setSelectedState] = useState("");
  const [stateError, setSelectedStateError] = useState("");

  const [city, setSelectedCity] = useState("");
  const [cityError, setSelectedCityError] = useState("");

  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState("");

  const [landmark, setLankmark] = useState("");
  const [landmarkError, setLankmarkError] = useState("");

  const [zip, setZip] = useState<number>();
  const [zipError, setZipError] = useState("");

  const [website, setWebsite] = useState("");
  const [websiteError, setWebsiteError] = useState("");

  const [facebook, setFacebook] = useState("");
  const [facebookError, setFacebookError] = useState("");

  const [instagram, setInstagram] = useState("");
  const [instagramError, setInstagramError] = useState("");

  const [primaryNumberVerified, setPrimaryNumberVerified] = useState<boolean>();

  const [primaryNumber, setPrimaryNumber] = useState("");
  const [isValidPrimaryNumber, setIsValidPrimaryNumber] = useState(true);
  const [primaryNumberError, setPrimaryNumberError] = useState("");

  const [secondaryNumberVerified, setSecondaryNumberVerified] =
    useState<boolean>();

  const [secondaryNumber, setSecondaryNumber] = useState("");
  const [isValidSecondaryNumber, setIsValidSecondaryNumber] = useState(true);
  const [secondaryNumberError, setSecondaryNumberError] = useState("");

  const [serviceIds, setServiceIds] = useState<number[]>([]);
  const [serviceError, setServiceError] = useState("");

  const [primaryOtp, setPrimaryOtp] = useState<any>();
  const [secondaryOtp, setSecondaryOtp] = useState<any>();

  useEffect(() => {
    // const getServices = async () => {
    //   const { data } = await axios.get(
    //     "https://dev-api.ezi.org.in/seller/service/all?pageNo=1&pageSize=10&sortAs=ASC&sortBy=serviceName",
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //         Accept: "application/json",
    //       },
    //     }
    //   );

    //   setServices(data.data.content);
    // };

    const getStates = async () => {
      const { data } = await axios.get(
        "https://dev-api.ezi.org.in/state/all?pageNo=0&pageSize=50&sortAs=ASC&sortBy=state",
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      setStates(data.data.content);
    };

    getStates();
    // getServices();
  }, []);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const handleEmailChange = (event: any) => {
    setShowAlert(false);
    const newEmail = event.target.value;
    setEmail(newEmail);
    setEmailVerified(undefined);

    if (!emailRegex.test(newEmail)) {
      setEmailError("Please enter Valid Email Address");
    } else {
      setEmailError("");
    }
  };

  const phoneRegex = /^[1-9][0-9]{9}$/;
  const handlePhoneNumberChange = (event: any) => {
    setShowAlert(false);
    const inputValue = event.target.value;
    setPhoneNumberVerified(undefined);
    // Regular expression for a simple phone number pattern (adjust as needed)
    const isNumeric = /^[0-9]+$/.test(inputValue);
    if (isNumeric) {
      setPhoneNumber(inputValue);
      // Check if the entered phone number matches the pattern

      if (!phoneRegex.test(inputValue)) {
        setPhoneNumberError("Invalid phone number");
      } else {
        setPhoneNumberError("");
      }
    }
  };
  const handlePasswordChange = (event: any) => {
    const newPassword = event.target.value;
    setPassword(newPassword);

    const passwordRegex = /^(?=.*[A-Z]).{6,}$/;

    if (newPassword && !passwordRegex.test(newPassword)) {
      setPasswordError(
        "Password must be at least 6 characters long and contain at least one uppercase letter."
      );
    } else {
      setPasswordError("");
    }
  };
  const handlePasswordChange1 = (event: any) => {
    const newPassword = event.target.value;
    setPassword1(newPassword);

    if (newPassword !== password) {
      setPasswordError1("Password does not match.");
    } else {
      setPasswordError1("");
    }
  };

  const handleNext = async () => {
    if (activeStep === 0) {
      if (!firstName) {
        setFirstNameError("This Field is required.");
      }
      if (!lastName) {
        setLastNameError("This Field is required.");
      }
      if (!email) {
        setEmailError("This Field is required.");
      }
      if (!password) {
        setPasswordError("This Field is required.");
      }
      if (!phoneNumber) {
        setPasswordError("This Field is required.");
      }
      //   if (email && !emailVerified) {
      //     setEmailError("Please verify your email.");
      //   }
      //   if (phoneNumber && !phoneNumberVerified) {
      //     setPhoneNumberError("This Field is required.");
      //   }

      if (
        1
        // firstName &&
        // lastName &&
        // email &&
        // password &&
        // phoneNumber &&
        // emailVerified &&
        // phoneNumberVerified
      ) {
        setShowAlert(false);
        setActiveStep((prev) => prev + 1);
      }
    }
    if (activeStep === 1) {
      if (!shopName) {
        setShopNameError("This Field is required.");
      }
      if (!serviceIds.length) {
        setServiceError("This Field is required.");
      }
      if (!state) {
        setSelectedStateError("This Field is required.");
      }
      if (!city) {
        setSelectedCityError("This Field is required.");
      }
      if (!zip) {
        setZipError("This Field is required.");
      }

      if (!address) {
        setAddressError("This Field is required.");
      }

      if (!landmark) {
        setLankmarkError("This Field is required.");
      }

      if (
        1
        // shopName &&
        // serviceIds.length &&
        // state &&
        // city &&
        // address &&
        // landmark &&
        // zip &&
        // !websiteError
      ) {
        setShowAlert(false);
        setActiveStep((prev) => prev + 1);
      }
    }
    if (activeStep === 2) {
      setShowAlert(false);
      setActiveStep((prev) => prev + 1);
    }
    if (activeStep === 3) {
      //   if (!primaryNumber) {
      //     setPrimaryNumberError("This Field is required.");
      //   } else if (!primaryNumberVerified) {
      //     setPrimaryNumberError("Please verify primary contact number.");
      //   }

      //   if (secondaryNumber && !secondaryNumberVerified) {
      //     setSecondaryNumberError("Please verify secondary contact number.");
      //   }

      if (
        1
        // primaryNumber &&
        // primaryNumberVerified &&
        // (!secondaryNumber || secondaryNumberVerified)
      ) {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              setShowAlert(false);
              const { latitude, longitude } = position.coords;
              try {
                setIsSignInLoading(true);
                const { data } = await axios.post(
                  "https://dev-api.ezi.org.in/seller/signup",
                  {
                    addressLine1: address,
                    addressLine2: landmark,
                    email: email,
                    emailOtpToken: emailOtp?.otpToken,
                    emailOtp: emailOtp?.otp,
                    facebook_link: facebook,
                    firstName: firstName,
                    gstNumber: gstNumber,
                    instagram_link: instagram,
                    lastName: lastName,
                    latitude: latitude,
                    longitude: longitude,
                    password: password,
                    phoneNumber: phoneNumber,
                    phoneOtpToken: phoneOtp?.otpToken,
                    phoneOtp: phoneOtp?.otp,
                    pinCode: zip,
                    primaryContactNumber: primaryNumber,
                    primaryContactNumberToken: primaryOtp?.otpToken,
                    primaryContactNumberOtp: primaryOtp?.otp,
                    secondaryContactNumber: secondaryNumber,
                    secondaryContactNumberToken: secondaryOtp?.otpToken,
                    secondaryContactNumberOtp: secondaryOtp?.otp,
                    shopName: shopName,
                    cityId: city,
                    stateId: state,
                    teamsAndConditionStatus: isChecked,
                    web_site_link: website,
                    serviceId: serviceIds,
                  },
                  {
                    headers: {
                      "Content-Type": "application/json",
                      Accept: "application/json",
                    },
                  }
                );
                setIsCompleted(true);
                setIsSignInLoading(false);
              } catch (error: any) {
                setIsSignInLoading(false);
                setAlertMessage(error.response.data.message);
                setShowAlert(true);
                setAlertType("error");
              }
            },
            (error) => {
              console.error("Error getting location:", error.message);
            }
          );
        } else {
          console.error("Geolocation is not supported by this browser.");
        }
      }
    }
  };

  const handleChange = (index: any, event: any) => {
    const inputValue = event.target.value;

    // Handle Backspace
    if (event.code === "Backspace") {
      setCodes((prevCodes) => {
        const newCodes = [...prevCodes];
        newCodes[index] = "";

        // Move focus to the previous input box
        const prevIndex = index - 1;
        if (prevIndex >= 0) {
          document?.getElementById(`code-input-${prevIndex}`)?.focus();
        }

        return newCodes;
      });
      return;
    }

    // Ensure input is a single numeric character
    if (/^[0-9]$/.test(inputValue)) {
      setCodes((prevCodes) => {
        const newCodes = [...prevCodes];
        newCodes[index] = inputValue;

        // Move focus to the next input box
        const nextIndex = index + 1;
        if (nextIndex < newCodes.length) {
          document?.getElementById(`code-input-${nextIndex}`)?.focus();
        }

        return newCodes;
      });
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleStateChange = async (event: any) => {
    setSelectedState(event.target.value);
    // const { data } = await axios.get(
    //   `https://dev-api.ezi.org.in/city/all?stateId=${event.target.value}&pageNo=0&pageSize=1000&sortAs=ASC&sortBy=city`,
    //   {
    //     headers: {
    //       "Content-Type": "application/json",
    //       Accept: "application/json",
    //     },
    //   }
    // );

    //Filter Out the State
    let { cities } = allStatesAndCities.filter(
      (data) => data.name === event.target.value
    )[0];
    setCities(cities);
  };

  const handleCityChange = (event: any) => {
    setSelectedCity(event.target.value);
  };

  const handleWebsiteChange = (event: any) => {
    const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/;
    setWebsite(event.target.value);
    if (!urlRegex.test(event.target.value)) {
      setWebsiteError("Invalid Link");
    } else {
      setWebsiteError("");
    }
  };

  const handleFacebookChange = (event: any) => {
    const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/;
    setFacebook(event.target.value);
    if (!urlRegex.test(event.target.value)) {
      setFacebookError("Invalid Link");
    } else {
      setFacebookError("");
    }
  };

  const handleInstagramChange = (event: any) => {
    const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/;
    setInstagram(event.target.value);
    if (!urlRegex.test(event.target.value)) {
      setInstagramError("Invalid Link");
    } else {
      setInstagramError("");
    }
  };

  const handlePrimaryNumberChange = (event: any) => {
    setShowAlert(false);
    const inputValue = event.target.value;

    // Regular expression for a simple phone number pattern (adjust as needed)
    const phoneRegex = /^[1-9][0-9]{9}$/;
    const isNumeric = /^[0-9]+$/.test(inputValue);
    if (isNumeric) {
      setPrimaryNumber(inputValue);
      // Check if the entered phone number matches the pattern
      setIsValidPrimaryNumber(phoneRegex.test(inputValue));

      if (!phoneRegex.test(inputValue)) {
        setPrimaryNumberError("Invalid phone number");
      } else {
        setPrimaryNumberError("");
      }
    }
  };
  const handleSecondaryNumberChange = (event: any) => {
    setShowAlert(false);
    const inputValue = event.target.value;
    // Regular expression for a simple phone number pattern (adjust as needed)
    const phoneRegex = /^[1-9][0-9]{9}$/;
    const isNumeric = /^[0-9]+$/.test(inputValue);
    if (isNumeric) {
      setSecondaryNumber(inputValue);
      // Check if the entered phone number matches the pattern
      setIsValidSecondaryNumber(phoneRegex.test(inputValue));

      if (!phoneRegex.test(inputValue)) {
        setSecondaryNumberError("Invalid phone number");
      } else {
        setSecondaryNumberError("");
      }
    }
  };

  const sendOtp = async (value: string, type: "EMAIL" | "PHONE") => {
    try {
      const { data } = await axios.post(
        "https://dev-api.ezi.org.in/auth/send/otp",
        {
          type,
          value,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      if (type === "EMAIL") {
        setEmailOtp(data.data);
        setEmailVerifyOpen(true);
      } else if (type === "PHONE") {
        setPhoneOtp(data.data);
        setPhoneVerifyOpen(true);
      }
    } catch (error: any) {
      if (type === "EMAIL") {
        setEmailError(error.response.data.message);
      } else if (type === "PHONE") {
        setPhoneNumberError(error.response.data.message);
      }
    }
    setCodes(["", "", "", ""]);
  };

  const verifyOtp = async (value: any, type: "EMAIL" | "PHONE") => {
    setIsLoading(true);
    try {
      // const { data } = await axios.post(
      //   "https://dev-api.ezi.org.in/auth/user/otp/verification",
      //   value,
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //       Accept: "application/json",
      //     },
      //   }
      // );
      setAlertMessage(`${type.toLocaleUpperCase()} verified successfully.`);
      setShowAlert(true);
      setAlertType("success");
      setIsLoading(false);
      if (type === "EMAIL") {
        setEmailVerifyOpen(false);
        setEmailVerified(true);
      } else if (type === "PHONE") {
        setPhoneVerifyOpen(false);
        setPhoneNumberVerified(true);
      }
    } catch (error: any) {
      setIsLoading(false);
      setAlertMessage(error.response.data.message);
      setShowAlert(true);
      setAlertType("error");

      if (type === "EMAIL") {
        setEmailVerified(false);
        setEmailVerifyOpen(false);
        setEmailError(error.response.data.message);
      } else if (type === "PHONE") {
        setPhoneVerifyOpen(false);
        setPhoneNumberVerified(false);
        setPhoneNumberError(error.response.data.message);
      }
    }
  };

  const sendContactOtp = async (
    value: string,
    type: "primary" | "secondary"
  ) => {
    try {
      const { data } = await axios.post(
        "https://dev-api.ezi.org.in/auth/send/otp",
        {
          type: "PHONE",
          value,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      if (type === "primary") {
        setPhoneVerify1Open(true);
        setPrimaryOtp(data.data);
      } else if (type === "secondary") {
        setPhoneVerify2Open(true);
        setSecondaryOtp(data.data);
      }
    } catch (error: any) {
      if (type === "primary") {
        setPrimaryNumberError(error.response.data.message);
      } else if (type === "secondary") {
        setSecondaryNumberError(error.response.data.message);
      }
    }
    setCodes(["", "", "", ""]);
  };

  const verifyContactOtp = async (
    value: any,
    type: "primary" | "secondary"
  ) => {
    setIsLoading(true);
    try {
      // const { data } = await axios.post(
      //   "https://dev-api.ezi.org.in/auth/user/otp/verification",
      //   value,
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //       Accept: "application/json",
      //     },
      //   }
      // );
      setAlertMessage(
        `${type.toLocaleLowerCase()} contact number verified successfully.`
      );
      setShowAlert(true);
      setAlertType("success");
      setIsLoading(false);
      if (type === "primary") {
        setPhoneVerify1Open(false);
        setPrimaryNumberVerified(true);
      } else if (type === "secondary") {
        setPhoneVerify2Open(false);
        setSecondaryNumberVerified(true);
      }
    } catch (error: any) {
      setIsLoading(false);
      setAlertMessage(error.response.data.message);
      setShowAlert(true);
      setAlertType("error");

      if (type === "primary") {
        setPhoneVerify1Open(false);
        setPrimaryNumberVerified(false);
        setPrimaryNumberError(error.response.data.message);
      } else if (type === "secondary") {
        setPhoneVerify2Open(false);
        setSecondaryNumberVerified(false);
        setSecondaryNumberError(error.response.data.message);
      }
    }
  };

  const handleChangeServices = (id: number) => {
    if (serviceIds.includes(id)) {
      const newIds = serviceIds.filter((item) => item !== id);
      setServiceIds(newIds);
    } else {
      setServiceIds((prev) => [...prev, id]);
    }
  };

  return (
    <div className="div">
      {isCompleted ? (
        <div className="completed-page">
          <span className="span-3">
            <Image
              width={100}
              height={100}
              loading="lazy"
              src="/assets/images/ezi-logo.png"
              className="img-2"
              alt="ezi"
            />
          </span>
          <div className="completed-page__content">
            <Image
              width={100}
              height={100}
              loading="lazy"
              src="/assets/images/completed.png"
              alt="ezi"
              style={{
                width: "140px",
              }}
            />
            <div className="completed-page__body">
              <Typography className="completed-page__title">
                Successfully Create Account
              </Typography>
              <Typography className="completed-page__desc">
                Your account is create successfully
                <br />
                Log in and elevate your store to stand out!
              </Typography>
            </div>

            <Button
              variant="contained"
              style={{
                borderRadius: "var(--Cr-12, 12px)",
                background: "var(--Primary-Scale-Blue-800-FF, #86198F)",
              }}
              size="large"
              onClick={() => router.push("/login")}
            >
              Login In
            </Button>
          </div>
        </div>
      ) : (
        <div className="div-2">
          <div className="column">
            <div className="div-3">
              <Image
                width={100}
                height={100}
                loading="lazy"
                src="/assets/images/Illustration.png"
                className="img"
                alt="ezi"
              />
              <span className="span">
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
                    width={100}
                    height={100}
                    loading="lazy"
                    src="/assets/images/ezi-logo.png"
                    className="img-2"
                    alt="ezi"
                  />
                  <div>
                    Already have an account?{" "}
                    <Link className="link" href={"/login"}>
                      Login
                    </Link>
                  </div>
                </span>
                <div className="div-8">Create Account</div>
                <div className="div-9">
                  Please enter the below provided details to create your
                  account.
                </div>
                <Stepper
                  activeStep={activeStep}
                  className="sign-up__stepper"
                  alternativeLabel
                >
                  {steps.map((label, index) => (
                    <Step
                      key={label}
                      completed={completed[index]}
                      className="sign-up__step"
                    >
                      <StepButton
                        color="inherit"
                        className="sign-up__step-button"
                      >
                        {label}
                      </StepButton>
                    </Step>
                  ))}
                </Stepper>

                {activeStep === 0 ? (
                  <div className="form-section">
                    {showAlert && (
                      <Alert
                        severity={alertType} // "inf0", "success", "warning", "error"
                        action={
                          <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={handleCloseAlert}
                          >
                            <CloseIcon fontSize="inherit" />
                          </IconButton>
                        }
                      >
                        {alertMessage}
                      </Alert>
                    )}
                    <div className="form-fields__name">
                      <div className="form-fields__name-section">
                        <div className="field-label">First Name</div>
                        <TextField
                          placeholder="Enter First Name"
                          variant="outlined"
                          type="text"
                          fullWidth
                          margin="normal"
                          className="form-input"
                          value={firstName}
                          error={!!firstNameError}
                          helperText={firstNameError}
                          onChange={({ target }) => setFirstName(target.value)}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <PersonOutlined />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </div>
                      <div className="form-fields__name-section">
                        <div className="field-label">Last Name</div>
                        <TextField
                          placeholder="Enter Last Name"
                          variant="outlined"
                          type="text"
                          fullWidth
                          margin="normal"
                          className="form-input"
                          value={lastName}
                          error={!!lastNameError}
                          helperText={lastNameError}
                          onChange={({ target }) => setLastName(target.value)}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <PersonOutlined />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </div>
                    </div>
                    <div className="field-label margin-top-16">
                      Phone Number
                    </div>
                    <div className="form-fields__other">
                      <div className="form-fields__name-section">
                        <TextField
                          className="form-input"
                          placeholder="10 digit number"
                          variant="outlined"
                          fullWidth
                          value={phoneNumber}
                          onChange={handlePhoneNumberChange}
                          error={!!phoneNumberError}
                          helperText={phoneNumberError}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <LocalPhoneOutlinedIcon />
                                +91
                              </InputAdornment>
                            ),
                            inputMode: "numeric",
                          }}
                        />
                      </div>
                      {/* <Button
                        color={
                          phoneNumberVerified
                            ? "success"
                            : phoneNumberVerified === false
                            ? "error"
                            : "primary"
                        }
                        variant="contained"
                        size="small"
                        className="verify-button"
                        onClick={() =>
                          !phoneNumberVerified && sendOtp(phoneNumber, "PHONE")
                        }
                      >
                        {phoneNumberVerified
                          ? "Verified"
                          : phoneNumberVerified === false
                          ? "Try Again"
                          : "Verify"}
                      </Button> */}
                    </div>
                    <div className="field-label margin-top-16">
                      Email address
                    </div>
                    <div className="form-fields__other">
                      <div className="form-fields__name-section">
                        <TextField
                          placeholder="Enter Email"
                          variant="outlined"
                          type="email"
                          fullWidth
                          margin="normal"
                          className="form-input"
                          error={!!emailError}
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
                      </div>
                      {/* <Button
                            variant="contained"
                            color={
                            emailVerified
                                ? "success"
                                : emailVerified === false
                                ? "error"
                                : "primary"
                            }
                            size="small"
                            className="verify-button"
                            onClick={() =>
                            !emailVerified && sendOtp(email, "EMAIL")
                            }
                        >
                            {emailVerified
                            ? "Verified"
                            : emailVerified === false
                            ? "Try Again"
                            : "Verify"}
                        </Button> */}
                    </div>
                    <div
                      className="form-fields__other margin-top-16"
                      style={{
                        gap: "16px",
                      }}
                    >
                      <div className="form-fields__name-section">
                        <div className="field-label">Password</div>
                        <TextField
                          placeholder="Enter Password"
                          variant="outlined"
                          type={showPassword ? "text" : "password"}
                          fullWidth
                          value={password}
                          error={!!passwordError}
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
                                  onClick={() =>
                                    setShowPassword((show) => !show)
                                  }
                                  onMouseDown={handleMouseDownPassword}
                                  edge="end"
                                >
                                  {showPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </div>
                      <div className="form-fields__name-section">
                        <div className="field-label">Confirm Password</div>
                        <TextField
                          placeholder="Confirm Password"
                          variant="outlined"
                          type={showPassword1 ? "text" : "password"}
                          fullWidth
                          value={password1}
                          error={!!passwordError1}
                          helperText={passwordError1}
                          margin="normal"
                          className="form-input"
                          onChange={handlePasswordChange1}
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
                                  onClick={() =>
                                    setShowPassword1((show) => !show)
                                  }
                                  onMouseDown={handleMouseDownPassword}
                                  edge="end"
                                >
                                  {showPassword1 ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </div>
                    </div>
                    <span className="span-6 margin-top-16">
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
                        I agree to the &nbsp;
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
                    </span>
                  </div>
                ) : activeStep === 1 ? (
                  <div className="form-section">
                    <div className="form-fields__name">
                      <div className="form-fields__name-section">
                        <div className="field-label">Shop Name</div>
                        <TextField
                          placeholder="Enter Shop Name"
                          variant="outlined"
                          type="text"
                          fullWidth
                          margin="normal"
                          className="form-input"
                          value={shopName}
                          error={!!shopNameError}
                          helperText={shopNameError}
                          onChange={({ target }) => setShopName(target.value)}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <StorefrontIconOutlined />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </div>
                      <div className="form-fields__name-section">
                        <div className="field-label">GST Number (Optional)</div>
                        <TextField
                          placeholder="Enter GST Number"
                          variant="outlined"
                          type="text"
                          fullWidth
                          margin="normal"
                          className="form-input"
                          value={gstNumber}
                          error={!!gstNumberError}
                          helperText={gstNumberError}
                          onChange={({ target }) =>
                            /^[0-9]+$/.test(target.value) &&
                            setGstNumber(target.value)
                          }
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                GST
                              </InputAdornment>
                            ),
                          }}
                        />
                      </div>
                    </div>
                    <div className="form-fields__name">
                      <div className="form-fields__name-section">
                        <div className="field-label margin-top-16">
                          Services
                        </div>
                        {serviceError && (
                          <InputLabel
                            color="error"
                            style={{
                              color: "#d32f2f",
                              fontSize: "12px",
                              marginLeft: "14px",
                              marginTop: "3px",
                            }}
                          >
                            {serviceError}
                          </InputLabel>
                        )}
                        <Grid
                          container
                          spacing={1}
                          style={{
                            marginTop: "2px",
                          }}
                        >
                          {services?.map((item, index) => (
                            <Grid item xs={12} md={6} key={index}>
                              <span className="grid-checkbox__text">
                                <Checkbox
                                  checked={serviceIds.includes(item.id)}
                                  onChange={() => handleChangeServices(item.id)}
                                  color="primary"
                                  inputProps={{ "aria-label": item }}
                                  style={{
                                    padding: 0,
                                  }}
                                />
                                <div className="terms-policy">
                                  {item.serviceName}
                                </div>
                              </span>
                            </Grid>
                          ))}
                        </Grid>
                      </div>
                    </div>
                    <div className="form-fields__name margin-top-16">
                      <div className="form-fields__name-section">
                        <div className="field-label">State</div>
                        <Select
                          id="state-select"
                          value={state}
                          fullWidth
                          className="field-select"
                          onChange={handleStateChange}
                          startAdornment={
                            <ListItemIcon>
                              <LocationOnOutlinedIcon />
                            </ListItemIcon>
                          }
                        >
                          {states?.map((item, index) => (
                            <MenuItem value={item.name} key={index}>
                              {item.name}
                            </MenuItem>
                          ))}
                        </Select>
                        {stateError && (
                          <InputLabel
                            color="error"
                            style={{
                              color: "#d32f2f",
                              fontSize: "12px",
                              marginLeft: "14px",
                              marginTop: "3px",
                            }}
                          >
                            {stateError}
                          </InputLabel>
                        )}
                      </div>
                      <div className="form-fields__name-section">
                        <div className="field-label">City</div>
                        <Select
                          id="city-select"
                          value={city}
                          fullWidth
                          className="field-select"
                          onChange={handleCityChange}
                          startAdornment={
                            <ListItemIcon>
                              <LocationOnOutlinedIcon />
                            </ListItemIcon>
                          }
                        >
                          {citites?.map((item, index) => (
                            <MenuItem value={item} key={index}>
                              {item}
                            </MenuItem>
                          ))}
                        </Select>
                        {cityError && (
                          <InputLabel
                            color="error"
                            style={{
                              color: "#d32f2f",
                              fontSize: "12px",
                              marginLeft: "14px",
                              marginTop: "3px",
                            }}
                          >
                            {cityError}
                          </InputLabel>
                        )}
                      </div>
                    </div>
                    <div className="form-fields__name margin-top-16">
                      <div className="form-fields__name-section">
                        <div className="field-label">
                          Shop Number/Building Name
                        </div>
                        <TextField
                          placeholder="Enter Address"
                          variant="outlined"
                          type="text"
                          fullWidth
                          multiline
                          rows={3}
                          margin="normal"
                          className="form-input"
                          value={address}
                          error={!!addressError}
                          helperText={addressError}
                          onChange={({ target }) => setAddress(target.value)}
                        />
                      </div>
                      <div className="form-fields__name-section">
                        <div className="field-label">
                          Near By Landmark/Street/Area
                        </div>
                        <TextField
                          placeholder="Enter Near By Landmark/Street/Area"
                          variant="outlined"
                          type="text"
                          fullWidth
                          multiline
                          rows={3}
                          margin="normal"
                          className="form-input"
                          value={landmark}
                          error={!!landmarkError}
                          helperText={landmarkError}
                          onChange={({ target }) => setLankmark(target.value)}
                        />
                      </div>
                    </div>
                    <div className="form-fields__name margin-top-16">
                      <div className="form-fields__name-section">
                        <div className="field-label">Pin Code</div>
                        <TextField
                          placeholder="Enter Pin Code"
                          variant="outlined"
                          type="text"
                          fullWidth
                          margin="normal"
                          className="form-input"
                          value={zip}
                          error={!!zipError}
                          helperText={zipError}
                          onChange={({ target }) =>
                            /^[0-9]+$/.test(target.value) &&
                            target.value.length <= 6 &&
                            setZip(Number(target.value))
                          }
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                Pin
                              </InputAdornment>
                            ),
                          }}
                        />
                      </div>
                      <div className="form-fields__name-section">
                        <div className="field-label">Website (Optional)</div>
                        <TextField
                          placeholder="Enter Website (Optional)"
                          variant="outlined"
                          type="text"
                          fullWidth
                          margin="normal"
                          className="form-input"
                          value={website}
                          error={!!websiteError}
                          helperText={websiteError}
                          onChange={handleWebsiteChange}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <LanguageOutlinedIcon />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ) : activeStep === 2 ? (
                  <div className="form-section">
                    <div className="form-fields__name-section">
                      <div className="field-label">Facebook URL (Optional)</div>
                      <TextField
                        placeholder="https://www.facebook.com/ (Optional)"
                        variant="outlined"
                        type="text"
                        fullWidth
                        margin="normal"
                        className="form-input"
                        value={facebook}
                        error={!!facebookError}
                        helperText={facebookError}
                        onChange={handleFacebookChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <FacebookOutlinedIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </div>
                    <div className="form-fields__name-section margin-top-16">
                      <div className="field-label">
                        Instagram URL (Optional)
                      </div>
                      <TextField
                        placeholder="https://www.instagram.com/ (Optional)"
                        variant="outlined"
                        type="text"
                        fullWidth
                        margin="normal"
                        className="form-input"
                        value={instagram}
                        error={!!instagramError}
                        helperText={instagramError}
                        onChange={handleInstagramChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <InstagramIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="form-section">
                    {showAlert && (
                      <Alert
                        severity={alertType} // "inf0", "success", "warning", "error"
                        action={
                          <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={handleCloseAlert}
                          >
                            <CloseIcon fontSize="inherit" />
                          </IconButton>
                        }
                      >
                        {alertMessage}
                      </Alert>
                    )}
                    <div className="field-label">Primary Contact Number</div>
                    <div className="form-fields__other">
                      <div className="form-fields__name-section">
                        <TextField
                          className="form-input"
                          placeholder="10 digit number"
                          variant="outlined"
                          fullWidth
                          value={primaryNumber}
                          onChange={handlePrimaryNumberChange}
                          error={!!primaryNumberError}
                          helperText={primaryNumberError}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <LocalPhoneOutlinedIcon />
                                +91
                              </InputAdornment>
                            ),
                            inputMode: "numeric",
                          }}
                        />
                      </div>
                      <Button
                        color={
                          primaryNumberVerified
                            ? "success"
                            : primaryNumberVerified === false
                            ? "error"
                            : "primary"
                        }
                        variant="contained"
                        size="small"
                        className="verify-button"
                        onClick={() =>
                          !primaryNumberVerified &&
                          sendContactOtp(primaryNumber, "primary")
                        }
                      >
                        {primaryNumberVerified
                          ? "Verified"
                          : primaryNumberVerified === false
                          ? "Try Again"
                          : "Verify"}
                      </Button>
                    </div>
                    <div className="field-label margin-top-16">
                      Secondary Contact Number (Optional)
                    </div>
                    <div className="form-fields__other">
                      <div className="form-fields__name-section">
                        <TextField
                          className="form-input"
                          placeholder="10 digit number"
                          variant="outlined"
                          fullWidth
                          value={secondaryNumber}
                          onChange={handleSecondaryNumberChange}
                          error={!!secondaryNumberError}
                          helperText={secondaryNumberError}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <LocalPhoneOutlinedIcon />
                                +91
                              </InputAdornment>
                            ),
                            inputMode: "numeric",
                          }}
                        />
                      </div>
                      <Button
                        color={
                          secondaryNumberVerified
                            ? "success"
                            : secondaryNumberVerified === false
                            ? "error"
                            : "primary"
                        }
                        variant="contained"
                        size="small"
                        className="verify-button"
                        onClick={() =>
                          !secondaryNumberVerified &&
                          sendContactOtp(secondaryNumber, "secondary")
                        }
                      >
                        {secondaryNumberVerified
                          ? "Verified"
                          : secondaryNumberVerified === false
                          ? "Try Again"
                          : "Verify"}
                      </Button>
                    </div>
                  </div>
                )}
                <span
                  className="span-9"
                  style={{
                    marginTop: "60px",
                  }}
                >
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => {
                      if (activeStep === 0) {
                        router.push("/login");
                      } else {
                        setActiveStep((prev) => prev - 1);
                      }
                    }}
                  >
                    Previous
                  </Button>
                  <Button
                    disabled={activeStep === 0 && !isChecked}
                    className="submit"
                    variant="contained"
                    fullWidth
                    onClick={handleNext}
                  >
                    {activeStep === 3 ? "Finish" : "Next"}
                    {isSignInLoading && <CircularProgress />}
                  </Button>
                </span>
                <span
                  className="span-9"
                  style={{
                    marginTop: "60px",
                    paddingBottom: "32px",
                  }}
                >
                  <div className="div-18">© All copyright reserved by ezi.</div>
                  <div className="div-19">Privacy Policy</div>
                </span>
              </span>
            </div>
          </div>
        </div>
      )}
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
        {/* <DialogTitle>Terms and Conditions</DialogTitle>
        <DialogContent>
          <Typography>Your Terms and Conditions content goes here.</Typography>
        </DialogContent> */}
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

      <Dialog
        open={phoneVerifyOpen}
        onClose={() => setPhoneVerifyOpen(false)}
        style={{
          border: 0,
        }}
        className="tc-popup"
      >
        <div className="popup">
          <span className="popup-heading">
            <div className="popup-title">Verify Phone Number</div>
            <IconButton
              className="popup-close"
              onClick={() => setPhoneVerifyOpen(false)}
            >
              <CloseIcon />
            </IconButton>
          </span>
          <div
            className="popup-content"
            style={{
              width: "auto",
            }}
          >
            <span
              className="popup-body"
              style={{
                justifyContent: "center",
                gap: "20px",
              }}
            >
              <div className="verify-title">
                We send you 4-digit code to your phone number, Please check your
                text message.
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  justifyContent: "center",
                }}
              >
                {codes.map((code, index) => (
                  <TextField
                    key={index}
                    className="code-input"
                    id={`code-input-${index}`}
                    variant="outlined"
                    value={code}
                    onChange={(e) => handleChange(index, e)}
                    onKeyDown={(e) => handleChange(index, e)} // Handle Backspace
                    inputProps={{
                      maxLength: 1,
                      style: { textAlign: "center" },
                    }}
                  />
                ))}
              </div>
              <div className="verify-title">
                If you didn’t receive a code!{" "}
                <span
                  className="link verify-title"
                  style={{
                    fontWeight: 700,
                    color: "#86198F",
                  }}
                >
                  Resend
                </span>
              </div>
              <Button
                onClick={() => {
                  verifyOtp(
                    {
                      ...phoneOtp,
                      otp: codes.join(""),
                    },
                    "PHONE"
                  );
                }}
                className="verify-button"
                variant="contained"
                disabled={codes.join("").length !== 4}
              >
                Verify
              </Button>
            </span>
          </div>
        </div>
      </Dialog>
      <Dialog
        open={emailVerifyOpen}
        onClose={() => setEmailVerifyOpen(false)}
        style={{
          border: 0,
        }}
        className="tc-popup"
      >
        <div className="popup">
          <span className="popup-heading">
            <div className="popup-title">Verify Email Address</div>
            <IconButton
              className="popup-close"
              onClick={() => setEmailVerifyOpen(false)}
            >
              <CloseIcon />
            </IconButton>
          </span>
          <div
            className="popup-content"
            style={{
              width: "auto",
            }}
          >
            <span
              className="popup-body"
              style={{
                justifyContent: "center",
                gap: "20px",
              }}
            >
              <div className="verify-title">
                We send you 4-digit code to your email address, Please check
                your mail.
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  justifyContent: "center",
                }}
              >
                {codes.map((code, index) => (
                  <TextField
                    key={index}
                    className="code-input"
                    id={`code-input-${index}`}
                    variant="outlined"
                    value={code}
                    onChange={(e) => handleChange(index, e)}
                    onKeyDown={(e) => handleChange(index, e)} // Handle Backspace
                    inputProps={{
                      maxLength: 1,
                      style: { textAlign: "center" },
                    }}
                  />
                ))}
              </div>
              <div className="verify-title">
                If you didn’t receive a code!{" "}
                <span
                  className="link verify-title"
                  style={{
                    fontWeight: 700,
                    color: "#86198F",
                  }}
                >
                  Resend
                </span>
              </div>
              <Button
                onClick={() => {
                  verifyOtp(
                    {
                      ...emailOtp,
                      otp: codes.join(""),
                    },
                    "EMAIL"
                  );
                }}
                className="verify-button"
                variant="contained"
                disabled={codes.join("").length !== 4}
              >
                Verify
                {isLoading && <CircularProgress size={24} color="inherit" />}
              </Button>
            </span>
          </div>
        </div>
      </Dialog>

      <Dialog
        open={phoneVerify1Open}
        onClose={() => setPhoneVerify1Open(false)}
        style={{
          border: 0,
        }}
        className="tc-popup"
      >
        <div className="popup">
          <span className="popup-heading">
            <div className="popup-title">Verify Primary Contact Number</div>
            <IconButton
              className="popup-close"
              onClick={() => setPhoneVerify1Open(false)}
            >
              <CloseIcon />
            </IconButton>
          </span>
          <div
            className="popup-content"
            style={{
              width: "auto",
            }}
          >
            <span
              className="popup-body"
              style={{
                justifyContent: "center",
                gap: "20px",
              }}
            >
              <div className="verify-title">
                We send you 4-digit code to your phone number, Please check your
                text message.
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  justifyContent: "center",
                }}
              >
                {codes.map((code, index) => (
                  <TextField
                    key={index}
                    className="code-input"
                    id={`code-input-${index}`}
                    variant="outlined"
                    value={code}
                    onChange={(e) => handleChange(index, e)}
                    onKeyDown={(e) => handleChange(index, e)} // Handle Backspace
                    inputProps={{
                      maxLength: 1,
                      style: { textAlign: "center" },
                    }}
                  />
                ))}
              </div>
              <div className="verify-title">
                If you didn’t receive a code!{" "}
                <span
                  className="link verify-title"
                  style={{
                    fontWeight: 700,
                    color: "#86198F",
                  }}
                >
                  Resend
                </span>
              </div>
              <Button
                onClick={() => {
                  verifyContactOtp(
                    {
                      ...primaryOtp,
                      otp: codes.join(""),
                    },
                    "primary"
                  );
                }}
                className="verify-button"
                variant="contained"
                disabled={codes.join("").length !== 4}
              >
                Verify
              </Button>
            </span>
          </div>
        </div>
      </Dialog>

      <Dialog
        open={phoneVerify2Open}
        onClose={() => setPhoneVerify2Open(false)}
        style={{
          border: 0,
        }}
        className="tc-popup"
      >
        <div className="popup">
          <span className="popup-heading">
            <div className="popup-title">Verify Secondary Contact Number</div>
            <IconButton
              className="popup-close"
              onClick={() => setPhoneVerify2Open(false)}
            >
              <CloseIcon />
            </IconButton>
          </span>
          <div
            className="popup-content"
            style={{
              width: "auto",
            }}
          >
            <span
              className="popup-body"
              style={{
                justifyContent: "center",
                gap: "20px",
              }}
            >
              <div className="verify-title">
                We send you 4-digit code to your phone number, Please check your
                text message.
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  justifyContent: "center",
                }}
              >
                {codes.map((code, index) => (
                  <TextField
                    key={index}
                    className="code-input"
                    id={`code-input-${index}`}
                    variant="outlined"
                    value={code}
                    onChange={(e) => handleChange(index, e)}
                    onKeyDown={(e) => handleChange(index, e)} // Handle Backspace
                    inputProps={{
                      maxLength: 1,
                      style: { textAlign: "center" },
                    }}
                  />
                ))}
              </div>
              <div className="verify-title">
                If you didn’t receive a code!{" "}
                <span
                  className="link verify-title"
                  style={{
                    fontWeight: 700,
                    color: "#86198F",
                  }}
                >
                  Resend
                </span>
              </div>
              <Button
                onClick={() => {
                  verifyContactOtp(
                    {
                      ...secondaryOtp,
                      otp: codes.join(""),
                    },
                    "secondary"
                  );
                }}
                className="verify-button"
                variant="contained"
                disabled={codes.join("").length !== 4}
              >
                Verify
              </Button>
            </span>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default SignUp;
