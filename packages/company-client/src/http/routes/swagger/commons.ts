/* eslint-disable max-len */
import { EnvVars, RUN_CONTEXT } from "../../../lib/EnvVars";


/**
 * @swagger
 *  tags:
 *    - name: Products
 *      description: Routes to handle products
 *    - name: Documents
 *      description: Routes to handle documents
 *    - name: New Products
 *      description: Routes to handle new product announcements
 *    - name: Product Details Requests
 *      description: Routes to handle product details requests
 *    - name: Product Details Responses
 *      description: Routes to handle product details responses
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         uid:
 *           type: string
 *           description: The uuid v4 of a product
 *           example: 0e66f0e4-1c4e-4781-8fd7-36058206d295
 *         id:
 *           type: string
 *           description: The uuid v4 of a product group
 *           example: 0e66f0e4-1c4e-4781-8fd7-36058206d295
 *         name:
 *           type: string
 *           description: The product name
 *           example: Bionic Partition
 *         type:
 *           type: string
 *           description: The product type [ assembly | purchase_part | standard_part ]
 *           example: purchase_part
 *         number:
 *           type: string
 *           description: The product number
 *           example: EAN 20359483920
 *         documents:
 *           type: array
 *           description: An array of uids of associated documents
 *           example: [8181c8ae-eef1-4703-8498-2cf25be2877b, 81c0db28-9d72-4e36-b0f2-e166408bc839]
 *         amount:
 *           type: number
 *           description: The amount of the product
 *           example: 1
 *         amountUnit:
 *           type: string
 *           description: The amount unit of the product [ each | l/liter | cm/centimeter | cm2/square_centimeter | cm3/cubic_centimeter | m/meter | m2/square_meter | m3/cubic_meter ]
 *           example: cm
 *         weight:
 *           type: number
 *           description: The weight of the product
 *           example: 1
 *         weightUnit:
 *           type: string
 *           description: The weight unit of the product [ mg/milligram | g/gram | kg/kilogram | %/percentage | ppm/parts_per_million ]
 *           example: kg
 *         carbonFootprint:
 *           type: number
 *           description: The carbon footprint of the product
 *           example: 1
 *         carbonFootprintUnit:
 *           type: string
 *           description: The carbon footprint unit of the product [ mg/milligram | g/gram | kg/kilogram ]
 *           example: kg
 *       required:
 *         - name
 *         - type
 *         - number
 *     Document:
 *       type: object
 *       properties:
 *         uid:
 *           type: string
 *           description: The uuid v4 of a document
 *           example: 8181c8ae-eef1-4703-8498-2cf25be2877b
 *         name:
 *           type: string
 *           description: The document name
 *           example: Bionic_Partition_Report
 *         type:
 *           type: string
 *           description: The document type
 *           example: pdf
 *         data:
 *           type: string
 *           description: The base 64 encoded document data
 *           example: JVBERi0xLjMKJcTl8uXrp/Og0MTGCjMgMCBvYmoKPDwgL0ZpbHRlciA...
 *         timestamp:
 *           type: number
 *           description: The unix timestamp the document was created
 *           example: 1654606577
 *         version:
 *           type: string
 *           description: The document version
 *           example: 1.1
 *       required:
 *         - uid
 *         - name
 *         - type
 *         - data
 *         - timestamp
 *         - version
 *     NewProduct:
 *       type: object
 *       properties:
 *         uid:
 *           type: string
 *           description: The uuid v4 of a product
 *           example: 0e66f0e4-1c4e-4781-8fd7-36058206d295
 *         id:
 *           type: string
 *           description: The uuid v4 of a product group
 *           example: 0e66f0e4-1c4e-4781-8fd7-36058206d295
 *         name:
 *           type: string
 *           description: The product name
 *           example: Bionic Partition
 *         type:
 *           type: string
 *           description: The product type [ assembly | purchase_part | standard_part ]
 *           example: purchase_part
 *         number:
 *           type: string
 *           description: The product number
 *           example: EAN 20359483920
 *         hash:
 *           type: string
 *           description: The normalized product hash
 *           example: f031e34aaa900645b71588e731425526f1b158fb55f67ef37d05561f9b1b644d
 *         timestamp:
 *           type: number
 *           description: The unix timestamp of the product announcement
 *           example: 1654606577
 *       required:
 *         - uid
 *         - id
 *         - name
 *         - type
 *         - number
 *         - hash
 *         - timestamp
 *     ProductDetailsRequest:
 *       type: object
 *       properties:
 *         uid:
 *           type: string
 *           description: The uuid v4 of a product
 *           example: 0e66f0e4-1c4e-4781-8fd7-36058206d295
 *         publicKey:
 *           type: string
 *           description: The public key the requestor can be identified
 *           example: -----BEGIN RSA PUBLIC KEY-----\nMIIBCgKCAQEAw3yqAHoKyLCEzvnThnhy48xQWAsKQf/...
 *         algorithm:
 *           type: string
 *           description: The algorithm of the public key (currently only "rsa_aes" is supported)
 *           example: rsa_aes
 *         responded:
 *           type: boolean
 *           description: Indicates if there was a response to the request
 *           example: false
 *         timestamp:
 *           type: number
 *           description: The unix timestamp of the product details request
 *           example: 1654606577
 *       required:
 *         - uid
 *         - publicKey
 *         - algorithm
 *         - responded
 *         - timestamp
 */

 export function createConfig() {
    return {
        definition: {
            openapi: "3.0.0",
            info: {
                title: "Dibichain Company Client",
                version: "1.0.0",
                description: "The Dibichain Company client",
                contact: {
                    name: "CHAINSTEP",
                    url: "https://chainstep.com",
                },
            },
        },
        apis: EnvVars.RUN_CONTEXT === RUN_CONTEXT.DEVELOPMENT
            ? [ "./dev/compiled/*.js" ]
            : [ "./dist/src/http/routes/**/*.js" ]
    };
}
