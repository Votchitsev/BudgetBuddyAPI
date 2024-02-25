export interface ISignUpRequest {
    name: string;
    password: string;
    confirmPassword: string;
    applicationToken: string;
}

export interface ISignInRequest {
    applicationToken: string;
    username: string;
    password: string;
}

export interface ILogoutRequest {
    token: string;
}

export interface IPlannedBudget {
    name: string;
    amount: number;
    date: Date;
}
