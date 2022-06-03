import { NewProduct, NewProductEventParams, MyProductDetailsRequest, ProductDetailsRequest, ProductDetailsRequestEventParams, Key } from "../src/types";
import { Product } from "../src/types";


export const TEST_PRODUCT: Product = {
    id: "d3285b47-8ba9-4e40-ba43-a9ac325a0b1e",
    uid: "d3285b47-8ba9-4e40-ba43-a9ac325a0b1e",
    name: "Bionic Partition",
    type: "assembly",
    number: "EAN 20359483920",
    documents: [
        "8181c8ae-eef1-4703-8498-2cf25be2877b",
        "8181c8ae-eef1-4703-8498-2cf25be2877c",
        "8181c8ae-eef1-4703-8498-2cf25be2877d"
    ],
    amount: 1,
    amountUnit: "each",
    weight: 65.53,
    weightUnit: "kg",
    carbonFootprint: 1345,
    carbonFootprintUnit: "kg"
};

export const TEST_NEW_PRODUCT_EVENT_PARAMS: NewProductEventParams = {
    id: "d3285b47-8ba9-4e40-ba43-a9ac325a0b1e",
    uid: "d3285b47-8ba9-4e40-ba43-a9ac325a0b1e",
    name: "Bionic Partition",
    Type: "assembly",
    number: "EAN 20359483920",
    hash: "ab393730632e6b821d2c512e3336e9e45eaa23f742c21045317930b6830bee90"
};

export const TEST_NEW_PRODUCT: NewProduct = {
    id: "d3285b47-8ba9-4e40-ba43-a9ac325a0b1e",
    uid: "d3285b47-8ba9-4e40-ba43-a9ac325a0b1e",
    name: "Bionic Partition",
    type: "assembly",
    number: "EAN 20359483920",
    hash: "ab393730632e6b821d2c512e3336e9e45eaa23f742c21045317930b6830bee90",
    timestamp: 10
};

export const TEST_MY_PRODUCT_DETAILS_REQUEST: MyProductDetailsRequest = {
    uid: "d3285b47-8ba9-4e40-ba43-a9ac325a0b1e",
    publicKey:  "-----BEGIN RSA PUBLIC KEY-----\n" +
                "MIIBCgKCAQEA4cHLrQ5lgyjP/idKwlsnp0+nhvY1BhwE39Dxn8no6DbDl/W0RRVM\n" +
                "eSiP4Ny1AoUzalkzr0fmugUIy6skmuePqqXbes/4aCisJMB86izQeGZhac2k8ofk\n" +
                "9ivedD4VOOcSLqenMVRdqG/1jFxQmwtfe7pt0Mw0AorYN8d5fXLGPFDjXKaO7cfr\n" +
                "OBWY4AQlKF5tkiTiwXoqorjIBl+2S3dh+/xzYHMyF46s9sDkHkmpNK1JquFK8VJw\n" +
                "s8PZHnw6o+C2/i+Ea1ZAkgU/3ta6ztX/5Ak2F9HFAp6tMLqK3Ac+A1T45tb46NaJ\n" +
                "iVocbo+Nrht97J2OnvCd2tmGsxeaiMZ2AwIDAQAB\n" +
                "-----END RSA PUBLIC KEY-----\n",
    algorithm: "rsa_aes",
    timestamp: 0,
    responded: false
};

