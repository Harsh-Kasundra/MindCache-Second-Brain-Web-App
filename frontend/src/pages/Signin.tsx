import { useEffect, useRef, useState } from "react";
import Input from "../components/Input";
import { validateEmail, validatePassword } from "../utils/validation";
import Button from "../components/Button";
import { EmailIcon } from "../assets/icons/EmailIcon";
import { PasswordIcon } from "../assets/icons/PasswordIcon";
import AuthBackground from "../components/AuthBackground";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { authState } from "../atoms/authAtom";
import { signInUser } from "../api/auth";

const Signin = () => {
    const navigate = useNavigate();
    const [emailError, setEmailError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const setAuth = useSetRecoilState(authState);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/dashboard");
        }
    }, []);

    const handleSignin = async () => {
        const password = passwordRef.current?.value || "";
        const user_email = emailRef.current?.value || "";
        const userEmailError = validateEmail(user_email);
        const passError = validatePassword(password);
        setEmailError(userEmailError);
        setPasswordError(passError);
        if (userEmailError || passError) return;
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
        } catch (err) {
            console.error("Login error:", err);
        }
    };
    return (
        <AuthBackground>
            <div className="h-screen w-full flex items-center justify-center">
                <div
                    className="bg-background-light dark:bg-black flex max-w-[498px] p-[2px] mx-10 md:mx-0 md:p-[10px] flex-col items-center gap-[10px] rounded-[10px]"
                    style={{
                        boxShadow:
                            "0px 0px 10px 0px var(--color-accent-light-800)",
                    }}
                >
                    <div className="flex py-6 px-[30px] flex-col items-start gap-[30px] self-stretch">
                        <div className="text-text-dark-950 dark:text-text-light-100 text-[33px] font-bold">
                            Sign In
                        </div>
                        <div className="text-accent-light-800/90 text-[19px] font-bold">
                            Reconnect with your ideas. Continue building your
                            second brain.
                        </div>
                    </div>
                    <div className="flex flex-col py-[20px] px-[30px] items-start gap-[13px] self-stretch">
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
                            text={"Sign In"}
                            onClick={handleSignin}
                            color="primary"
                        />
                        <div className="flex p-[10px] justify-center items-center font-medium text-sm text-text-dark-950 gap-1">
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
