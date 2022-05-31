import { NewProduct, NewProductEventParams, MyProductDetailsRequest, ProductDetailsRequest, ProductDetailsRequestEventParams } from "../src/types";
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
    timestamp: 0,
    responded: false
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

export const TEST_PLAIN_SECRET = "4j1eJX4t44f+vCZmZz7vZB6F93gT97DaX5QefCRkW/A=";

export const TEST_MESSAGE = {
    secret: "T96NYph58ppp8Tklte5o34DAT5n9Mi61yuo3oPqZTogInUxFYSOZz7lTc4Xwg1HDtTCRqoT4DW3JFuQWHTpTrC0SWF3oiuMuMI7LNm3JroSZzckvrj8J/IDHg9Qg+swK12LsbmVb3NfqmeYiJgFOyw34nMyg1JNhka0uNqbdRU13ZUiLeaxHQjaracWkUWdvpryd3WIqyc5T3prAqTzZ8iFy/hgVoY39EFfUc2x8xx2TVvrwPsQb/z30q7G4sBXS5MDOhjSSNHBuFQCmIVhfyG+mXDT9nAODoyIfjcshNiL3KJ1gKTtV7RAvSpq85C+43cguTitmaMClk6k0oN0KKg==",
    cipherText: "68xf5xnHyhWRDa313N8mxTr/2lSxP9ikSExR0a/DE8jRu2P6fHv9aEGsstsLXRTVYhhBUFGdK4k/uCVMqLe1UfL4kptLO2S937TbGSqgMooaXc0Nk+cKP/jpYTVMN4VJQB91vvAG4twsdBtZRRM9FFyPvEw5nT8IKGJHhyXnvyeTjDBbkWIjW9JgSXh6eP1iWV5YzaTvTAFiCK0E47STqZIN2tke9LRHTxcHj9JS/5HWmXUO/QgD0r1WkBfZrHd13bs8D1t71qyjv9zgZ4Uj0m/7/HdocImUCozJuff+mIekLDw7TBJ/Mi5y29xCjpL0",
    initVector: "DlpxkZyDxNWCf7829bOrDg=="
};
