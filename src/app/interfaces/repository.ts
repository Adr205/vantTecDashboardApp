export interface Repository {
    _id: string;
    title: string;
    description: string;
    url: string;
    tags: string[]; 
    user: string;
    saved: boolean;
    userID: string;
}
