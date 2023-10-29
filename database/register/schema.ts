export interface Register {
    _id?: string;
    username : string;
    email : string;
    password : string;
    image : string | File;
    createdAt: number;
    updatedAt: number;
}

export interface Token{
    email? : string;
    _id? : string;
    token? : string;
}