import { atom } from "recoil";

export interface UserData {
    token: string | null;
    user: {
        id: string;
        name: string;
        email: string;
    } | null;
    isAuthenticated: boolean;
}

export const authState = atom<UserData | null>({
    key: "authState",
    default: {
        token: null,
        user: null,
        isAuthenticated: false,
    },
});
