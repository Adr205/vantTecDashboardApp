export interface User {
    _id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    savedRepositories?: String[];
    createdRepositories?: String[];
}
