import { NewProductStore } from "../../../../storage/newProduct/NewProductStore";
import { ROUTE_NAMES } from "../../../constants";
import { createRouter } from "../../routerFactory";
import { GetNewProductsService } from "./GetNewProductsService";


export const getNewProductsRouter = createRouter({
    method: "get",
    route: ROUTE_NAMES.newProducts,
    inputPath: "query",
    service: new GetNewProductsService({
        getNewProductStore: () => NewProductStore.get()
    })
});