export interface IUser {
    id: number;
    email: string;
    username: string;
}

export interface ITokenSchema {
    user: IUser;
    token: string
}
