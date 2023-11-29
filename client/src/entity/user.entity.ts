export type Signup = {
    userName: string;
    phone: string;
    email: string;
    passwords: string;
    confirmPassword: string;
}

export type Signin = {
    email: string;
    passwords: string;

}

export type ListUsers = {
    idUsers?: number | undefined;
    userName?: string;
    phone?: string;
    passwords?: string;
    email?: string;
    avatarUrl?: string;
    role?: string;
    isBlocked?: number;
}
