import NodeRSA from "node-rsa";


export class Crypto {
    public generateKey(): { privKey: string, pubKey: string, algorithm: string } {
        const key = new NodeRSA({ b: 512 });
        return {
            privKey: key.exportKey("openssh-private"),
            pubKey: key.exportKey("openssh-public"),
            algorithm: "openssh-rsa"
        };
    }


    public encrypt(privKey: string, message: string): string {
        const key = new NodeRSA().importKey(privKey, "openssh-private");
        const encryptedMessage = key.encryptPrivate(message);
        return encryptedMessage.toString("hex");
    }


    public decrypt(pubKey: string, encryptedMessage: string): string {
        const key = new NodeRSA().importKey(pubKey, "openssh-public");
        return key.decryptPublic(Buffer.from(encryptedMessage, "hex")).toString("ascii");
    }
}