export const validateEmail = (value: string) => {
    if (value.trim() === "") {
        return "Email is required.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
        return "Please enter a valid email address.";
    }
    return null;
};

export const validateName = (value: string) => {
    if (value.trim() === "") {
        return "Name is required";
    }
    for (const char of value) {
        if (!isNaN(Number(char))) {
            return "Name should not contain numbers";
        }
    }
    return null;
};

export const validatePassword = (value: string) => {
    const passwordRegx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (value.trim() === "") {
        return "Password is required";
    }
    if (!passwordRegx.test(value)) {
        return "please enter a valid password";
    }
    return null;
};

export const validateConfirmPassword = (value: string, password: string) => {
    if (value.trim() === "") {
        return "Password is required";
    }
    if (value !== password) {
        return "Password do not match";
    }
    return null;
};
