import { GreetingStore } from "../../../../storage/greeting/GreetingStore";
import { ROUTE_NAMES } from "../../../constants";
import { createRouter } from "../../routerFactory";
import { RetrieveGreetingsService } from "./RetrieveGreetingsService";


export const retrieveGreetingsRouter = createRouter({
    method: "get",
    route: ROUTE_NAMES.greetings.retrieve,
    service: new RetrieveGreetingsService({
        getGreetingStore: () => GreetingStore.get()
    })
});