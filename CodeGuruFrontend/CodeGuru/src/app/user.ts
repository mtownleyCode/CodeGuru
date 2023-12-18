import { JwtAuth } from "./jwt-auth";

export interface User {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    userRole: string;
    email: string;
    token: string;

}
