import { isCryptoKey } from "util/types";

export default class AppError extends Error{
    code:string;
    statusCode:number;

    constructor(message:string, code:string, statusCode:number){
        super(message);
        this.code = code;
        this.name = new.target.name;
        this.statusCode = statusCode
    }
}

export class ImgServiceError extends AppError{
    imageUrl:string;
    constructor(message:string, code:string, statusCode:number, imageUrl:string){
        super(message, code, statusCode);
        this.imageUrl = imageUrl;
    }
}

export class DbProductError extends AppError{
    imageUrl?:string;
    pictureId?:number;
    constructor(message:string, code:string, statusCode:number, imageUrl?:string, pictureId?:number){
        super(message, code, statusCode);
        this.imageUrl = imageUrl;
        this.pictureId = pictureId;
    }
}
