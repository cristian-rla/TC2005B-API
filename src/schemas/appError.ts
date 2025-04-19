// AGREGAR DATA PARA CUANDO SEA UN ERROR DE PRISMA POR EJEMPLO, 
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

// No se puede tener el Id aquí porque se crean al mismo tiempo en Prisma el producto y la imagen
export class DbProductError extends AppError{
    imageUrl?:string;
    constructor(message:string, code:string, statusCode:number, imageUrl?:string){
        super(message, code, statusCode);
        this.imageUrl = imageUrl;
    }
}

export class DbProductErrorWithPicture extends AppError{
    imageUrl:string;
    constructor(message:string, code:string, statusCode:number, imageUrl:string){
        super(message, code, statusCode);
        this.imageUrl = imageUrl;
    }
}