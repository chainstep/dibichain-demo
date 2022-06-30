import { EnvVars, RUN_CONTEXT } from "../../../lib/EnvVars";


/**
 * @swagger
 *  tags:
 *    name: New Products
 *    description: Routes to broadcast new products
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
 *           description: the uuid v4 of a product
 *           example: 0e66f0e4-1c4e-4781-8fd7-36058206d295
 *         id:
 *           type: string
 *           description: the uuid v4 of a product group
 *           example: 0e66f0e4-1c4e-4781-8fd7-36058206d295
 *         name:
 *           type: string
 *           description: the product name
 *           example: Bionic Partition
 *         type:
 *           type: string
 *           description: the product type [ assembly | purchase_part | standard_part ]
 *           example: purchase_part
 *         number:
 *           type: string
 *           description: the product number
 *           example: EAN 20359483920
 *         hash:
 *           type: string
 *           description: the normalized product hash
 *           example: f031e34aaa900645b71588e731425526f1b158fb55f67ef37d05561f9b1b644d
 *       required:
 *         - uid
 *         - id
 *         - name
 *         - type
 *         - number
 *         - hash
 */

export function createConfig() {
    return {
        definition: {
            openapi: "3.0.0",
            info: {
                title: "Dibichain Operator",
                version: "1.0.0",
                description: "The Dibichain Operator",
                contact: {
                    name: "CHAINSTEP",
                    url: "https://chainstep.com",
                },
            },
        },
        apis: EnvVars.RUN_CONTEXT === RUN_CONTEXT.DEVELOPMENT
            ? [ "./dev/compiled/*.js" ]
            : [ "./dist/src/http/routes/**/*.js" ],
    };
}