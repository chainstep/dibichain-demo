import { BlockchainInfoStore } from "../../../storage/blockchain/BlockchainInfoStore";
import { MyNewProductStore } from "../../../storage/my-new-product/MyNewProductStore";
import { NewProductStore } from "../../../storage/new-product/NewProductStore";
import { ProductStore } from "../../../storage/product/ProductStore";
import { BlockHeightService } from "../../common/BlockHeightService";
import { SkipProductService } from "../../common/SkipProductsService";
import { ContractEventListener } from "../../ContractEventHandler";
import { NewProductService } from "./NewProductService";


export function createNewProductListener(): ContractEventListener {
    return {
        eventName: "NewProduct",
        services: [
            new SkipProductService({
                stores: [
                    ProductStore.get()
                ]
            }),
            new BlockHeightService({
                blockchainInfoStore: BlockchainInfoStore.get()
            }),
            new NewProductService({
                newProductStore: NewProductStore.get(),
                myNewProductStore: MyNewProductStore.get()
            })
        ]
    };
}