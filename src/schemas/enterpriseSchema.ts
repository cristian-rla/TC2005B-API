import {z} from 'zod'

/*=================================================================================================
    HTTP ENTERPRISE SCHEMAS (Datos recibidos en la capa handler)
====================================================================================================*/
export const enterpriseSchema = z.object({
    nombre: z.string().min(1),
    industria: z.string().min(1),
    foto: z.string().optional()
});

export type EnterpriseRequest = z.infer<typeof enterpriseSchema>;

/*=================================================================================================
    HTTP PRODUCT SCHEMAS (Datos recibidos en la capa handler)
====================================================================================================*/
