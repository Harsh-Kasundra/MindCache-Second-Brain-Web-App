import { useEffect, useRef, useState } from "react";
import { UserIcon } from "../assets/icons/UserIcon";
import Input from "../components/Input";
import {
    validateEmail,
    validateName,
    validatePassword,
} from "../utils/validation";
import Button from "../components/Button";
import { EmailIcon } from "../assets/icons/EmailIcon";
import { PasswordIcon } from "../assets/icons/PasswordIcon";
import AuthBackground from "../components/AuthBackground";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { authState } from "../atoms/authAtom";
import { signUpUser } from "../api/auth";

const Signup = () => {
    const navigate = useNavigate();
    const [userNameError, setUserNameError] = useState<string | null>(null);
    const [emailError, setEmailError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);

    const usernameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const setAuth = useSetRecoilState(authState);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/dashboard");
        }
    }, []);

    const handleSignup = async () => {
        const username = usernameRef.current?.value || "";
        const password = passwordRef.current?.value || "";
        const user_email = emailRef.current?.value || "";
        const userEmailError = validateEmail(user_email);
        const passError = validatePassword(password);
        const nameError = validateName(username);
        setEmailError(userEmailError);
        setPasswordError(passError);
        setUserNameError(nameError);
        if (userEmailError || passError || nameError) return;

        try {
            const data = await signUpUser(user_email, username, username);
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
        } catch (err) {
            console.error("Signup error:", err);
        }
    };

    return (
        <AuthBackground>
            <div className="w-full sm:my-20 flex justify-center items-center">
                <div
                    className=" bg-background-light dark:bg-black flex max-w-[498px] p-[2px] md:p-[10px] mx-10 md:mx-0 flex-col items-center gap-[10px] rounded-[10px]"
                    style={{
                        boxShadow:
                            "0px 0px 10px 0px var(--color-accent-light-800)",
                    }}
                >
                    <div className="flex py-6 px-[30px] flex-col items-start gap-[30px] self-stretch">
                        <div className="text-text-dark-950 dark:text-text-light-100 text-[33px] font-bold">
                            Sign Up
                        </div>
                        <div className="text-accent-light-800/90 text-[19px] font-bold">
                            Capture ideas. Organize thoughts. Build your second
                            brain.
                        </div>
                    </div>
                    <div className="flex flex-col py-[20px] px-[30px] items-start gap-[13px] self-stretch">
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
                    <div className=" flex flex-col items-center gap-[20px] self-stretch py-[20px] px-[30px]">
                        <Button
                            text={"Sign Up"}
                            onClick={handleSignup}
                            color="primary"
                        />
                        <div className="flex p-[10px] justify-center items-center font-medium text-sm text-text-light-950 gap-1">
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
