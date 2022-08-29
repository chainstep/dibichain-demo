import crypto from "crypto";


export enum ALGORITHMS {
    RSA_AES = "rsa_aes"
}


export interface EncryptedMessage {
    secret: string;
    cipherText: string;
    initVector: string;
}


export class Crypto {
    private readonly AES_ALGO = "aes-256-cbc";


    public generateKeyPair(): { privateKey: string, publicKey: string, algorithm: string } {
        const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
            modulusLength: 2048
        });
        return {
            privateKey: privateKey.export({ type: "pkcs1", format: "pem" }).toString(),
            publicKey: publicKey.export({ type: "pkcs1", format: "pem" }).toString(),
            algorithm: ALGORITHMS.RSA_AES
        };
    }


    public encrypt(publicKey: string, message: string): EncryptedMessage {
        const { plainSecret, secret } = this.createSecret(publicKey);
        const { cipherText, initVector } = this.createCipherText(plainSecret, message);
        return {
            secret,
            cipherText,
            initVector
        };
    }

    private createSecret(publicKey: string): {plainSecret: string, secret: string} {
        const plainSecret = crypto.randomBytes(32);
        const secret = crypto.publicEncrypt(
            {
                key: publicKey,
                padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                oaepHash: "sha256",
            },
            plainSecret
        );
        return {
            plainSecret: plainSecret.toString("base64"),
            secret: secret.toString("base64")
        };
    }

    private createCipherText(secret: string, message: string): {cipherText: string, initVector: string} {
        const initVector = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv(this.AES_ALGO, Buffer.from(secret, "base64"), initVector);

        let cipherText = cipher.update(message, "utf-8", "base64");
        cipherText += cipher.final("base64");
        return {
            cipherText,
            initVector: initVector.toString("base64")
        };
    }


    public decrypt(privateKey: string, encMessage: EncryptedMessage): string {
        const { secret, cipherText, initVector } = encMessage;
        const plainSecret = this.decryptSecret(privateKey, secret);
        const message = this.decryptCipherText(plainSecret, initVector, cipherText);
        return message;
    }

    private decryptSecret(privateKey: string, secret: string): string {
        const plainSecret = crypto.privateDecrypt(
            {
                key: privateKey,
                padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                oaepHash: "sha256",
            },
            Buffer.from(secret, "base64"),
        );
        return plainSecret.toString("base64");
    }

    private decryptCipherText(secret: string, initVector: string, cipherText: string): string {
        const decipher = crypto.createDecipheriv(this.AES_ALGO, Buffer.from(secret, "base64"), Buffer.from(initVector, "base64"));
        let message = decipher.update(cipherText, "base64", "utf-8");
        message += decipher.final("utf8");
        return message;
    }


    public hash(message: string): string {
        return crypto.createHash("sha256").update(message).digest("hex");
    }
}