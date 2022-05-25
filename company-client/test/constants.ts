import { NewProduct, NewProductEventParams, MyProductDetailsRequest, ProductDetailsRequest } from "../src/types";
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
    pubKey: "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAAAQQC2huXadFJAaYW5DvofKzwPCkyG4vFgN2leRrKOfHsdQELrmC8ph0AxGt7f6ql5SATTPdk/H/m01iayOELXpH5N \n",
    privKey: "-----BEGIN OPENSSH PRIVATE KEY-----\n" +
             "b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAAAVwAAAAdzc2gtcn\n" +
             "NhAAAAAwEAAQAAAEEAtobl2nRSQGmFuQ76Hys8DwpMhuLxYDdpXkayjnx7HUBC65gvKYdA\n" +
             "MRre3+qpeUgE0z3ZPx/5tNYmsjhC16R+TQAAARgAAAAAAAAAAAAAAAdzc2gtcnNhAAAAQQ\n" +
             "C2huXadFJAaYW5DvofKzwPCkyG4vFgN2leRrKOfHsdQELrmC8ph0AxGt7f6ql5SATTPdk/\n" +
             "H/m01iayOELXpH5NAAAAAwEAAQAAAEAUUfBE4a5GfXjloUU3Mxj8k6jxW1KD46dXV4eJVV\n" +
             "Jfbxfiq5DcEdtV9nVu5jOBqQAr3UzPd7jKezEriRV6KaABAAAAIDTdH6NMxFF+qHFM3Glt\n" +
             "nfefuQf/qwYvQdF0leUrsacZAAAAIQDZGFOXLoX4zyPIWLr5ZTZZHGqW3syy8JwA5+m25I\n" +
             "bGXQAAACEA1zyw0hk5uIMGaE4TiIEalsWCrJhOftReOuM1zzRFOLEAAAAAAQID\n" +
             "-----END OPENSSH PRIVATE KEY-----\n",
    algorithm: "openssh-rsa",
    timestamp: 0
};

export const TEST_PRODUCT_DETAILS_REQUEST: ProductDetailsRequest = {
    uid: "d3285b47-8ba9-4e40-ba43-a9ac325a0b1e",
    pubKey: "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAAAQQC2huXadFJAaYW5DvofKzwPCkyG4vFgN2leRrKOfHsdQELrmC8ph0AxGt7f6ql5SATTPdk/H/m01iayOELXpH5N \n",
    algorithm: "openssh-rsa",
    timestamp: 0
};