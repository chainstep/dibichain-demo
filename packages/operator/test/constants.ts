export const TEST_NEW_PRODUCT = {
    id: "d3285b47-8ba9-4e40-ba43-a9ac325a0b1e",
    uid: "d3285b47-8ba9-4e40-ba43-a9ac325a0b1e",
    name: "Bionic Partition",
    type: "assembly",
    number: "EAN 20359483920",
    hash: "ab393730632e6b821d2c512e3336e9e45eaa23f742c21045317930b6830bee90",
    timestamp: 10
};

export const TEST_PRODUCT_DETAILS_REQUEST = {
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

export const TEST_PRODUCT_DETAILS_RESPONSE = {
    uid: "d3285b47-8ba9-4e40-ba43-a9ac325a0b1e",
    publicKey:  "-----BEGIN RSA PUBLIC KEY-----\n" +
                "MIIBCgKCAQEA4cHLrQ5lgyjP/idKwlsnp0+nhvY1BhwE39Dxn8no6DbDl/W0RRVM\n" +
                "eSiP4Ny1AoUzalkzr0fmugUIy6skmuePqqXbes/4aCisJMB86izQeGZhac2k8ofk\n" +
                "9ivedD4VOOcSLqenMVRdqG/1jFxQmwtfe7pt0Mw0AorYN8d5fXLGPFDjXKaO7cfr\n" +
                "OBWY4AQlKF5tkiTiwXoqorjIBl+2S3dh+/xzYHMyF46s9sDkHkmpNK1JquFK8VJw\n" +
                "s8PZHnw6o+C2/i+Ea1ZAkgU/3ta6ztX/5Ak2F9HFAp6tMLqK3Ac+A1T45tb46NaJ\n" +
                "iVocbo+Nrht97J2OnvCd2tmGsxeaiMZ2AwIDAQAB\n" +
                "-----END RSA PUBLIC KEY-----\n",
    message: {
        secret: "T96NYph58ppp8Tklte5o34DAT5n9Mi61yuo3oPqZTogInUxFYSOZz7lTc4Xwg1HDtTCRqoT4DW3JFuQWHTpTrC0SWF3oiuMuMI7LNm3JroSZzckvrj8J/IDHg9Qg+swK12LsbmVb3NfqmeYiJgFOyw34nMyg1JNhka0uNqbdRU13ZUiLeaxHQjaracWkUWdvpryd3WIqyc5T3prAqTzZ8iFy/hgVoY39EFfUc2x8xx2TVvrwPsQb/z30q7G4sBXS5MDOhjSSNHBuFQCmIVhfyG+mXDT9nAODoyIfjcshNiL3KJ1gKTtV7RAvSpq85C+43cguTitmaMClk6k0oN0KKg==",
        cipherText: "68xf5xnHyhWRDa313N8mxTr/2lSxP9ikSExR0a/DE8jRu2P6fHv9aEGsstsLXRTVYhhBUFGdK4k/uCVMqLe1UfL4kptLO2S937TbGSqgMooaXc0Nk+cKP/jpYTVMN4VJQB91vvAG4twsdBtZRRM9FFyPvEw5nT8IKGJHhyXnvyeTjDBbkWIjW9JgSXh6eP1iWV5YzaTvTAFiCK0E47STqZIN2tke9LRHTxcHj9JS/5HWmXUO/QgD0r1WkBfZrHd13bs8D1t71qyjv9zgZ4Uj0m/7/HdocImUCozJuff+mIekLDw7TBJ/Mi5y29xCjpL0",
        initVector: "DlpxkZyDxNWCf7829bOrDg=="
    }
};