import dotenv from 'dotenv';
import fs from 'fs'
import { v4 as uuidv4 } from 'uuid';
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3"
import {image} from "../schemas/productSchema"
import { ImgServiceError } from '../schemas/appError';

dotenv.config();

const S3BucketName = process.env.S3_BUCKET_NAME;

const s3 = new S3Client({
    region:process.env.S3_REGION,
    credentials:{
        accessKeyId:process.env.S3_ACCESS_KEY!,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!
    }
    });

export async function uploadImage(productData:Zod.infer<typeof image>){
    const originalFilename = productData.originalFilename ?? "product.jpg";
    const extension = originalFilename.split(".").pop();
    const params = {
        Bucket:S3BucketName,
        Key:`${uuidv4()}.${extension}`,
        Body:fs.createReadStream(productData.filepath),
        ContentType: productData.mimetype! // Aquí para decir que este estará definido, porque ya fue parseado, pero esta función no lo sabe
    }
    
    const upload = await s3.send(new PutObjectCommand(params))
    if ( upload.$metadata.httpStatusCode != 200){
        throw new ImgServiceError("No se pudo subir la imagen al servicio", "UPLOAD_FAILED", 500, params.Key);
    }
    return params.Key;
}

export async function deleteImage(imageUrl:string){
    const params = {
        Bucket:S3BucketName,
        Key:imageUrl
    }
    const deletion = await s3.send(new DeleteObjectCommand(params));

    if (deletion.$metadata.httpStatusCode !== 200 && deletion.$metadata.httpStatusCode !== 204){
        throw new ImgServiceError("No se pudo borrar la imagen en el servicio.", "DELETION_FAILED", 500, params.Key);
    }
};