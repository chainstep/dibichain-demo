import crypto from "crypto";


export enum ALGORITHMS {
    RSA__PKCS1_OAEP_PADDING__sha256 = "rsa:PKCS1_OAEP_PADDING:sha256"
}


export class Crypto {
    public generateKeyPair(): { privateKey: string, publicKey: string, algorithm: string } {
        const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
            modulusLength: 2048
        });

        return {
            privateKey: privateKey.export({ type: "pkcs1", format: "pem" }).toString(),
            publicKey: publicKey.export({ type: "pkcs1", format: "pem" }).toString(),
            algorithm: ALGORITHMS.RSA__PKCS1_OAEP_PADDING__sha256
        };
    }


    public encrypt(publicKey: string, message: string): string {
        const encryptedData = crypto.publicEncrypt(
            {
                key: publicKey,
                padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                oaepHash: "sha256",
            },
            Buffer.from(message)
        );
        return encryptedData.toString("base64");
    }


    public decrypt(privateKey: string, encryptedMessage: string): string {
        const decryptedData = crypto.privateDecrypt(
            {
                key: privateKey,
                padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                oaepHash: "sha256",
            },
            Buffer.from(encryptedMessage, "base64"),
        );
        return decryptedData.toString("utf-8");
    }


    public hash(message: string): string {
        return crypto.createHash("sha256").update(message).digest("hex");
    }
}