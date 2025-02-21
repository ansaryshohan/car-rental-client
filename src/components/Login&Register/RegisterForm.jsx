import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthContext } from "../../hooks/useAuthContext";
import InputField from "./InputField";

const RegisterForm = () => {
  const { signUpWithEmailAndPassword, updateUser } = useAuthContext();
  const [passwordToggle, setPasswordToggle] = useState(false);
  const [confirmPasswordToggle, setConfirmPasswordToggle] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    userName: "",
    photoFile: "",
    email: "",
    password: "",
  });
  const [errorState, setErrorState] = useState({
    passwordError: "",
    confirmPasswordError: "",
    photoError: "",
    emailError: "",
    registerError: "",
  });
  const navigate = useNavigate();

  const handleUserInputOnChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });

    if (e.target.name === "photo") {
      const photoObj = e.target?.files[0];

      if (photoObj?.size >= 100000) {
        setErrorState({
          ...errorState,
          photoError: "Photo can't be over 1MB",
        });
        return;
      }
      setUserInput({ ...userInput, photoFile: photoObj });
    }
    if (e.target.name === "email") {
      const emailInputValue = e.target.value;
      const emailRegEx =
        /^[a-z0-9][a-z0-9-_.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/;
      if (!emailRegEx.test(emailInputValue)) {
        setErrorState({
          ...errorState,
          emailError: "Please provide a valid email.",
        });
        return;
      }
    }
    if (e.target.name === "password") {
      const passwordValue = e.target.value;
      if (passwordValue.length < 6) {
        setErrorState({
          ...errorState,
          passwordError: "Your password must be at least 6 characters",
        });
        return;
      }
      const isNonWhiteSpace = /^\S*$/;
      if (!isNonWhiteSpace.test(passwordValue)) {
        setErrorState({
          ...errorState,
          passwordError: "Password must not contain Whitespaces.",
        });
        return;
      }
      const isContainsUppercase = /^(?=.*[A-Z]).*$/;
      if (!isContainsUppercase.test(passwordValue)) {
        setErrorState({
          ...errorState,
          passwordError: "Password must have at least one Uppercase Character.",
        });
        return;
      }
      const isContainsLowercase = /^(?=.*[a-z]).*$/;
      if (!isContainsLowercase.test(passwordValue)) {
        setErrorState({
          ...errorState,
          passwordError: "Password must have at least one Lowercase Character.",
        });
        return;
      }
      const isContainsNumber = /^(?=.*[0-9]).*$/;
      if (!isContainsNumber.test(passwordValue)) {
        setErrorState({
          ...errorState,
          passwordError: "Password must contain at least one Digit.",
        });
        return;
      }

      const isContainsSymbol =
        /^(?=.*[~`!@#$%^&*()--+={}[\]|\\:;"'<>,.?/_₹]).*$/;
      if (!isContainsSymbol.test(passwordValue)) {
        setErrorState({
          ...errorState,
          passwordError: "Password must contain at least one Special Symbol.",
        });
        return;
      }
    }
    if (e.target.name === "confirm-password") {
      const confirmPasswordValue = e.target.value;
      if (confirmPasswordValue !== userInput.password) {
        setErrorState({
          ...errorState,
          confirmPasswordError: "Password don't match",
        });
        return;
      }
    }
    setErrorState({
      ...errorState,
      passwordError: "",
      emailError: "",
      confirmPasswordError: "",
      photoError: "",
    });
  };

  // console.log(userInput);

  const handleRegisterOnSubmit = (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    const formData = new FormData();
    if (
      (!errorState.emailError && !errorState.passwordError,
      !errorState.photoError)
    ) {
      // create user with email and password
      signUpWithEmailAndPassword(userInput.email, userInput.password)
        .then(async (result) => {
          if (result.user) {
            // update user displayName and photoUrl
            // console.log(userInput.photoFile, result.user);

            formData.append("image", userInput.photoFile);
            // console.log(formData);
            try {
              // Upload image to ImgBB
              const imgBBResponse = await fetch(
                `https://api.imgbb.com/1/upload?key=${
                  import.meta.env.VITE_imgbbAPI
                }`,
                {
                  method: "POST",
                  body: formData,
                }
              );

              const imgBBData = await imgBBResponse.json();
              if (imgBBData.success) {
                updateUser({
                  displayName: userInput.userName,
                  photoURL: imgBBData?.data?.url,
                })
                  .then(() => {
                    toast.success("user created successfully");
                    setSubmitLoading(false);
                    navigate("/");
                    return;
                  })
                  .catch((err) => {
                    setErrorState({ ...errorState, registerError: err.code });
                    toast.error(err.code);
                    return;
                  });
              }
            } catch (error) {
              toast.error(error.message);
            }
          }
        })
        .catch((err) => {
          setErrorState({ ...errorState, registerError: err.code });
          toast.error(err.code);
          return;
        });
    }

    setErrorState({ ...errorState, registerError: "all input not filled" });
  };

  return (
    <>
      <form className="space-y-6" onSubmit={handleRegisterOnSubmit}>
        <div className="space-y-1 text-sm">
          <InputField label={"User Name"}>
            <input
              type="text"
              name="userName"
              id="userName"
              placeholder="User Name"
              className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-violet-600"
              onChange={handleUserInputOnChange}
              required
            />
          </InputField>
        </div>

        <div className="space-y-1 text-sm">
          <InputField label={"Email"} error={errorState.emailError}>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-violet-600"
              onChange={handleUserInputOnChange}
              required
            />
          </InputField>
        </div>
        <div className="space-y-1 text-sm">
          <InputField label={"Photo"} error={errorState.photoError}>
            <input
              type="file"
              name="photo"
              id="photo"
              accept="image/*"
              className="w-full file-input file-input-accent border-gray-300 bg-gray-50 text-gray-800"
              onChange={handleUserInputOnChange}
              required
            />
          </InputField>
        </div>
        <div className="space-y-1 text-sm">
          <InputField
            label={"Password"}
            error={errorState.passwordError}
            passwordToggle={passwordToggle}
            setPasswordToggle={setPasswordToggle}
          >
            <input
              type={!passwordToggle ? "password" : "text"}
              name="password"
              id="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-violet-600"
              onChange={handleUserInputOnChange}
              required
            />
          </InputField>
        </div>
        <div className="space-y-1 text-sm">
          <InputField
            label={"Confirm Password"}
            error={errorState.confirmPasswordError}
            passwordToggle={confirmPasswordToggle}
            setPasswordToggle={setConfirmPasswordToggle}
          >
            <input
              type={!confirmPasswordToggle ? "password" : "text"}
              name="confirm-password"
              id="confirm-password"
              placeholder="Confirm Password"
              className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-violet-600"
              onChange={handleUserInputOnChange}
              required
            />
          </InputField>
        </div>
        <button
          className="block w-1/2 mx-auto p-3 text-center font-bold rounded-sm text-gray-50 bg-primary-orange"
          type="submit"
        >
          {submitLoading ? (
            <>
              <span className="loading loading-spinner loading-sm"></span>
              <span className="loading loading-spinner loading-md"></span>
              <span className="loading loading-spinner loading-lg"></span>
            </>
          ) : (
            "Sign Up"
          )}
        </button>
      </form>
    </>
  );
};

export default RegisterForm;
