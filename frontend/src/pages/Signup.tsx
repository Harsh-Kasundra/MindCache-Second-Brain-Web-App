import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import Input from "../components/Input";
import Button from "../components/Button";
import AuthBackground from "../components/AuthBackground";
import { EmailIcon } from "../assets/icons/EmailIcon";
import { UserIcon } from "../assets/icons/UserIcon";
import { PasswordIcon } from "../assets/icons/PasswordIcon";
import { authState } from "../atoms/authAtom";
import { signUpUser } from "../api/auth";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "../utils/validation";

const Signup = () => {
  const navigate = useNavigate();

  const [userNameError, setUserNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const [signupError, setSignupError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, []);

  const setAuth = useSetRecoilState(authState);

  //Get the Values,validate it and send to the backend
  const handleSignup = async () => {
    setSignupError(null);
    setIsLoading(true);

    const username = usernameRef.current?.value || "";
    const password = passwordRef.current?.value || "";
    const user_email = emailRef.current?.value || "";

    const userEmailError = validateEmail(user_email);
    const passError = validatePassword(password);
    const nameError = validateName(username);

    setEmailError(userEmailError);
    setPasswordError(passError);
    setUserNameError(nameError);

    if (userEmailError || passError || nameError) {
      setIsLoading(false);
      return;
    }

    try {
      const data = await signUpUser(username, user_email, password);

      localStorage.setItem("token", data.token);

      setAuth({
        token: data.token,
        user: {
          id: data.user.user_id,
          name: data.user.username,
          email: data.user.user_email,
        },
        isAuthenticated: true,
      });

      navigate("/dashboard");
    } catch (err: any) {
      console.error("Signup error:", err);
      setSignupError(
        err?.response?.data?.message || "Signup failed. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthBackground>
      <div className="flex w-full items-center justify-center sm:my-20">
        <div
          className="bg-background-light mx-10 flex max-w-[498px] flex-col items-center gap-[10px] rounded-[10px] p-[2px] md:mx-0 md:p-[10px] dark:bg-black"
          style={{
            boxShadow: "0px 0px 5px 0px var(--color-accent-light-800)",
          }}
        >
          <div className="flex flex-col items-start gap-[30px] self-stretch px-[30px] py-6">
            <div className="text-text-dark-950 dark:text-text-light-100 text-[33px] font-bold">
              Sign Up
            </div>
            <div className="text-accent-light-800/90 dark:text-accent-dark-300 text-[19px] font-bold">
              Capture ideas. Organize thoughts. Build your second brain.
            </div>
          </div>
          <div className="flex flex-col items-start gap-[13px] self-stretch px-[30px] py-[20px]">
            <Input
              label="Username"
              required
              placeholder="Enter Your Username"
              supportingText="e.g. mindCache"
              type="text"
              key={"username"}
              icon={<UserIcon height={25} width={25} />}
              validate={() => userNameError}
              reference={usernameRef}
            />
            <Input
              label="Email"
              required
              placeholder="Enter Your Email"
              supportingText="e.g. mindCache@gmail.com"
              type="email"
              key={"email"}
              icon={<EmailIcon height={25} width={25} />}
              validate={() => emailError}
              reference={emailRef}
            />
            <Input
              label="Password"
              required
              placeholder="Enter Your Password"
              supportingText="e.g. mindCache"
              type="password"
              key={"password"}
              icon={<PasswordIcon height={25} width={25} />}
              validate={() => passwordError}
              reference={passwordRef}
            />
          </div>
          <div className="flex flex-col items-center gap-[20px] self-stretch px-[30px] py-[20px]">
            {signupError && (
              <div className="text-center text-sm font-medium text-red-500">
                {signupError}
              </div>
            )}
            <Button
              text={"Sign Up"}
              onClick={handleSignup}
              color="primary"
              disabled={isLoading}
            />
            <div className="text-text-light-950 dark:text-text-dark-100 flex items-center justify-center gap-1 p-[10px] text-sm font-medium">
              Already have an account ?
              <span
                className="text-primary-600 hover:cursor-pointer"
                onClick={() => {
                  navigate("/signin");
                }}
              >
                Sign In
              </span>
            </div>
          </div>
        </div>
      </div>
    </AuthBackground>
  );
};

export default Signup;
