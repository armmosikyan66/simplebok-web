export interface IErrorResponse {
    detail: {
        loc: [string, number];
        msg: string;
        type: string;
    }[] | string;
}
