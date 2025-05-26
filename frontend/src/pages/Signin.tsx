import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import Input from "../components/Input";
import Button from "../components/Button";
import AuthBackground from "../components/AuthBackground";
import { EmailIcon } from "../assets/icons/EmailIcon";
import { PasswordIcon } from "../assets/icons/PasswordIcon";
import { authState } from "../atoms/authAtom";
import { signInUser } from "../api/auth";
import { validateEmail, validatePassword } from "../utils/validation";

const Signin = () => {
  const navigate = useNavigate();

  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const [signupError, setSignupError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, []);

  const setAuth = useSetRecoilState(authState);

  //Get the Values,validate it and send to the backend
  const handleSignin = async () => {
    setIsLoading(true);
    setSignupError(null);

    const password = passwordRef.current?.value || "";
    const user_email = emailRef.current?.value || "";

    const userEmailError = validateEmail(user_email);
    const passError = validatePassword(password);

    setEmailError(userEmailError);
    setPasswordError(passError);

    if (userEmailError || passError) {
      setIsLoading(false);
      return;
    }

    try {
      const data = await signInUser(user_email, password);

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
      setSignupError(
        err?.response?.data?.message || "Signin failed. Please try again.",
      );
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <AuthBackground>
      <div className="flex h-screen w-full items-center justify-center">
        <div
          className="bg-background-light mx-10 flex max-w-[498px] flex-col items-center gap-[10px] rounded-[10px] p-[2px] md:mx-0 md:p-[10px] dark:bg-black"
          style={{
            boxShadow: "0px 0px 5px 0px var(--color-accent-light-800)",
          }}
        >
          <div className="flex flex-col items-start gap-[30px] self-stretch px-[30px] py-6">
            <div className="text-text-dark-950 dark:text-text-light-100 text-[33px] font-bold">
              Sign In
            </div>
            <div className="text-accent-light-800/90 dark:text-accent-dark-300 text-[19px] font-bold">
              Reconnect with your ideas. Continue building your second brain.
            </div>
          </div>
          <div className="flex flex-col items-start gap-[13px] self-stretch px-[30px] py-[20px]">
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
              text={"Sign In"}
              onClick={handleSignin}
              color="primary"
              disabled={isLoading}
            />
            <div className="text-text-dark-950 dark:text-text-dark-100 flex items-center justify-center gap-1 p-[10px] text-sm font-medium">
              Don&rsquo;t have an account ?
              <span
                className="text-primary-600 hover:cursor-pointer"
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Sign Up
              </span>
            </div>
          </div>
        </div>
      </div>
    </AuthBackground>
  );
};

export default Signin;
