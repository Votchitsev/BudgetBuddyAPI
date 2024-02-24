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