export const TEST_KEY: Key = {
    publicKey:  "-----BEGIN RSA PUBLIC KEY-----\n" +
                "MIIBCgKCAQEA4cHLrQ5lgyjP/idKwlsnp0+nhvY1BhwE39Dxn8no6DbDl/W0RRVM\n" +
                "eSiP4Ny1AoUzalkzr0fmugUIy6skmuePqqXbes/4aCisJMB86izQeGZhac2k8ofk\n" +
                "9ivedD4VOOcSLqenMVRdqG/1jFxQmwtfe7pt0Mw0AorYN8d5fXLGPFDjXKaO7cfr\n" +
                "OBWY4AQlKF5tkiTiwXoqorjIBl+2S3dh+/xzYHMyF46s9sDkHkmpNK1JquFK8VJw\n" +
                "s8PZHnw6o+C2/i+Ea1ZAkgU/3ta6ztX/5Ak2F9HFAp6tMLqK3Ac+A1T45tb46NaJ\n" +
                "iVocbo+Nrht97J2OnvCd2tmGsxeaiMZ2AwIDAQAB\n" +
                "-----END RSA PUBLIC KEY-----\n",
    privateKey: "-----BEGIN RSA PRIVATE KEY-----\n" +
                "MIIEpAIBAAKCAQEA4cHLrQ5lgyjP/idKwlsnp0+nhvY1BhwE39Dxn8no6DbDl/W0\n" +
                "RRVMeSiP4Ny1AoUzalkzr0fmugUIy6skmuePqqXbes/4aCisJMB86izQeGZhac2k\n" +
                "8ofk9ivedD4VOOcSLqenMVRdqG/1jFxQmwtfe7pt0Mw0AorYN8d5fXLGPFDjXKaO\n" +
                "7cfrOBWY4AQlKF5tkiTiwXoqorjIBl+2S3dh+/xzYHMyF46s9sDkHkmpNK1JquFK\n" +
                "8VJws8PZHnw6o+C2/i+Ea1ZAkgU/3ta6ztX/5Ak2F9HFAp6tMLqK3Ac+A1T45tb4\n" +
                "6NaJiVocbo+Nrht97J2OnvCd2tmGsxeaiMZ2AwIDAQABAoIBAQCOj1t379Roq9gU\n" +
                "TWmnK/rxa5qF3moDbqQhVgeO+OjL4vFGv5DT4yxEgjnBLH5dlhGuwZ+iu0vXAiDY\n" +
                "xD08WKffghcECdp6o9x45Ni85AnNThGLx6G2ydvrHC7AxweNxFU2AwbQXs8582Fi\n" +
                "/lSkY90q+8InDRx20ojRSHTOpDDMmrOW29T7+/dL2raSzcrat8Zmw+i+aTSwva+p\n" +
                "HdgpCEngBTl+40LzSVuyWOTZ16MtBvG/DunSETNF09esMxD/X6iXh1ZaBF6cltbI\n" +
                "/6sEqmn2FFYc+cKMr13nN2cfiT1fpkxLTCeBcTvvz3EYFejoGpeWlL5myV8nQ3KE\n" +
                "KVLWXa/JAoGBAP+fnTu1+MXxTeLXjxVy5Ij9AWIptIDT3RGeBJ1R24CBWtpAi1uv\n" +
                "CZlM+/f8icMih+TljSIx27+KY9QZoguvWm8bvQaVbTpHJupsVqRk+Uo+/LScQM0F\n" +
                "5v+MCGnTgJbyJKYlo2eATOcqR9ji7RUMCO3juga/MsDAx42JAbpKjFY9AoGBAOIW\n" +
                "639/SVz8r7Ubr8w8rou7e43j8DovcPYfbZqTKBn3SxrYwG2/P87iiGYt+2y5zkFk\n" +
                "5NvIuthivdr3ry2sB2XF9K9mfKOV7KU7oR0Pq5cdWt3ULDX8H8nCrTP5gsGPyioz\n" +
                "9s/n+SZaBw5FGpy4l4wWTC64gaUnRFuun61o8wE/AoGAYsdeLg3CpVL64vajXwl3\n" +
                "0IvcNf+htcqo+b7TT6urI7xYzE/2yiYYknnSQGEBJzu3wbcG07jqjti+fN6u5M8N\n" +
                "JjRU1i919vg5zIqy7HHsd0lhw7VBwThPrF6DfclyPmIx0VZoD33fudB31RLTxLdS\n" +
                "2AKRBzxpM10Lf+D6nu9hzY0CgYEAwVHj0EMgkfgmre+cpECG50hKX4s10Crcpjc9\n" +
                "WtzVf05q0+vernjHsLkW9HgA8nj2GgiRgDTlPz0/Jcp/6cedE7LuhERX8vCxRp/0\n" +
                "JYtOp4ocNm3D1+1bqQNjYnvJCIVQ0kFYm3G5Isf8HIGOPc/BFbHDNnfhszweQV7R\n" +
                "fk+s6bUCgYAzZVt1b+Vix0wC4J60ceRlDs3QNW/7g90O11dKG5PkQ0OyGXuKbfmZ\n" +
                "Xns5vOQfiH9fmR7OOjUcoil5Or3Ex3kVo3/H8Ztz11Jr3HqEkE8SFZ9Vy/5Y3gBz\n" +
                "WGohoShkXznHGwpjljt9NJXGelZ9LuIFlql7LP8CNHYtT4l5JmnWsg==\n" +
                "-----END RSA PRIVATE KEY-----\n",
    algorithm: "rsa_aes",
};

