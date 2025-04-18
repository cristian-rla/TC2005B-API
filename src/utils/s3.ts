import fs from 'fs'
import { v4 as uuidv4 } from 'uuid';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import {image} from "../schemas/productSchema"

const s3 = new S3Client({
    region:process.env.S3_REGION,
    credentials:{
        accessKeyId:process.env.S3_ACCESS_KEY!,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!
    }
    });

export default async function uploadImageToS3(productData:Zod.infer<typeof image>){
    const originalFilename = productData.originalFilename ?? "product.jpg";
    const extension = originalFilename.split(".").pop();
    const params = {
        Bucket:process.env.S3_BUCKET_NAME,
        Key:`${uuidv4()}.${extension}`,
        Body:fs.createReadStream(productData.filepath),
        ContentType: productData.mimetype! // Aquí para decir que este estará definido, porque ya fue parseado, pero esta función no lo sabe
    }
    
    const upload = await s3.send(new PutObjectCommand(params))
    if ( upload.$metadata.httpStatusCode != 200){
        throw new Error("La imagen no pudo ser subida");
    }
    return params.Key;
}