export const TEST_PRODUCT_DETAILS_REQUEST: ProductDetailsRequest = {
    uid: "d3285b47-8ba9-4e40-ba43-a9ac325a0b1e",
    publicKey:  "-----BEGIN RSA PUBLIC KEY-----\n" +
                "MIIBCgKCAQEA4cHLrQ5lgyjP/idKwlsnp0+nhvY1BhwE39Dxn8no6DbDl/W0RRVM\n" +
                "eSiP4Ny1AoUzalkzr0fmugUIy6skmuePqqXbes/4aCisJMB86izQeGZhac2k8ofk\n" +
                "9ivedD4VOOcSLqenMVRdqG/1jFxQmwtfe7pt0Mw0AorYN8d5fXLGPFDjXKaO7cfr\n" +
                "OBWY4AQlKF5tkiTiwXoqorjIBl+2S3dh+/xzYHMyF46s9sDkHkmpNK1JquFK8VJw\n" +
                "s8PZHnw6o+C2/i+Ea1ZAkgU/3ta6ztX/5Ak2F9HFAp6tMLqK3Ac+A1T45tb46NaJ\n" +
                "iVocbo+Nrht97J2OnvCd2tmGsxeaiMZ2AwIDAQAB\n" +
                "-----END RSA PUBLIC KEY-----\n",
    algorithm: "rsa_aes",
    timestamp: 10,
    responded: false
};

export const TEST_PRODUCT_DETAILS_REQUEST_EVENT_PARAMS: ProductDetailsRequestEventParams = {
    uid: "d3285b47-8ba9-4e40-ba43-a9ac325a0b1e",
    publicKey:  "-----BEGIN RSA PUBLIC KEY-----\n" +
                "MIIBCgKCAQEA4cHLrQ5lgyjP/idKwlsnp0+nhvY1BhwE39Dxn8no6DbDl/W0RRVM\n" +
                "eSiP4Ny1AoUzalkzr0fmugUIy6skmuePqqXbes/4aCisJMB86izQeGZhac2k8ofk\n" +
                "9ivedD4VOOcSLqenMVRdqG/1jFxQmwtfe7pt0Mw0AorYN8d5fXLGPFDjXKaO7cfr\n" +
                "OBWY4AQlKF5tkiTiwXoqorjIBl+2S3dh+/xzYHMyF46s9sDkHkmpNK1JquFK8VJw\n" +
                "s8PZHnw6o+C2/i+Ea1ZAkgU/3ta6ztX/5Ak2F9HFAp6tMLqK3Ac+A1T45tb46NaJ\n" +
                "iVocbo+Nrht97J2OnvCd2tmGsxeaiMZ2AwIDAQAB\n" +
                "-----END RSA PUBLIC KEY-----\n",
    algorithm: "rsa_aes"
};

export const TEST_MESSAGE = {
    secret: "qnImSze36ju+HKJSxVbcTVaNS/sQvvMiXk1riOvGFjSgNyg1Nv+8e9cjEDiprnZjwase1Q7Kufc1NlrGNYv1J52Y0OrTaOrBTLJm9tQ6PZNrplYPMLAq0WffqXLOjAe5c5ifYb+9gDTMLqk6KrLVeRLPMkWYhOJOzfAbVPom4M2hXL3GdYkSRKDjkRqvEVoQ9X0wge+SBBxxw74DnUceDBmyL+hD8KtevcUCs0FIo1SrIAmongB2JOW7CDb99uy5XlisjksdCskajW099n/FnSzgV8Dy7codnDnyjPlY1BTwVApCZ/969qpcol4oCby/06qfoZgtpK7fDdAgmgVS7A==",
    cipherText: "cT3s70Q3Eirz1IpVremKmEUksZxR6xLf+YaeqnMYPdAhR29aDM6Br7kJvp+UuE3xq9+JBHX3XVSkQoBsxBxJFQGT553F5me4FLEFuJVuI7MlkxSa6mZWXB2GlU2IuAmIlG6e62x/phBpvC9F8oOAVzBqOT+Jr23klOkxzLkyoMRrDUxtlgHKUG8kKEBpjGjz7H5BK0pJRViC5iHdzZLJTFS3UcgnCoTEmvihOdhUF2FX5Ux9HQafOEHO8miV1DW+oZZJr4FOHFP8MEgC+YjT0nU+UMV0aGp1WKIRj2w5p12xSXSs4pAr3AVRCVmwP2HkXqPHpcncxeG3mjMWg26A8f8yvGke6DJ8pTDrNVimJyeV0GuzPad5FMTABYM/EbMFIVbgHVC1GceXKdAd01SgLYvZQVD0xJThXT35nwXsfOPfbUcupUztMBR94lRp+ZWX7jC+PHoQ90pb/dBD5T6Kq8lqcL2AAvt2S+Nv8YmDeuh6y5vGK8PDdhO/SkzBpaCnTg8K7muPU+JAQlAlbbPF6fH2nkKqSBrODG/YhezORZk=",
    initVector: "CY9Ly87J4aJxucpp1NaAbA=="
  };
